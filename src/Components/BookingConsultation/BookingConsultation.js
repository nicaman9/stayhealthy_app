// BookingConsultation.js
import React, { useState } from 'react';
import DoctorCard from '../DoctorCard/DoctorCard';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import Notification from '../Notification/Notification';

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
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Handles doctor filtering from FindDoctorSearch
  const handleSpecialitySelect = (speciality) => {
    const filtered = doctorsList.filter(
      (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
    );
    setFilteredDoctors(filtered);
    setSelectedDoctor(null); // Clear selected doctor when filtering
  };

  // Called when an appointment is submitted
  const handleAppointmentSubmit = (appointment) => {
    if (!selectedDoctor) return;

    const doctorData = {
      name: selectedDoctor.name,
      speciality: selectedDoctor.speciality,
    };

    // Save doctor info for Notification
    localStorage.setItem('doctorData', JSON.stringify(doctorData));

    // Add doctor name to appointment and save
    const fullAppointment = {
      ...appointment,
      doctor: selectedDoctor.name,
    };

    localStorage.setItem(selectedDoctor.name, JSON.stringify(fullAppointment));

    // Notify Notification component
    window.dispatchEvent(new Event('appointmentUpdated'));

    alert('Appointment booked successfully!');
    setSelectedDoctor(null); // Optionally hide the form after booking
  };

  return (
    <Notification>
      <div className="booking-consultation-page">
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Book an Instant Consultation</h2>

        {/* Search component */}
        <FindDoctorSearch onSpecialitySelect={handleSpecialitySelect} />

        {/* Doctor Cards Section */}
        <div className="doctor-cards-list">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) => (
              <DoctorCard
                key={index}
                name={doctor.name}
                speciality={doctor.speciality}
                experience={doctor.experience}
                ratings={doctor.ratings}
                onClick={() => setSelectedDoctor(doctor)} // Select doctor on card click
              />
            ))
          ) : (
            <p style={{ textAlign: 'center', marginTop: '2rem' }}>
              No doctors found for the selected speciality.
            </p>
          )}
        </div>

        {/* Appointment Form */}
        {selectedDoctor && (
          <div className="appointment-form-wrapper" style={{ marginTop: '2rem' }}>
            <h3 style={{ textAlign: 'center' }}>
              Booking appointment with {selectedDoctor.name}
            </h3>
            <AppointmentForm
              doctorName={selectedDoctor.name}
              doctorSpeciality={selectedDoctor.speciality}
              onSubmit={handleAppointmentSubmit}
            />
          </div>
        )}
      </div>
    </Notification>
  );
};

export default BookingConsultation;
