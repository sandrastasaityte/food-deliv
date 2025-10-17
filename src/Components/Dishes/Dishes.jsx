import React, {useContext} from "react";
import "./Dishes.css";
import { CartContext } from "../Context/CartContext";
import food_1 from "../../assets/image5.avif";
import food_2 from "../../assets/image6.avif";
import food_3 from "../../assets/image7.avif";
import food_4 from "../../assets/image8.avif";
import food_5 from "../../assets/image9.avif";
import food_6 from "../../assets/image10.avif";
import food_7 from "../../assets/image11.avif";
import food_8 from "../../assets/image12.avif";
import food_9 from "../../assets/image13.avif";
import food_10 from "../../assets/image16.avif";
import food_11 from "../../assets/image15.avif";

const dishesData = [
  { id: 1, image: food_1, title: "Tasty Food", price: "$15.99", stars: 4.5 },
  { id: 2, image: food_2, title: "Tasty Food", price: "$15.99", stars: 4.5 },
  { id: 3, image: food_3, title: "Tasty Food", price: "$15.99", stars: 4.5 },
  { id: 4, image: food_4, title: "Tasty Food", price: "$15.99", stars: 4.5 },
  { id: 5, image: food_5, title: "Tasty Food", price: "$15.99", stars: 4.5 },
  { id: 6, image: food_6, title: "Tasty Food", price: "$15.99", stars: 4.5 },
  { id: 7, image: food_7, title: "Tasty Food", price: "$15.99", stars: 4.5 },
  { id: 8, image: food_8, title: "Tasty Food", price: "$15.99", stars: 4.5 },
  { id: 9, image: food_9, title: "Tasty Food", price: "$15.99", stars: 4.5 },
  { id: 10, image: food_10, title: "Tasty Food", price: "$15.99", stars: 4.5 },
  { id: 11, image: food_11, title: "Tasty Food", price: "$15.99", stars: 4.5 },
];

const Dishes = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <section className="dishes" id="dishes">
      <h3 className="sub-heading">our dishes</h3>
      <h1 className="heading">popular dishes</h1>

      <div className="box-container">
        {dishesData.map((dish) => (
          <div key={dish.id} className="box">
            <a href="#" className="fas fa-heart"></a>
            <a href="#" className="fas fa-eye"></a>
            <img src={dish.image} alt={dish.title} />
            <h3>{dish.title}</h3>
            <div className="stars">
              {[...Array(4)].map((_, i) => (
                <i key={i} className="fas fa-star"></i>
              ))}
              <i className="fas fa-star-half-alt"></i>
            </div>
            <span>{dish.price}</span>
            <a href="#" className="btn" onClick={() => addToCart(dish)}>
              <i className="fas fa-shopping-cart"></i> add to cart
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dishes;
