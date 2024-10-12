import { assets } from "@/assets/assets";
import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { StoreContext } from "@/context/StoreContext";


const Navbar = ({setShowLogin}) => {
     const [menu , setMenu] = useState("home");
     const { getTotalCalculateAmount} = useContext(StoreContext);

  return (
    <div className="navbar">
    <Link to="/"><img src={assets.logo} alt="logo" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("home")}  className={menu === "home" ? "active" : ""}>Home</Link>
        <a href="#explore-menu" onClick={()=>setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href="#device-display" onClick={()=>setMenu("about")} className={menu === "about" ? "active" : ""}>About</a>
        <a href="#footer" onClick={()=>setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" className="search" />
        <div className="navbar-search-icon">
        <Link to="/cart"><img src={assets.basket_icon} alt="" srcset="" /></Link>
          <div className={getTotalCalculateAmount()? "dot" : ""}></div>
        </div>
        <button className="btn" onClick={()=>setShowLogin(true)}>SignIn</button>
      </div>
    </div>
  );
};

export default Navbar;
