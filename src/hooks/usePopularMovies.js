import { useEffect } from "react";
import { addPopularmovies } from "../components/utils/movieSlice";
import { API_OPTIONS } from "../components/utils/constants";
import { useDispatch, useSelector } from "react-redux";

const usePopularMovies = () => {
  const usePopularMovies = useSelector((store) => store.movie.Popularmovies);
  const dispatch = useDispatch();
  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    //console.log(json?.results);
    dispatch(addPopularmovies(json?.results));
  };
  useEffect(() => {
    !usePopularMovies && getPopularMovies();
  }, []);
};
export default usePopularMovies;
