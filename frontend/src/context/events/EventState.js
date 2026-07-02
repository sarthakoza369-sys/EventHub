import eventContext from "./eventContext";
import { useContext, useState } from "react";

const EventState = (props)=>{
    const host = "http://localhost:5000"

    const eventsInitial = [];
    const [events, setEvents]= useState(eventsInitial);

    const myEventsInitial = [];
    const [myEvents, setMyEvents] = useState(myEventsInitial);

    const myRegEventsInitial = [];
    const [myRegEvents, setMyRegEvents] = useState(myRegEventsInitial)


    //Add an Event

    const addEvent = async(title, description, location, date, time)=>{

        //API CALL
        const response = await fetch(`${host}/api/events/addevent`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, location, date,time })
        });

        if(response.ok){
            const event = await response.json();
            setEvents(events.concat(event))
        }else{
            const json = await response.json();
            alert(json.error || "Something went wrong while adding the event!!");
        }
    }

    //Delete an event

    const deleteEvent = async (id)=>{
        
        //API CALL
        const response = await fetch(`${host}/api/events/delete_event/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

         if(response.ok){
             const newEvents = events.filter((event)=>event._id !== id);
             setEvents(newEvents);

            const newMyEvents = myEvents.filter((event) => event._id !== id);
            setMyEvents(newMyEvents);
            
        }else{
            const json = await response.json();
            alert(json.error || "Something went wrong while deleting the event!!");
        }
    }

    //Edit an event

    const editEvent = async (id, title, description, location, date, time) => {

        //API CALL
        const response = await fetch(`${host}/api/events/editevent/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, location, date,time })
        });

        if (response.ok) {
           // update home feed
           const newEvents = events.map((event) => {
               if (event._id === id) {
                   return { ...event, title, description, location, date, time };
               }
               return event;
           });
           setEvents(newEvents);
       
           // update myEvents
           const newMyEvents = myEvents.map((event) => {
               if (event._id === id) {
                   return { ...event, title, description, location, date, time };
               }
               return event;
           });
           setMyEvents(newMyEvents);
       } else {
            const json = await response.json();
            alert(json.error || "Something went wrong while editing the event!!");       }
    }

    //Get ALL events
    const getAllEvents = async ()=>{
        
        //const token = localStorage.getItem('token');
        //console.log("TOKEN BEING SENT TO BACKEND:", token)

        //API CALL
        const response = await fetch(`${host}/api/events/fetchevents`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        
        if(response.ok){
            const json = await response.json();
            setEvents(json);
        }else{
            const json = await response.json();
            alert(json.error || "Something went wrong!!");        }
    }

    //Get Hosted events
    const getHostedEvents = async()=>{
        //API CALL
        const response = await fetch(`${host}/api/events/myevents`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        if(response.ok){
            const json = await response.json();
            setMyEvents(json);
        }else{
            const json = await response.json();
            alert(json.error || "Something went wrong while adding the event!!");
        }
    }

    //Get Registered events
    const getRegEvents = async()=>{
        //API CALL
        const response = await fetch(`${host}/api/events/registeredevents`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        if(response.ok){
            const json = await response.json();
            setMyRegEvents(json);
        }else{
            const json = await response.json();
            alert(json.error || "Something went wrong");
        }
    }

    
    const registerEvent = async (id) => {
        const response = await fetch(`${host}/api/events/register/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        if (response.ok) {
            await getAllEvents();      // refresh home feed (attendee count updates)
            await getRegEvents();      // refresh registered events list
        } else {
            const json = await response.json();
            alert(json.error || "Something went wrong while registration!!");
        }
        }

        const unregisterEvent = async (id) => {
            const response = await fetch(`${host}/api/events/unregister/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });

            if (response.ok) {
                await getAllEvents();      // refresh home feed (attendee count updates)
                await getRegEvents();      // refresh registered events list
            } else {
                const json = await response.json();
                alert(json.error || "Something went wrong with unregistration");
            }
            }

            return (
    <eventContext.Provider value={{events, myEvents, myRegEvents,addEvent, deleteEvent, editEvent,getAllEvents, getHostedEvents, getRegEvents,registerEvent, unregisterEvent
    }}>
        {props.children}
    </eventContext.Provider>
)
}

export default EventState;