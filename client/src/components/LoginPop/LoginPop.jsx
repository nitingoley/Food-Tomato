import React, { useState } from "react";
import "./LoginPop.css";
import { assets } from "@/assets/assets";

const LoginPop = ({ setShowLogin }) => {
  const [current, setCurrent] = useState("Login");

  const handleToggle = () => {
    setCurrent((prev) => (prev === "Login" ? "Sign Up" : "Login"));
  };

  return (
    <div className="login-pop">
      <form className="login-container">
        <div className="login-title">
          <h2>{current}</h2>
          <img
            onClick={() => setShowLogin(false)} // Corrected this to close the popup
            src={assets.cross_icon}
            alt="close"
          />
        </div>
        <div className="login-popup-in">
          {current === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Enter your name" required />
          )}
          <input type="email" placeholder="Enter your email" required />
          <input type="password" placeholder="Enter your password" required />
        </div>
        <button type="submit">
          {current === "Sign Up" ? "Create an account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            I agree to the{" "}
            <a href="terms-and-conditions.html" target="_blank">
              Terms and Conditions
            </a>
          </p>
        </div>
        {current === "Login" ? (
          <p onClick={handleToggle}>
            Don’t have an account? <span>Create an account</span>
          </p>
        ) : (
          <p onClick={handleToggle}>
            Already have an account? <span>Login</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPop;
