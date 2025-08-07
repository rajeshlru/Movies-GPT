import React from "react";
import ShimmerMovieCard from "./ShimmerMovieCard";

const ShimmerMovieList = ({ title, isFirst = false }) => {
  return (
    <div className={isFirst ? "pt-[25%]" : ""}>
      <div>
        <h1 className="text-3xl text-white px-9 pt-16 pb-2">{title}</h1>
      </div>
      <div>
        <div className="flex overflow-x-scroll hide-scrollbar ml-8 mr-8">
          <div className="flex">
            {Array(10)
              .fill("")
              .map((_, i) => (
                <ShimmerMovieCard key={i} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerMovieList;
