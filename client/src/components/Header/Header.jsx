import React from "react";
import "./Header.css";
import { backgroundImages } from "@/assets/assets"; // Adjusted import for backgroundImages

const Header = () => {
  return (
    <div className="header">
      <div className="static-image">
        <img src={backgroundImages[0]} alt="Header Background" className="background-image" />
      </div>
      <div className="header-content">
        <h2>Welcome to Food Paradise</h2>
        <p>
          Explore the finest cuisines from around the world. Indulge in
          delicious meals, fresh ingredients, and mouthwatering dishes.
        </p>
        <button>Order Now</button>
      </div>
    </div>
  );
};

export default Header;
