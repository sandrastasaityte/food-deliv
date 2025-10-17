import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Home.css";

import image1 from "../../assets/image1.avif";
import image2 from "../../assets/image2.avif";
import image3 from "../../assets/image3.avif";
import image4 from "../../assets/image4.avif";

const Home = () => {
  return (
    <section className="home" id="home">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="home-slider"
      >
        <SwiperSlide className="slide">
          <div className="content">
            <span>Our Special Dish</span>
            <h3>Spicy Noodles</h3>
            <p>Hot and flavorful noodles made with love!</p>
            <a href="#" className="btn">Order Now</a>
          </div>
          <div className="image">
            <img src={image1} alt="Spicy Noodles" />
          </div>
        </SwiperSlide>

        <SwiperSlide className="slide">
          <div className="content">
            <span>Our Special Dish</span>
            <h3>Grilled Chicken</h3>
            <p>Juicy and tender grilled chicken with herbs.</p>
            <a href="#" className="btn">Order Now</a>
          </div>
          <div className="image">
            <img src={image2} alt="Grilled Chicken" />
          </div>
        </SwiperSlide>

        <SwiperSlide className="slide">
          <div className="content">
            <span>Our Special Dish</span>
            <h3>Fresh Sushi</h3>
            <p>Delicious sushi rolls prepared by our chefs.</p>
            <a href="#" className="btn">Order Now</a>
          </div>
          <div className="image">
            <img src={image3} alt="Fresh Sushi" />
          </div>
        </SwiperSlide>

        <SwiperSlide className="slide">
          <div className="content">
            <span>Our Special Dish</span>
            <h3>Italian Pasta</h3>
            <p>Classic Italian pasta with creamy sauce.</p>
            <a href="#" className="btn">Order Now</a>
          </div>
          <div className="image">
            <img src={image4} alt="Italian Pasta" />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Home;
