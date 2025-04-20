import React from "react";
import NasdaqLogo from "../assets/Nasdaq.webp";
import "../styles/Splash.scss";

const SplashScreen = () => (
  <div className="splash-container">
    <img src={NasdaqLogo} alt="Nasdaq" />
    <span className="splash-text">Developed by</span>
    <span className="name">Youssef El Sebaei</span>
  </div>
);

export default SplashScreen;
