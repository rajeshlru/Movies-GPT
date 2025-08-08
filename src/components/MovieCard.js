import React from "react";
import { CDN_IMG_URL } from "./utils/constants";
import { Link } from "react-router-dom";
const MovieCard = ({ posterpath, id }) => {
  if (!posterpath) return null;
  return (
    <div className="w-[190px] mx-2 my-4 hover:scale-110 duration-500">
      <Link to={"/watch?id=" + id}>
        <img className="" alt="" src={CDN_IMG_URL + posterpath} />
      </Link>
    </div>
  );
};

export default MovieCard;
