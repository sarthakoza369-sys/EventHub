import React,{useContext, useEffect} from 'react'
import EventItems from './EventItems';
import eventContext from '../context/events/eventContext';
import UnregEventItems from './UnregEventItems';
import { useNavigate } from 'react-router-dom';

const RegEvents = (props) => {

  const context = useContext(eventContext);
  const { myRegEvents, getRegEvents } = context;

  let navigate = useNavigate();

useEffect(() => {
  getRegEvents();
  // eslint-disable-next-line
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
                <UnregEventItems event={event} showAlert={props.showAlert}/>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RegEvents