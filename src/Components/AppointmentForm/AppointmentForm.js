import React, { useState } from 'react';


const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const availableSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM',
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name || !phoneNumber || !appointmentDate || !selectedSlot) {
      alert('Please fill all fields before booking.');
      return;
    }

    onSubmit({
      name,
      phoneNumber,
      appointmentDate,
      selectedSlot,
    });

    // Clear form after submit
    setName('');
    setPhoneNumber('');
    setAppointmentDate('');
    setSelectedSlot('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <h3 style={{ textAlign: 'center' }}>Book an Appointment</h3>

      <div className="form-group">
        <label htmlFor="name">Patient Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          placeholder="e.g. 9876543210"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentDate">Select Date:</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Select Time Slot:</label>
        <div className="slot-container">
          {availableSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="submit-btn">Book Now</button>
    </form>
  );
};

export default AppointmentForm;
