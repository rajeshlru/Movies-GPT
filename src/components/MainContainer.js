import React from "react"; //  { useMemo }
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movie?.nowPlayingmovies);
  if (!movies) return;
  const mainMovie = movies[10];
  // const randomIndex = Math.floor(Math.random() * 3); // 0 to 19
  // const mainMovie = movies[randomIndex];
  //console.log(mainMovie);
  if (!mainMovie) return null;
  //console.log(mainMovie);
  //console.log(movies);
  const { original_title, overview, id } = mainMovie;
  return (
    <div className="">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieid={id} />
    </div>
  );
};

export default MainContainer;
