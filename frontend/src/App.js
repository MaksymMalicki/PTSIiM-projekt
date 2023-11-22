import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DisplayAppointments from "./pages/DisplayAppointments";
import Profile from "./pages/Profile";
import DisplayDoctors from "./pages/DisplayDoctors";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/displayAppointments' element={<DisplayAppointments />} />
          <Route path='/displayDoctors' element={<DisplayDoctors />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
