import React, { useEffect, useContext } from 'react';
import EventItems from './EventItems';
import eventContext from '../context/events/eventContext';

const Event = (props) => {
  const context = useContext(eventContext);
  const { events, getAllEvents } = context;

  useEffect(() => {
      getAllEvents();
      // eslint-disable-next-line
  }, []);

  return (
    <div className="container my-3">
      <h2>Upcoming Events</h2>
      {events.length===0?(
                <h3 className="text-center my-5">You have not hosted any event</h3>
      ):(
        <div className="row">
        {events.map((event) => {
          return (
            <div className="col-md-4 p-3" key={event._id}>
              <EventItems event={event} showAlert={props.showAlert} />           
 </div>
          );
        })}
      </div>
      )}
    </div>
  );
};

export default Event;