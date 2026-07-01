import React, { useContext, useState, useEffect } from "react";
import eventContext from "../context/events/eventContext";
import { useNavigate } from "react-router-dom";

const AddEvents = (props) => {
  const context = useContext(eventContext);
  const { addEvent } = context;
  const { event } = props;

  let navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/');
    }
  })

  // 1. Setup local state for input fields
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });

  const handleClick = (e) => {
    e.preventDefault();

    // 2. Pass local state object instead of the click event
    addEvent(
      eventData.title,
      eventData.description,
      eventData.location,
      eventData.date,
    );

    //3. Clear form fields after adding
    setEventData({ title: "", description: "", location: "", date: "" });
  };

  const onChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  return (
    <div className="conatiner my-4">
      <h1>Host an Event!!</h1>
      <form className="my-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Event Name
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={eventData.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={eventData.description}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={eventData.location}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={eventData.date}
            onChange={onChange}
          />
        </div>
        <button type="text" className="btn btn-primary" onClick={handleClick}>
          Host Event Live!!
        </button>
      </form>
    </div>
  );
};

export default AddEvents;
