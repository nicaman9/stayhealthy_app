// Notification.js
import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  useEffect(() => {
    try {
      const doctorData = JSON.parse(localStorage.getItem('doctorData'));
      if (!doctorData?.name) return;

      const storedAppointment = JSON.parse(localStorage.getItem(doctorData.name));

      // Prevent runtime error on malformed storage
      if (storedAppointment && typeof storedAppointment === 'object') {
        setAppointmentDetails(storedAppointment);
        setShowNotification(true);
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  }, []);

  const handleCancel = () => {
    const doctorData = JSON.parse(localStorage.getItem('doctorData'));
    if (doctorData?.name) {
      localStorage.removeItem(doctorData.name);
    }
    setAppointmentDetails(null);
    setShowNotification(false);
  };

  return (
    <div className="notification-wrapper">
      {showNotification && appointmentDetails && (
        <div className="notification-card">
          <h3 className="notif-title">Appointment Booked!</h3>
          <p><strong>Patient:</strong> {appointmentDetails.name}</p>
          <p><strong>Email:</strong> {appointmentDetails.email}</p>
          <p><strong>Date:</strong> {appointmentDetails.date}</p>
          <p><strong>Time:</strong> {appointmentDetails.time}</p>
          <p><strong>Doctor:</strong> {appointmentDetails.doctor}</p>
          <button className="notif-cancel-btn" onClick={handleCancel}>Cancel Appointment</button>
        </div>
      )}
      {children}
    </div>
  );
};

export default Notification;
