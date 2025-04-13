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

const specialities = [
  'All',
  ...new Set(doctorsList.map((doc) => doc.speciality)),
];

const BookingConsultation = () => {
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsList);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('All');

  // Filter logic that combines search and specialty
  const filterDoctors = (search = '', speciality = 'All') => {
    let filtered = [...doctorsList];

    if (speciality !== 'All') {
      filtered = filtered.filter(
        (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
      );
    }

    if (search) {
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(search.toLowerCase()) ||
          doc.speciality.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
    setSelectedDoctor(null); // Clear selected doctor
  };

  // Handle text search from search bar
  const handleSearchResults = (searchText) => {
    setSearchQuery(searchText);
    filterDoctors(searchText, selectedSpeciality);
  };

  // Handle dropdown specialty change
  const handleSpecialitySelect = (speciality) => {
    setSelectedSpeciality(speciality);
    filterDoctors(searchQuery, speciality);
  };

  // Handle appointment form submission
  const handleAppointmentSubmit = (appointment) => {
    if (!selectedDoctor) return;

    const doctorData = {
      name: selectedDoctor.name,
      speciality: selectedDoctor.speciality,
    };

    localStorage.setItem('doctorData', JSON.stringify(doctorData));

    const fullAppointment = {
      ...appointment,
      doctor: selectedDoctor.name,
    };

    localStorage.setItem(selectedDoctor.name, JSON.stringify(fullAppointment));

    window.dispatchEvent(new Event('appointmentUpdated'));

    alert('Appointment booked successfully!');
    setSelectedDoctor(null);
  };

  return (
    <Notification>
      <div className="booking-consultation-page">
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Book an Instant Consultation
        </h2>

        {/* Search and specialty dropdown */}
        <FindDoctorSearch
          doctors={doctorsList}
          onSearchResults={handleSearchResults}
          onSpecialitySelect={handleSpecialitySelect}
          specialities={specialities}
          selectedSpeciality={selectedSpeciality}
        />

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
                onClick={() => setSelectedDoctor(doctor)}
              />
            ))
          ) : (
            <p style={{ textAlign: 'center', marginTop: '2rem' }}>
              No doctors found for your search.
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
