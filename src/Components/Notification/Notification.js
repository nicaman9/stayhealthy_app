// Notification.js
import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  // Function to check and load appointment data
  const loadAppointmentData = () => {
    try {
      const doctorData = JSON.parse(localStorage.getItem('doctorData'));
      if (!doctorData?.name) return;

      const storedAppointment = JSON.parse(localStorage.getItem(doctorData.name));

      if (storedAppointment && typeof storedAppointment === 'object') {
        setAppointmentDetails(storedAppointment);
        setShowNotification(true);
      } else {
        setAppointmentDetails(null);
        setShowNotification(false);
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  };

  // Load appointment data on mount and when custom event is triggered
  useEffect(() => {
    loadAppointmentData();

    const handleUpdate = () => loadAppointmentData();

    // Listen for a custom event triggered when appointment is updated
    window.addEventListener('appointmentUpdated', handleUpdate);

    // Cleanup
    return () => {
      window.removeEventListener('appointmentUpdated', handleUpdate);
    };
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
          <h3 className="notif-title">Appointment Details</h3>
          <p><strong>Patient:</strong> {appointmentDetails.name}</p>
          <p><strong>Date:</strong> {appointmentDetails.date}</p>
          <p><strong>Time:</strong> {appointmentDetails.time}</p>
          <p><strong>Doctor:</strong> {appointmentDetails.doctor}</p>
          <button className="notif-cancel-btn" onClick={handleCancel}>
            Cancel Appointment
          </button>
        </div>
      )}
      {children}
    </div>
  );
};

export default Notification;
