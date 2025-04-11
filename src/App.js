// Import necessary modules from React library
import React, { useEffect } from 'react';

// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';

import Landing_Page from './Components/Landing_Page/Landing_Page'
import SignUp from './Components/Sign_up/Sign_up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/Instant_consultation/InstantConsultation';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation';

// Function component for the main App
function App() {

  // Render the main App component
  return (
    <div className="App">
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          {/* Display the Navbar component */}
          <Navbar/>

          {/* Set up the Routes for different pages */}
          <Routes>
            {/* Define individual Route components for different pages */}
            <Route path="/" element={<Landing_Page/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/InstantConsultation" element={<InstantConsultation/>}/>
            <Route path="/FindDoctorSearch" element={<FindDoctorSearch/>}/>
            <Route path="/BookingConsultation" element={<BookingConsultation />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;