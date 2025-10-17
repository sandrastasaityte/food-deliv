import React from 'react';
import './Review.css';
import ig_01 from '../../assets/ig_01.jpg';
import ig_02 from '../../assets/ig_02.jpg';
import ig_03 from '../../assets/ig_03.jpg';

const reviewsData = [
  {
    id: 1,
    image: ig_01,
    name: 'John Doe',
    rating: 4.5,
    text: 'Absolutely loved the food! Fresh ingredients and amazing flavors. Highly recommend!',
  },
  {
    id: 2,
    image: ig_02,
    name: 'Jane Smith',
    rating: 5,
    text: 'Excellent service and delicious meals. The best delivery experience I have ever had!',
  },
  {
    id: 3,
    image: ig_03,
    name: 'Mike Johnson',
    rating: 4,
    text: 'Great variety and tasty dishes. Will definitely order again soon!',
  },
];

const Review = () => {
  return (
    <section className="review">
      <h3 className="review-sub-heading">Customer Reviews</h3>
      <h1 className="review-heading">What They Say</h1>

      <div className="review-slider">
        {reviewsData.map((review) => (
          <div key={review.id} className="review-slide">
            <i className="fas fa-quote-right quote-icon"></i>
            <div className="user">
              <img src={review.image} alt={review.name} />
              <div className="user-info">
                <h3>{review.name}</h3>
                <div className="stars">
                  {[...Array(Math.floor(review.rating))].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                  {review.rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
                </div>
              </div>
            </div>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Review;
