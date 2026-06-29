import React, { useState } from 'react';
import {
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

export default function Hamburger() {
  // State to control if the sidebar is open or closed
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* 1. Toggle Button at the top-left corner */}
      <div style={{ position: 'fixed', top: '15px', left: '15px', zIndex: 1100 }}>
        <MDBBtn color='primary' onClick={() => setIsOpen(!isOpen)} style={{ padding: '10px 14px' }}>
          <MDBIcon fas icon={isOpen ? "times" : "bars"} size="lg" />
        </MDBBtn>
      </div>

      {/* 2. Slide-out Sidebar Navigation */}
      <nav 
        className="sidenav bg-light" 
        style={{ 
          width: '240px', 
          height: '100vh', 
          position: 'fixed', 
          top: 0,
          /* Smooth CSS slide transition based on isOpen state */
          left: isOpen ? '0' : '-240px', 
          transition: 'left 0.3s ease',
          zIndex: 1000,
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
        }}
      >
        {/* Margin top keeps the links below your fixed button */}
        <ul className="sidenav-menu" style={{ listStyle: 'none', paddingLeft: '0', marginTop: '70px' }}>
          
          {/* My Events Link */}
          <li className="sidenav-item">
            <a className="sidenav-link d-flex align-items-center py-3 px-4 text-reset" href="#my-events">
              <MDBIcon far icon="calendar-alt" className="me-3" />
              <strong>My Events</strong>
            </a>
          </li>

          {/* Registered Events Link */}
          <li className="sidenav-item">
            <a className="sidenav-link d-flex align-items-center py-3 px-4 text-reset" href="#registered-events">
              <MDBIcon fas icon="clipboard-check" className="me-3" />
              <strong>Registered Events</strong>
            </a>
          </li>

        </ul>
      </nav>

      {/* Optional: Dark overlay background when sidebar is open to dim the main app screen */}
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