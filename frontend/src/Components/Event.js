import React, { useEffect, useContext } from 'react';
import EventItems from './EventItems';
import eventContext from '../context/events/eventContext';
import {useNavigate} from 'react-router-dom';

const Event = () => {
  const context = useContext(eventContext);
  const { events, getAllEvents } = context;

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllEvents();
       // eslint-disable-next-line
    }else{
      navigate('/');
    }
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
              <EventItems event={event} />
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
};

export default Event;