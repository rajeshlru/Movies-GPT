import { useEffect } from "react";
import { addMovieTrailer } from "../components/utils/movieSlice";
import { API_OPTIONS } from "../components/utils/constants";
import { useDispatch, useSelector } from "react-redux";

const useMovieTrailer = (movieid) => {
  const trailerVideo = useSelector((store) => store.movie?.trailerVideo);
  //console.log(trailerVideo);
  const dispatch = useDispatch();

  //const [trailerId, setTrailerId] = useState(null);
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieid +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    //console.log(json);

    const filteredData = json.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filteredData.length ? filteredData[0] : json.results[0];
    //console.log(trailer);
    //setTrailerId(trailer.key);
    dispatch(addMovieTrailer(trailer));
  };
  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, []);
};
export default useMovieTrailer;
