import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import SignUp from './Components/Sign_up/Sign_up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/Instant_consultation/InstantConsultation';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation';
import Notification from './Components/Notification/Notification';
import Review from './Components/ReviewForm/ReviewForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notification> {/* Wraps Navbar + Routes */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/InstantConsultation" element={<InstantConsultation />} />
            <Route path="/FindDoctorSearch" element={<FindDoctorSearch />} />
            <Route path="/BookingConsultation" element={<BookingConsultation />} />
            <Route path="/Review" element={<Review />} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;
