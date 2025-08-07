import { useEffect } from "react";
import { addTopRatedmovies } from "../components/utils/movieSlice";
import { API_OPTIONS } from "../components/utils/constants";
import { useDispatch, useSelector } from "react-redux";

const useTopRatedMovies = () => {
  const TopRatedmovies = useSelector((store) => store.movie?.TopRatedmovies);
  const dispatch = useDispatch();
  const getTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    //console.log(json?.results);
    dispatch(addTopRatedmovies(json?.results));
  };
  useEffect(() => {
    !TopRatedmovies && getTopRatedMovies();
  }, []);
};
export default useTopRatedMovies;
