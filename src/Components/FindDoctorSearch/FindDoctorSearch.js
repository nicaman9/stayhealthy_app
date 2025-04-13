import React, { useState, useRef, useEffect } from 'react';
import './FindDoctorSearch.css';

const FindDoctorSearch = ({
  doctors = [],
  onSearchResults,
  onSpecialitySelect,
  specialities = [],
  selectedSpeciality = 'All',
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);
  const searchBoxRef = useRef(null);

  // Filter on text input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearchResults(searchText);
    }, 300); // debounce delay
    return () => clearTimeout(delayDebounce);
  }, [searchText]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setSearchResultsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    const handleSearchClick = () => {
        if (searchDoctor.trim() === '') return;

        onDoctorSearch(searchDoctor.trim()); // pass to parent for filtering
    };


  return (
    <div className="finddoctor" style={{ paddingBottom: '2rem' }}>
      <center>
        <h1>Find a doctor and Consult instantly</h1>

        {/* Search Input Box */}
        <div className="home-search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="doctor-search-box" ref={searchBoxRef}>
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search by doctor name or specialty..."
              value={searchText}
              onFocus={() => setSearchResultsVisible(true)}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <div className="findiconimg">
                <button
                    type="button"
                    className="search-button"
                    onClick={handleSearchClick}>🔍
                </button>
            </div>

            {searchResultsVisible && searchText.trim() !== '' && (
              <div className="search-doctor-input-results">
                {doctors
                  .filter(
                    (doc) =>
                      doc.name.toLowerCase().includes(searchText.toLowerCase()) ||
                      doc.speciality.toLowerCase().includes(searchText.toLowerCase())
                  )
                  .map((doc, idx) => (
                    <div key={idx} className="search-doctor-result-item">
                      <span>
                        <img
                          src={process.env.PUBLIC_URL + '/images/search.svg'}
                          alt=""
                          style={{ height: '10px', width: '10px' }}
                        />
                      </span>
                      <span>{doc.name}</span>
                      <span>{doc.speciality}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Specialty Dropdown */}
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="speciality-select" style={{ marginRight: '10px' }}>
            Filter by Speciality:
          </label>
          <select
            id="speciality-select"
            value={selectedSpeciality}
            onChange={(e) => onSpecialitySelect(e.target.value)}
            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
          >
            {specialities.map((spec, idx) => (
              <option key={idx} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearch;
