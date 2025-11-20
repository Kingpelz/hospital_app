import React, { useContext } from "react";
import Home from "./Pages/Home.jsx";

import Login from "./Pages/Login.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router"
import Dashboard from "./Pages/Dashboard.jsx";

import About from "./Pages/About.jsx";
import Register from "./Pages/Register.jsx";
import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";
import Profile from "./Pages/Profile.jsx";
import Appointment from "./Pages/Appointment.jsx";
import { storeContext } from "./Context/StoreContext.jsx";
import LogOut from "./Pages/LogOut.jsx";

function App() {

  const {isAuth} = useContext(storeContext)
  return (
    <div>
      <Router>
     <NavBar />
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/login" element={isAuth ? <Dashboard/> : <Login />} />
          <Route path="/register" element={isAuth ? <Dashboard/> : <Register />} />
          <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Login/> } />
          <Route path="/logout" element={isAuth ? <LogOut /> : <Login/>} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointment/:surgeryId" element={isAuth ? <Appointment/> : <Login/>}  />
      
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
