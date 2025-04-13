import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentFormIC from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';

const DoctorCardIC = ({ name, speciality, experience, ratings, profilePic, careerProfile }) => {
    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppointments] = useState([]);

    // ✅ Load existing appointment from localStorage on mount
    useEffect(() => {
        const storedAppointment = JSON.parse(localStorage.getItem(name));
        if (storedAppointment) {
            setAppointments([storedAppointment]);
        }
    }, [name]);

    const handleBooking = () => {
        setShowModal(true);
    };

    const handleCancel = (appointmentId) => {
        const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
        setAppointments(updatedAppointments);

        localStorage.removeItem(name);
        window.dispatchEvent(new Event('appointmentUpdated'));
    };

    const handleFormSubmit = (appointmentData) => {
        const newAppointment = {
            id: uuidv4(),
            name: appointmentData.name,
            phoneNumber: appointmentData.phoneNumber,
            date: appointmentData.appointmentDate,   // ✅ Mapped to "date"
            time: appointmentData.selectedSlot,      // ✅ Mapped to "time"
            doctor: name,
        };

        const doctorData = {
            name,
            speciality,
        };

        localStorage.setItem('doctorData', JSON.stringify(doctorData));
        localStorage.setItem(name, JSON.stringify(newAppointment));
        window.dispatchEvent(new Event('appointmentUpdated'));

        setAppointments([newAppointment]);
        setShowModal(false);
    };

    return (
        <div className="doctor-card-container">
            <div className="doctor-card-details-container">
                <div className="doctor-card-profile-image-container">
                    {profilePic ? (
                        <img src={profilePic} alt={name} className="doctor-profile-pic" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                    )}
                </div>

                <div className="doctor-card-details">
                    <div className="doctor-card-detail-name">{name}</div>
                    <div className="doctor-card-detail-speciality">{speciality}</div>
                    <div className="doctor-card-detail-experience">{experience} years experience</div>
                    <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                    {careerProfile && <div className="doctor-card-detail-career">{careerProfile}</div>}
                </div>
            </div>

            <div className="doctor-card-options-container">
                <Popup
                    trigger={
                        <button
                            className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}
                            onClick={handleBooking}
                        >
                            {appointments.length > 0 ? 'Cancel Appointment' : 'Book Appointment'}
                            <div className="booking-subtext">No Booking Fee</div>
                        </button>
                    }
                    modal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                >
                    {(close) => (
                        <div className="doctorbg" style={{ height: '600px', overflowY: 'scroll', padding: '20px' }}>
                            <div className="doctor-card-profile-image-container">
                                {profilePic ? (
                                    <img src={profilePic} alt={name} className="doctor-profile-pic" />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg>
                                )}
                            </div>

                            <div className="doctor-card-details">
                                <div className="doctor-card-detail-name">{name}</div>
                                <div className="doctor-card-detail-speciality">{speciality}</div>
                                <div className="doctor-card-detail-experience">{experience} years experience</div>
                                <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                                {careerProfile && <div className="doctor-card-detail-career">{careerProfile}</div>}
                            </div>

                            {appointments.length > 0 ? (
                                <>
                                    <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                                    {appointments.map((appointment) => (
                                        <div className="bookedInfo" key={appointment.id}>
                                            <p><strong>Name:</strong> {appointment.name}</p>
                                            <p><strong>Phone Number:</strong> {appointment.phoneNumber}</p>
                                            <p><strong>Date:</strong> {appointment.date}</p>
                                            <p><strong>Time:</strong> {appointment.time}</p>
                                            <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <AppointmentFormIC
                                    doctorName={name}
                                    doctorSpeciality={speciality}
                                    onSubmit={handleFormSubmit}
                                />
                            )}
                        </div>
                    )}
                </Popup>
            </div>
        </div>
    );
};

export default DoctorCardIC;