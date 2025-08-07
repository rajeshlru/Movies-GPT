import { useEffect } from "react";
import { addUpcomingmovies } from "../components/utils/movieSlice";
import { API_OPTIONS } from "../components/utils/constants";
import { useDispatch, useSelector } from "react-redux";

const useUpcomingMovies = () => {
  const Upcomingmovies = useSelector((store) => store.movie?.Upcomingmovies);
  const dispatch = useDispatch();
  const getUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    //console.log(json?.results);
    dispatch(addUpcomingmovies(json?.results));
  };
  useEffect(() => {
    !Upcomingmovies && getUpcomingMovies();
  }, []);
};
export default useUpcomingMovies;
