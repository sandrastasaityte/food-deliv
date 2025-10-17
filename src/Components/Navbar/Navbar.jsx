import React, { useState } from "react";
import Search from "../Search/Search";
import "./Navbar.css";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => setIsActive(!isActive);
  const handleLinkClick = () => setIsActive(false);

  return (
    <header className="navbar-contain">
      <a href="#home" className="logo">
        <i className="fas fa-utensils"></i> resto.
      </a>

      <nav className={`navbar ${isActive ? "active" : ""}`}>
        <a href="#home" className="active" onClick={handleLinkClick}>Home</a>
        <a href="#dishes" onClick={handleLinkClick}>Dishes</a>
        <a href="#about" onClick={handleLinkClick}>About</a>
        <a href="#menu" onClick={handleLinkClick}>Menu</a>
        <a href="#review" onClick={handleLinkClick}>Review</a>
        <a href="#order" onClick={handleLinkClick}>Order</a>
      </nav>

      <div className="icons">
        <i
          id="menu-bars"
          className={`fas ${isActive ? "fa-times" : "fa-bars"}`}
          onClick={toggleMenu}
        ></i>
        <Search />
        <a href="#" className="fas fa-heart"></a>
        <a href="#" className="fas fa-shopping-cart"></a>
      </div>
    </header>
  );
};

export default Navbar;
