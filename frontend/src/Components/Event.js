import React, { useEffect, useContext } from 'react';
import EventItems from './EventItems';
import eventContext from '../context/events/eventContext';

const Event = () => {
  const context = useContext(eventContext);
  const { events, getAllEvents } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllEvents();
       // eslint-disable-next-line
    }
  }, []);

  return (
    <div className="container my-3">
      <h2>Upcoming Events</h2>
      <div className="row">
        {events.map((event) => {
          return (
            <div className="col-md-4 p-3" key={event._id}>
              <EventItems event={event} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Event;