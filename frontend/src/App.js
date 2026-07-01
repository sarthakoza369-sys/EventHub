import logo from './logo.svg';
import './App.css';
import Hamburger from './Components/Hamburger';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import AddEvents from './Components/AddEvents';
import MyEvents from './Components/MyEvents';
import RegEvents from './Components/RegEvents';
import EventState from './context/events/EventState'
import Login from './Components/Login';
import Signup from './Components/Signup';
import AuthenticationScreen from './Components/AuthenticationScreen';
import { useState } from 'react';
import Alert from './Components/Alert';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert= (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(()=>{
      setAlert(null);
    }, 2000);
  }

  return (
    <>
      <EventState>
        <Router>
           <Hamburger/>
           <Navbar/>
           <Alert alert={alert}/>
           <div className="container">
            <Routes>
              <Route path="/home" element={<Home showAlert={showAlert}/>} />
              <Route path="/addevent" element={<AddEvents showAlert={showAlert}/>} />
              <Route path="/myevents" element={<MyEvents showAlert={showAlert}/>} />
              <Route path="/registeredevents" element={<RegEvents showAlert={showAlert}/>} />
              <Route path="/login" element={<Login showAlert={showAlert}/>}/>
              <Route path="/signup" element={<Signup showAlert={showAlert}/>}/>
            </Routes>
           </div>
        </Router>
      </EventState>
    </>
  );
}

export default App;
