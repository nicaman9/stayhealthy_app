import React, { useState, useRef, useEffect } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ent) Specialist',
  'Homeopath',
  'Ayurveda'
];

const FindDoctorSearch = () => {
  const [searchDoctor, setSearchDoctor] = useState('');
  const [filteredSpecialities, setFilteredSpecialities] = useState(initSpeciality);
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();

  // Filter specialties based on searchDoctor input
  useEffect(() => {
    const results = initSpeciality.filter(spec =>
      spec.toLowerCase().includes(searchDoctor.toLowerCase())
    );
    setFilteredSpecialities(results);
  }, [searchDoctor]);

  // Detect clicks outside the search box
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setDoctorResultHidden(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);
    navigate(`/instant-consultation?speciality=${encodeURIComponent(speciality)}`);
    window.location.reload();
  };

  return (
    <div className="finddoctor">
      <center>
        <h1>Find a doctor and Consult instantly</h1>
        <div>
          <i style={{ color: '#000000', fontSize: '20rem' }} className="fa fa-user-md"></i>
        </div>
        <div className="home-search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="doctor-search-box" ref={searchBoxRef}>
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals, etc."
              value={searchDoctor}
              onFocus={() => setDoctorResultHidden(false)}
              onChange={(e) => setSearchDoctor(e.target.value)}
            />

            <div className="findiconimg">
              <img className="findIcon" src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" />
            </div>

            {!doctorResultHidden && (
              <div className="search-doctor-input-results">
                {
                  filteredSpecialities.length > 0 ? (
                    filteredSpecialities.map(speciality => (
                      <div
                        className="search-doctor-result-item"
                        key={speciality}
                        onMouseDown={() => handleDoctorSelect(speciality)}
                      >
                        <span>
                          <img src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" style={{ height: "10px", width: "10px" }} />
                        </span>
                        <span>{speciality}</span>
                        <span> SPECIALITY </span>
                      </div>
                    ))
                  ) : (
                    <div className="search-doctor-result-item">
                      <span>No specialties found</span>
                    </div>
                  )
                }
              </div>
            )}
          </div>
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearch;
