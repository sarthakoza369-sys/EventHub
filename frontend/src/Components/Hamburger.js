import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Hamburger() {
  // State to control if the sidebar drawer is open or closed
  const [isOpen, setIsOpen] = useState(false);
  
  // Local state to hold the authenticated username (starts empty)
  const [userName, setUserName] = useState("");

  let location = useLocation();
  let navigate = useNavigate();

  // 2. Profile Sync Effect: Runs cleanly on authenticated internal pages
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch("http://localhost:5000/api/auth/getUser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': token
            }
          });
          if (response.ok) {
            const json = await response.json();
            setUserName(json.name); // Sets the verified database name (e.g. Varun Dhawan)
          }
        } catch (error) {
          console.error("Error fetching authenticated profile data:", error);
        }
      }
    };

    fetchUser();
  }, [location]); 

    // 1. Visibility Guard: Immediately returns null if user is on auth views
  if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const handleHostEvent = () => {
    navigate('/addevent');
  };

  return (
    <div>
      {/* Menu Toggle Trigger Button */}
      <div style={{ position: 'fixed', top: '70px', left: '15px', zIndex: 1100 }}>
        <MDBBtn color='primary' onClick={() => setIsOpen(!isOpen)} style={{ padding: '10px 14px' }}>
          <MDBIcon fas icon={isOpen ? "times" : "bars"} size="lg" />
        </MDBBtn>
      </div>

      {/* Slide-out Sidebar Drawer Layout */}
      <nav 
        className="sidenav bg-light" 
        style={{  
          width: '240px', 
          height: '100vh', 
          position: 'fixed', 
          top: 56, 
          left: isOpen ? '0' : '-240px', 
          transition: 'left 0.3s ease', 
          zIndex: 1000, 
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
        }}
      >
        <ul className="sidenav-menu" style={{ listStyle: 'none', paddingLeft: '0', marginTop: '70px' }}>
          
          {/* Active User Label Header Block */}
          <hr className="my-2 text-muted" style={{ opacity: 0.60 }} />
          <li className="sidenav-link d-flex align-items-center py-2 px-4 text-reset">
              <span style={{ fontSize: "0.95rem" }}>
                <strong>{userName}</strong>
              </span>
          </li>
          <hr className="my-2 text-muted" style={{ opacity: 0.60 }} />

          {/* Navigation Path Nodes */}
          <li className="sidenav-item">
            <Link className="sidenav-link d-flex align-items-center py-3 px-4 text-reset" to="/myevents">
              <MDBIcon far icon="calendar-alt" className="me-3" />
              <strong>My Events</strong>
            </Link>
          </li>

          <li className="sidenav-item">
            <Link className="sidenav-link d-flex align-items-center py-3 px-4 text-reset" to="/registeredevents">
              <MDBIcon fas icon="clipboard-check" className="me-3" />
              <strong>Registered Events</strong>
            </Link>
          </li>

          <li className="sidenav-item">
            <Link className="sidenav-link d-flex align-items-center py-3 px-4 text-reset" onClick={handleHostEvent} to="/addevent">
              <MDBIcon fas icon="plus-circle" className="me-3" />
              <strong>Host an Event</strong>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Focus Backdrop Fog Layer */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            backgroundColor: 'rgba(0,0,0,0.3)', 
            zIndex: 999
          }}
        />
      )}
    </div>
  );
}