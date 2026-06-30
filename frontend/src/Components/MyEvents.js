import React,{useContext, useEffect} from 'react'
import EventItems from './EventItems';
import eventContext from '../context/events/eventContext';

const RegEvents = () => {

  const context = useContext(eventContext);
  const { myEvents, getHostedEvents } = context;

    useEffect(() => {
    if (localStorage.getItem('token')) {
      getHostedEvents();
       // eslint-disable-next-line
    }
  }, []);

  return (
    <div className="container my-3">
      <h2>Your Hosted Events</h2>

      {myEvents.length === 0 ? (
        <h3 className="text-center my-5">You have not hosted any event</h3>
      ) : (
        <div className="row">
          {myEvents.map((event) => {
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