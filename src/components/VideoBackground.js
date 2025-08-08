import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieid }) => {
  const trailerVideo = useSelector((store) => store?.movie?.trailerVideo);
  //console.log(trailerVideo);
  useMovieTrailer(movieid);
  return (
    <div className="">
      <iframe
        className=" object-cover  aspect-video md:w-[101%] "
        src={"https://www.youtube.com/embed/nZTgJy8ym34?&autoplay=1&mute=1"}
        title="YouTube video player"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
