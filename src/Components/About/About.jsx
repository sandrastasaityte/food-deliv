import React from "react";
import "./About.css";
import image22 from "../../assets/image22.avif";

const About = () => {
  return (
    <section className="about" id="about">
      <h3 className="sub-heading">About us</h3>
      <h1 className="heading">Why choose us</h1>

      <div className="row">
        <div className="image">
          <img src={image22} alt="About us" />
        </div>

        <div className="content">
          <h3>Best food in the country</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

          <div className="icons-container">
            <div className="icons">
              <i className="fas fa-shipping-fast"></i>
              <span>free delivery</span>
            </div>
            <div className="icons">
              <i className="fas fa-dollar-sign"></i>
              <span>easy payment</span>
            </div>
            <div className="icons">
              <i className="fas fa-headset"></i>
              <span>24/7 support</span>
            </div>
          </div>

          <a href="#" className="btn">
            learn more
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
