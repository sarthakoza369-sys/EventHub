import React, { useContext } from 'react';
import eventContext from '../context/events/eventContext';

const EventItems = (props) => {
  const context = useContext(eventContext);
  const {registerEvent} = context
  const { event } = props;


  return (
    <div className="card h-100 shadow-sm border border-secondary" style={{ maxWidth: "340px", margin: "auto" }}>
      <span 
        className="badge text-bg-dark position-absolute top-0 px-2 py-1 shadow-sm"
        style={{ fontSize: "0.75rem", zIndex: 10, whiteSpace: "nowrap", right: "-15px", top: "-10px" }}
      >
        {event.location} | {event.time} | {event.date.split('T')[0]}
      </span>
      <img src={event.image || "https://placehold.co/50"} className="card-img-top" alt="..." />
      <div className="card-body py-2 px-3 d-flex flex-column justify-content-between">
        <div>
          <h6 className="card-title mb-1 fw-bold">{event.title}</h6>
          <p className="card-text text-muted mb-2" style={{ fontSize: "0.8rem" }}>{event.description}</p>
        </div>

      <div className="mt-3 d-flex justify-content-between align-items-center">
          <p className="mb-0 text-muted fw-bold" style={{ fontSize: "0.8rem"  }}>
            HOST : <span className="fw-semibold ms-1" style={{color: "#4f46e5"}}>{event.host.name}</span>
          </p>
          
          <button 
            className="btn btn-primary btn-sm px-3" 
            onClick={async() => {await registerEvent(event._id);
              props.showAlert("Registered successfully!!", "success");
             }} 
            style={{ fontSize: "0.75rem", borderRadius: "4px" }}
          >
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventItems;


{/* <div className="mt-2 d-flex justify-content-end gap-3">
  <i className="far fa-trash-alt text-danger cursor-pointer" onClick={() => deleteEvent(event._id)} style={{ fontSize: "0.85rem",cursor: 'pointer' }} title="Delete"></i>
  <i className="far fa-edit text-primary cursor-pointer" style={{ fontSize: "0.85rem",cursor: 'pointer' }} title="Edit"></i>
</div> */}