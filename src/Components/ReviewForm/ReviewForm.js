import React, { useState } from 'react';
import './ReviewForm.css';

const StarRating = ({ rating, setRating }) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div className="star-rating" role="radiogroup" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          role="radio"
          aria-checked={rating === star}
          tabIndex={0}
          className={`star ${star <= (hoveredStar || rating) ? 'filled' : ''}`}
          onClick={() => setRating(star)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setRating(star);
          }}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};


const ReviewForm = ({ doctor, onSubmit }) => {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(doctor.id, { name, review, rating });
  };

  return (
    <div className="review-form-wrapper">
      <h2>Leave a Review for {doctor.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Review:</label>
        <textarea
          className="form-control"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />

        <label>Rating:</label>
        <StarRating rating={rating} setRating={setRating} />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

const Reviews = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Jane Doe',
      specialty: 'Cardiology',
      review: null,
    },
    {
      id: 2,
      name: 'Dr. John Smith',
      specialty: 'Dermatology',
      review: null,
    },
  ]);

  const [activeDoctor, setActiveDoctor] = useState(null);

  const handleReviewSubmit = (id, reviewData) => {
    const updated = doctors.map((doc) =>
      doc.id === id ? { ...doc, review: reviewData } : doc
    );
    setDoctors(updated);
    setActiveDoctor(null);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <div className="signup-form-side">
          {!activeDoctor ? (
            <>
              <h2>Your Consultations</h2>
              <table className="review-table">
                <thead>
                  <tr>
                    <th>Doctor Name</th>
                    <th>Specialty</th>
                    <th>Provide Feedback</th>
                    <th>Review Given</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.name}</td>
                      <td>{doc.specialty}</td>
                      <td>
                        {!doc.review ? (
                          <button onClick={() => setActiveDoctor(doc)}>
                            Click Here
                          </button>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>{doc.review ? '✓' : '✗'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <ReviewForm doctor={activeDoctor} onSubmit={handleReviewSubmit} />
          )}
        </div>

        <div className="signup-image-side">
          <img src="/feedback-image-placeholder.png" alt="Review" />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
