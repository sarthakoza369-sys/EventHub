import React, { useContext } from 'react';
import eventContext from '../context/events/eventContext';
import EventState from '../context/events/EventState';

const EventItems = (props) => {

  const context = useContext(eventContext);
  const {deleteEvent} = context
  const { event } = props;

  return (
    <div className="card h-100 shadow-sm border border-secondary" style={{ maxWidth: "340px", margin: "auto" }}>
      <img src={event.image || "https://via.placeholder.com/150"} className="card-img-top" />
      <div className="card-body py-2 px-3 d-flex flex-column justify-content-between">
        <div>
          <h6 className="card-title mb-1 fw-bold">{event.title}</h6>
          <p className="card-text text-muted mb-2" style={{ fontSize: "0.8rem" }}>{event.description}</p>
        </div>
        {/* <div className="mt-2 d-flex justify-content-end gap-3">
          <i className="far fa-trash-alt text-danger cursor-pointer" onClick={() => deleteEvent(event._id)} style={{ fontSize: "0.85rem",cursor: 'pointer' }} title="Delete"></i>
          <i className="far fa-edit text-primary cursor-pointer" style={{ fontSize: "0.85rem",cursor: 'pointer' }} title="Edit"></i>
        </div> */}
      </div>
    </div>
  );
};

export default EventItems;

