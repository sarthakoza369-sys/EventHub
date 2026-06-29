import React, { useContext } from 'react'
import eventContext from '../context/events/eventContext'

const EventItems = (props) => {
  const context = useContext(eventContext);
  const { deleteEvent } = context;
  const { event, onEditClick } = props;

  return (
    <div className="col">
      <div className="card h-100">
        <img src={event.image || "..."} className="card-img-top" alt={event.title} />
        <div className="card-body">
          <h5 className="card-title">{event.title}</h5>
          <span style={{ cursor: 'pointer' }} onClick={() => deleteEvent(event._id)}>
            <i className="fa-solid fa-trash-can mx-2"></i>
          </span>
          <span style={{ cursor: 'pointer' }} onClick={() => onEditClick(event)}>
            <i className="fa-solid fa-pen-to-square mx-2"></i>
          </span>
          <p className="card-text">{event.description}</p>
        </div>
      </div>
    </div>
  )
}

export default EventItems