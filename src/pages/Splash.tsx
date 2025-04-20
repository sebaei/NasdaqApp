import React, { useEffect } from "react";
import SplashScreen from "../components/Splash";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/explore"), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return <SplashScreen />;
};

export default Splash;
