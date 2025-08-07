import React from "react";
import "./ShimmerStyles.css";

const ShimmerMovieCard = () => {
  return (
    <div className="w-[190px] h-[280px] mx-2 my-4 bg-[#2b2b2b] rounded-lg overflow-hidden relative shimmer-card ">
      <div className="shimmer-effect"></div>
    </div>
  );
};

export default ShimmerMovieCard;
