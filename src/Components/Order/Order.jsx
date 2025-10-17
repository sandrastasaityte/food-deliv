import React from 'react';
import './Order.css';

const Order = () => {
  return (
    <section className="order">
      <h3 className="order-sub-heading">Order Now</h3>
      <h1 className="order-heading">Free and Fast Delivery</h1>

      <form className="order-form">
        <div className="input-row">
          <div className="input-group">
            <span>Your Name</span>
            <input type="text" placeholder="Enter your name" required />
          </div>
          <div className="input-group">
            <span>Your Number</span>
            <input type="tel" placeholder="Enter your number" required />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <span>Your Order</span>
            <input type="text" placeholder="Enter food name" required />
          </div>
          <div className="input-group">
            <span>Extras</span>
            <input type="text" placeholder="Extra requests" />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <span>Quantity</span>
            <input type="number" placeholder="How many orders" min="1" required />
          </div>
          <div className="input-group">
            <span>Date & Time</span>
            <input type="datetime-local" required />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <span>Your Address</span>
            <textarea placeholder="Enter your address" rows="3" required></textarea>
          </div>
          <div className="input-group">
            <span>Your Message</span>
            <textarea placeholder="Enter your message" rows="3"></textarea>
          </div>
        </div>

        <button type="submit" className="btn">Order Now</button>
      </form>
    </section>
  );
};

export default Order;
