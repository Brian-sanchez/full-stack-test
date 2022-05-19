import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts, getProductCategories } from "../actions/actions";

import video from "./assets/video/landing-video.mp4";

import "./styles/LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getProductCategories());
  }, [dispatch]);

  return (
    <div className="landing">
      <div className="button">
        <Link to="/home" className="title">
          <h1>Welcome!!</h1>
        </Link>
      </div>

      <video className="background" muted autoPlay loop src={video} />
    </div>
  );
};

export default LandingPage;