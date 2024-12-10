import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import StripeButton from "../components/StripeButton";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/app");
  };

  return (
    <div className="landing-page">
      <div className="content">
      {/* <StripeButton priceId={"price_1QUWOeSDfaeqN3M50IfhOjDA"} /> */}
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
