import React, { useState } from 'react';
import './ReviewForm.css';

// ⭐ StarRating Component
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

// ✏️ ReviewForm Component
const ReviewForm = ({ doctor, onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [review, setReview] = useState(initialData?.review || '');
  const [rating, setRating] = useState(initialData?.rating || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(doctor.id, { name, review, rating });
  };

  return (
    <div className="review-form-wrapper">
      <h2>{initialData ? 'Edit' : 'Leave'} a Review for {doctor.name}</h2>
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

        <button type="submit">{initialData ? 'Update Review' : 'Submit Review'}</button>
      </form>
    </div>
  );
};

// 🧠 Main Reviews Component
const Review = () => {
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
  const [isEditing, setIsEditing] = useState(false);

  const handleReviewSubmit = (id, reviewData) => {
    const updatedDoctors = doctors.map((doc) =>
      doc.id === id ? { ...doc, review: reviewData } : doc
    );
    setDoctors(updatedDoctors);
    setActiveDoctor(null);
    setIsEditing(false);
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
                          <button onClick={() => { setActiveDoctor(doc); setIsEditing(false); }}>
                            Click Here
                          </button>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>
                        {doc.review ? (
                          <>
                            ✓{' '}
                            <button
                              className="edit-button"
                              onClick={() => {
                                setActiveDoctor(doc);
                                setIsEditing(true);
                              }}
                            >
                              Edit
                            </button>
                          </>
                        ) : (
                          '✗'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <ReviewForm
              doctor={activeDoctor}
              onSubmit={handleReviewSubmit}
              initialData={isEditing ? activeDoctor.review : null}
            />
          )}
        </div>

        <div className="signup-image-side">
          <img src="/feedback-image-placeholder.png" alt="Feedback Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Review;
