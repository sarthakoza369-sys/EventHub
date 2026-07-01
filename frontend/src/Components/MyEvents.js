import React,{useContext, useEffect, useRef, useState} from 'react'
import eventContext from '../context/events/eventContext';
import HostEventItems from './HostEventItems';
import {useNavigate} from 'react-router-dom';

const RegEvents = () => {

  const context = useContext(eventContext);
  const {myEvents, getHostedEvents, editEvent } = context;

  let navigate = useNavigate();

    useEffect(() => {
    if (localStorage.getItem('token')) {
      getHostedEvents();
       // eslint-disable-next-line
    }
    else{
      navigate('/')
    }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null)
  const [event, setEvent]=useState({etitle:"", edescription: "", elocation:"", edate:"", etime:""});

    const updateEvent=(currentEvent)=>{
      ref.current.click();

      setEvent({id: currentEvent._id, etitle: currentEvent.title, edescription: currentEvent.description, elocation:  currentEvent.location, edate: currentEvent.date ? currentEvent.date.substring(0, 10) : "", etime: currentEvent.time});
  }

      const handleClick=(e)=>{
        editEvent(event.id, event.etitle, event.edescription, event.elocation, event.edate, event.etime);
        refClose.current.click();
     }  

     const onChange=(e)=>{
        setEvent({...event, [e.target.name]: e.target.value})
     }

  return (
<>
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Event</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                 <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" value={event.etitle}id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label"> Description </label>
          <input type="text" className="form-control" value={event.edescription} id="edescription" name="edescription" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label"> Location </label>
          <input type="text" className="form-control" value={event.elocation} id="elocation" name="elocation" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label"> Date </label>
          <input type="date" className="form-control" value={event.edate} id="edate" name="edate" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label"> Time </label>
          <input type="text" className="form-control" value={event.etime} id="etime" name="etime" onChange={onChange}/>
        </div>
        {/* <button type="submit" className="btn btn-primary" onClick={handleClick}> Add Note </button> */}
      </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={event.etitle.length<3 || event.edescription.length<5 } onClick={handleClick} type="button" className="btn btn-primary">Update Event</button>
              </div>
            </div>
          </div>
        </div>

    <div className="container my-3">
      <h2>Your Hosted Events</h2>
      {myEvents.length === 0 ? (
        <h3 className="text-center my-5">You have not hosted any event</h3>
      ) : (
        <div className="row">
          {myEvents.map((event) => {
            return (
              <div className="col-md-4 p-3" key={event._id}>
                <HostEventItems event={event} updateEvent={updateEvent} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  </>
  );
}

export default RegEvents