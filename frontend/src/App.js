import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DisplayAppointments from "./pages/DisplayAppointments";
import DisplayDoctors from "./pages/DisplayDoctors";
import UserWelcome from "./pages/UserWelcome";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/display/appointments' element={<DisplayAppointments />} />
          <Route path='/display/doctors' element={<DisplayDoctors />} />
          <Route path='/user' element={<UserWelcome />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
