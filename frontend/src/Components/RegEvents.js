import React,{useContext, useEffect} from 'react'
import EventItems from './EventItems';
import eventContext from '../context/events/eventContext';

const RegEvents = () => {

  const context = useContext(eventContext);
  const { myRegEvents, getRegEvents } = context;

    useEffect(() => {
    if (localStorage.getItem('token')) {
      getRegEvents();
       // eslint-disable-next-line
    }
  }, []);

  return (
    <div className="container my-3">
      <h2>Your Registered Events</h2>

      {myRegEvents.length === 0 ? (
        <h3 className="text-center my-5">You have not registered for any event</h3>
      ) : (
        <div className="row">
          {myRegEvents.map((event) => {
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
}

export default RegEvents