import { useEffect } from "react";
import { addNowPlayingmovies } from "../components/utils/movieSlice";
import { API_OPTIONS } from "../components/utils/constants";
import { useDispatch, useSelector } from "react-redux";

const useNowPlayingmovies = () => {
  const useNowPlayingmovies = useSelector(
    (store) => store.movie?.nowPlayingmovies
  );
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    //console.log(json?.results);
    dispatch(addNowPlayingmovies(json?.results));
  };
  useEffect(() => {
    !useNowPlayingmovies && getNowPlayingMovies();
  }, []);
};
export default useNowPlayingmovies;
