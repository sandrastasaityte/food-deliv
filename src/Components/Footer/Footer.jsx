import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-box">
          <h3>About Us</h3>
          <p>
            Delicious food delivered fast to your doorstep. Fresh ingredients, 
            tasty meals, and 24/7 service.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-box">
          <h3>Quick Links</h3>
          <a href="#dishes">Dishes</a>
          <a href="#menu">Menu</a>
          <a href="#review">Reviews</a>
          <a href="#order">Order Now</a>
        </div>

        {/* Contact Info */}
        <div className="footer-box">
          <h3>Contact</h3>
          <p>+123-456-7890</p>
          <p>support@fooddelivery.com</p>
          <p> 123 Food Street, City, Country</p>
        </div>

        {/* Social Media */}
        <div className="footer-box">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Food Delivery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
