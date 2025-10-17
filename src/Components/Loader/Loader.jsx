import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import FoodCarousel from "../../assets/Food_Carousel.json"; // adjust if needed

const Loader = () => {
  return (
    <div style={{ width: "200px", margin: "auto", marginTop: "50px" }}>
      <DotLottieReact src={FoodCarousel} autoplay loop />
    </div>
  );
};

export default Loader;
