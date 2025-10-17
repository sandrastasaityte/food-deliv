import React from "react";
import "./Menu.css"; // make sure this file exists
import food_1 from "../../assets/food_1.png";
import food_2 from "../../assets/food_2.png";
import food_3 from "../../assets/food_3.png";
import food_4 from "../../assets/food_4.png";
import food_5 from "../../assets/food_5.png";
import food_6 from "../../assets/food_6.png";
import food_7 from "../../assets/food_7.png";
import food_8 from "../../assets/food_8.png";
import food_9 from "../../assets/food_9.png";
import food_10 from "../../assets/food_10.png";
import food_11 from "../../assets/food_11.png";

const menuData = [
  { id: 1, image: food_1, title: "Delicious Dish 1", price: "$12.99" },
  { id: 2, image: food_2, title: "Delicious Dish 2", price: "$13.99" },
  { id: 3, image: food_3, title: "Delicious Dish 3", price: "$14.99" },
  { id: 4, image: food_4, title: "Delicious Dish 4", price: "$15.99" },
  { id: 5, image: food_5, title: "Delicious Dish 5", price: "$11.99" },
  { id: 6, image: food_6, title: "Delicious Dish 6", price: "$12.49" },
  { id: 7, image: food_7, title: "Delicious Dish 7", price: "$13.49" },
  { id: 8, image: food_8, title: "Delicious Dish 8", price: "$14.49" },
  { id: 9, image: food_9, title: "Delicious Dish 9", price: "$15.49" },
  { id: 10, image: food_10, title: "Delicious Dish 10", price: "$16.49" },
  { id: 11, image: food_11, title: "Delicious Dish 11", price: "$17.49" },
];

const Menu = () => {
  return (
    <section className="menu" id="menu">
      <h3 className="sub-heading">Our menu</h3>
      <h1 className="heading">Today's special menu</h1>

      <div className="menu-container">
        {menuData.map((dish) => (
          <div key={dish.id} className="menu-box">
            <img src={dish.image} alt={dish.title} />
            <h3>{dish.title}</h3>
            <span className="price">{dish.price}</span>
            <a href="#" className="btn">
              <i className="fas fa-shopping-cart"></i> add to cart
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
