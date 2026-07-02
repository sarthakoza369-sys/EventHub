import logo from './logo.svg';
import './App.css';
import Hamburger from './Components/Hamburger';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import AddEvents from './Components/AddEvents';
import MyEvents from './Components/MyEvents';
import RegEvents from './Components/RegEvents';
import EventState from './context/events/EventState'
import Login from './Components/Login';
import Signup from './Components/Signup';
import AuthenticationScreen from './Components/AuthenticationScreen';
import { Children, useState } from 'react';
import Alert from './Components/Alert';

const ProtectedRoute = ({children})=>{
  const token = localStorage.getItem('token');

  //If no token exists, immediately redirect to landing page instead of flashing
  if(!token){
    return <Navigate to='/' replace/>
  } 
  return children;
}
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
            {/* Public Entry Points */}
            <Route path="/" element = {<AuthenticationScreen/>} />
            <Route path="/login" element={<Login showAlert={showAlert}/>}/>
            <Route path="/signup" element={<Signup showAlert={showAlert}/>}/>

            {/* Protected Dashboards (Wrapped Safe) */}
            <Route path="/home" element={<ProtectedRoute><Home showAlert={showAlert}/></ProtectedRoute>} />
            <Route path="/addevent" element={<ProtectedRoute><AddEvents showAlert={showAlert}/></ProtectedRoute>} />
            <Route path="/myevents" element={<ProtectedRoute><MyEvents showAlert={showAlert}/></ProtectedRoute>} />
            <Route path="/registeredevents" element={<ProtectedRoute><RegEvents showAlert={showAlert}/></ProtectedRoute>} />
          </Routes>
         </div>
      </Router>
    </EventState>
  </>
);
}

export default App;
