import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/app");
  };

  return (
    <div className="landing-page">
      <div className="content">
        <h1 className="title">Timeless Treasures</h1>
        <h2 className="subtitle">Relive the Glory, One Bid at a Time</h2>
        <button className="navigate-btn" onClick={handleNavigate}>
          Explore Now
        </button>
      </div>
      <div className="background"></div>
    </div>
  );
};

export default LandingPage;
