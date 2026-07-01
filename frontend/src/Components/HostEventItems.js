import React, { useContext } from 'react';
import eventContext from '../context/events/eventContext';

const HostEventItems = (props) => {
  const context = useContext(eventContext);
  const {deleteEvent} = context
  const { event, updateEvent } = props;


  return (
    <div className="card h-100 shadow-sm border border-secondary" style={{ maxWidth: "340px", margin: "auto" }}>
      <span 
        className="badge text-bg-dark position-absolute top-0 end-0 m-2 px-2 py-1 shadow-sm"
        style={{ fontSize: "0.75rem", zIndex: 10 }}
      >
        {event.location} | {event.time} | {event.date.split('T')[0]}
      </span>
      <img src={event.image || "https://placehold.co/50"} className="card-img-top" alt="..." />
      <div className="card-body py-2 px-3 d-flex flex-column justify-content-between">
        <div>
          <h6 className="card-title mb-1 fw-bold">{event.title}</h6>
          <p className="card-text text-muted mb-2" style={{ fontSize: "0.8rem" }}>{event.description}</p>

          <div className="mt-2 d-flex justify-content-end gap-3">
            <span onClick={async ()=>{await deleteEvent(event._id);
              props.showAlert("Deleted successfully!!", "success");
            }} style= {{fontSize: "0.85rem",cursor: 'pointer' }}>
              <i className="far fa-trash-alt text-danger cursor-pointer" title="Delete"></i>
            </span>

            <span style={{ fontSize: "0.85rem",cursor: 'pointer'}} onClick={()=>{updateEvent(event)}}>
              <i className="far fa-edit text-primary cursor-pointer" title="Edit"></i>
            </span>
          </div> 

        </div>
      </div>
    </div>
  );
};

export default HostEventItems;


