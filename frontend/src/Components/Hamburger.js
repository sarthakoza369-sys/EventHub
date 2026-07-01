import React, { useState, useEffect } from 'react'; // Added useEffect
import {
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import { Link, useNavigate, useLocation } from "react-router-dom";


export default function Hamburger() {
  // State to control if the sidebar is open or closed
  const [isOpen, setIsOpen] = useState(false);
  
  // Create a local state to hold the username
  const [userName, setUserName] = useState("Guest Account");

  let location = useLocation();
  let navigate = useNavigate();

  // Fetch user profile info if logged in
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
            setUserName(json.name); // Set the logged-in user's name
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserName("Guest Account");
      }
    };

    fetchUser();
  }, [location]); // Re-runs check when moving between pages to stay accurate

  const handleHostEvent=()=>{
    navigate('/addevent');
  }

  return (
    <div>
      {/* 1. Toggle Button at the top-left corner */}
      <div style={{ position: 'fixed', top: '70px', left: '15px', zIndex: 1100 }}>
        <MDBBtn color='primary' onClick={() => setIsOpen(!isOpen)} style={{ padding: '10px 14px' }}>
          <MDBIcon fas icon={isOpen ? "times" : "bars"} size="lg" />
        </MDBBtn>
      </div>

      {/* 2. Slide-out Sidebar Navigation */}
      <nav 
        className="sidenav bg-light" 
        style={{  width: '240px', height: '100vh', position: 'fixed', top: 56, left: isOpen ? '0' : '-240px', transition: 'left 0.3s ease', zIndex: 1000, boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
        }}
      >
        <ul className="sidenav-menu" style={{ listStyle: 'none', paddingLeft: '0', marginTop: '70px' }}>
          
         {/* Thin line above the user item */}
        <hr className="my-2 text-muted" style={{ opacity: 0.60 }} />
        <li className="sidenav-link d-flex align-items-center py-2 px-4 text-reset">
            <span style={{ fontSize: "0.95rem" }}>
              {/* Uses your new dynamic username state */}
              <strong>{userName}</strong>
            </span>
        </li>
        <hr className="my-2 text-muted" style={{ opacity: 0.60 }} />

          {/* My Events Link */}
          <li className="sidenav-item">
            <Link className="sidenav-link d-flex align-items-center py-3 px-4 text-reset" to="/myevents">
              <MDBIcon far icon="calendar-alt" className="me-3" />
              <strong>My Events</strong>
            </Link>
          </li>

          {/* Registered Events Link */}
          <li className="sidenav-item">
            <Link className="sidenav-link d-flex align-items-center py-3 px-4 text-reset" to="/registeredevents">
              <MDBIcon fas icon="clipboard-check" className="me-3" />
              <strong>Registered Events</strong>
            </Link>
          </li>

          {/* ADD EVENT*/}
          <li className="sidenav-item">
            <Link className="sidenav-link d-flex align-items-center py-3 px-4 text-reset" onClick={handleHostEvent} to="/addevent">
              <MDBIcon fas icon="plus-circle" className="me-3" />
              <strong>Host an Event</strong>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Optional: Dark overlay background when sidebar is open to dim the main app screen */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 999
          }}
        />
      )}
    </div>
  );
}