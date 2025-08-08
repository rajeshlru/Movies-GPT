import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API_OPTIONS } from "./utils/constants";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("id");

  const [trailerKey, setTrailerKey] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  const movies = useSelector((store) => store.movie);
  useEffect(() => {
    getMovieTrailer();
    getMovieDetails();
    getSimilarMovies();
  }, [movieId]);
  const getMovieTrailer = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "/videos",
      API_OPTIONS
    );
    const data = await res.json();
    const trailer =
      data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      ) || data.results.find((vid) => vid.site === "YouTube");

    if (trailer) setTrailerKey(trailer.key);
    else setTrailerKey(null);
  };

  const getMovieDetails = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId,
      API_OPTIONS
    );
    const data = await res.json();
    setMovieDetails(data);
  };

  const getSimilarMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "/similar",
      API_OPTIONS
    );
    const data = await res.json();
    setSimilarMovies(data.results);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-[80%] h-[90vh] overflow-hidden">
          {trailerKey && (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={
                "https://www.youtube.com/embed/" +
                trailerKey +
                "?autoplay=1&mute=0&controls=1&rel=0&showinfo=0&modestbranding=1"
              }
              title="YouTube trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          )}
        </div>

        <div className="w-full md:w-[30%]  bg-black px-5 py-48 md:py-12  flex flex-col gap-4">
          {movieDetails && (
            <>
              <Link to="/Browse" className=" -mt-40 md:mt-0 ml-60">
                <button className="relative px-6 py-3 rounded-full bg-white bg-opacity-10 backdrop-blur-md text-white font-semibold shadow-lg border border-white border-opacity-20 hover:bg-opacity-30 hover:scale-105 transition-all duration-300 ease-in-out group overflow-hidden whitespace-nowrap">
                  <span className="relative z-10">Go to Browse</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-sm"></span>
                </button>
              </Link>
              <h2 className=" text-2xl md:text-3xl font-bold">
                {movieDetails.title}
              </h2>
              <p className="text-green-400 text-lg font-semibold">
                ⭐ {movieDetails.vote_average.toFixed(1)} Rating
              </p>
              <p className="text-gray-400 text-sm">
                📅 {movieDetails.release_date}
              </p>

              <div className="flex gap-2 my-2 flex-wrap">
                <span className="bg-gray-700 px-2 py-1 rounded-full text-sm">
                  {movieDetails.status || "Unknown"}
                </span>
                {movieDetails.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="bg-blue-700 px-2 py-1 rounded-full text-sm"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              <img
                src={
                  "https://image.tmdb.org/t/p/w500" + movieDetails.poster_path
                }
                alt={movieDetails.title}
                className="w-[56%] md:w-2/3 h-[30%] rounded-md"
              />

              <p className="text-sm text-gray-300 mt-4">
                {movieDetails.overview}
              </p>

              <div className="flex gap-3 mt-4">
                <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300">
                  ▶️ Play
                </button>
                <button className="bg-gray-800 px-3 py-2 rounded hover:bg-gray-700">
                  ➕
                </button>
                <button className="bg-gray-800 px-3 py-2 rounded hover:bg-gray-700">
                  🔗
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {similarMovies.length > 0 && (
        <div className="px-6 -mt-40">
          <h2 className="text-2xl font-semibold mb-4 ">More Like This</h2>

          <div className="overflow-x-scroll hide-scrollbar">
            <div className="flex gap-4">
              {similarMovies.map((movie) => (
                <Link
                  key={movie.id}
                  to={"/watch?id=" + movie.id}
                  className="inline-block w-40 flex-shrink-0"
                >
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt={movie.title}
                    className="rounded-lg hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchPage;
