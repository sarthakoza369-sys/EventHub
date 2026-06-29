import logo from './logo.svg';
import './App.css';
import Hamburger from './Components/Hamburger';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import AddEvents from './Components/AddEvents';
import MyEvents from './Components/MyEvents';
import RegEvents from './Components/RegEvents';

function App() {
  return (
    <>
      <div className="App">
        <Router>
           <Hamburger/>
           <Navbar/>
           <div className="container">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/addevent" element={<AddEvents/>} />
              <Route path="/myevents" element={<MyEvents/>} />
              <Route path="/registeredevents" element={<RegEvents/>} />
            </Routes>
           </div>
        </Router>
        
      </div>
    </>
  );
}

export default App;
