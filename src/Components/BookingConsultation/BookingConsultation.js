import React, { useState } from 'react';
import DoctorCardIC from '../DoctorCardIC/DoctorCardIC';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import './BookingConsultation.css'; // optional CSS file

const doctorsList = [
  {
    name: 'Dr. Asha Mehta',
    speciality: 'Dentist',
    experience: 12,
    ratings: 4.7,
  },
  {
    name: 'Dr. Rajiv Kapoor',
    speciality: 'General Physician',
    experience: 8,
    ratings: 4.5,
  },
  {
    name: 'Dr. Neha Sharma',
    speciality: 'Gynecologist/Obstetrician',
    experience: 10,
    ratings: 4.6,
  },
  {
    name: 'Dr. Rohan Verma',
    speciality: 'Dermatologist',
    experience: 6,
    ratings: 4.3,
  },
];

const BookingConsultation = () => {
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsList);

  // Handles doctor filtering from FindDoctorSearch
  const handleSpecialitySelect = (speciality) => {
    const filtered = doctorsList.filter(
      (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
    );
    setFilteredDoctors(filtered);
  };

  return (
    <div className="booking-consultation-page">
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Book an Instant Consultation</h2>

      {/* Search component */}
      <FindDoctorSearch onSpecialitySelect={handleSpecialitySelect} />

      {/* Doctor Cards Section */}
      <div className="doctor-cards-list">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <DoctorCardIC
              key={index}
              name={doctor.name}
              speciality={doctor.speciality}
              experience={doctor.experience}
              ratings={doctor.ratings}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>No doctors found for the selected speciality.</p>
        )}
      </div>
    </div>
  );
};

export default BookingConsultation;
