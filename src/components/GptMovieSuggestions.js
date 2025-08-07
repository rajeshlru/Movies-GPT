import React from "react";
import { useSelector } from "react-redux";
import ShimmerMovieList from "./ShimmerMovieList";
import MovieList from "./MovieList";
const GptMovieSuggestions = () => {
  const { movieNames, movieResults, isLoading } = useSelector(
    (store) => store.gpt
  );
  if (isLoading) {
    return (
      <div className="bg-black">
        <ShimmerMovieList title={"Loading Suggestions..."} />
        <ShimmerMovieList title={"Loading Suggestions..."} />
        <ShimmerMovieList title={"Loading Suggestions..."} />
        <ShimmerMovieList title={"Loading Suggestions..."} />
        <ShimmerMovieList title={"Loading Suggestions..."} />
      </div>
    );
  }
  if (!movieNames) {
    return (
      <div
        className="h-screen md:h-[65vh] w-[101%] flex flex-col justify-center items-center 
        
      bg-cover bg-center bg-no-repeat text-white relative overflow-hidden animate-fadeIn"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/movie-background-collage_23-2149876023.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

        <div className="absolute inset-0 z-0 overflow-hidden">
          {[...Array(30)].map((_, i) => {
            const size = `${10 + Math.random() * 6}px`;
            const duration = `${2 + Math.random() * 5}s`;
            const delay = `${Math.random() * 3}s`;

            return (
              <div
                key={i}
                className="absolute rounded-full bg-white opacity-20 animate-float"
                style={{
                  width: size,
                  height: size,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: duration,
                  animationDelay: delay,
                }}
              ></div>
            );
          })}
        </div>

        <div className="relative z-10 text-center px-4 -mt-60 md:mt-0">
          <h1 className="text-[22px] md:text-5xl font-extrabold drop-shadow-lg animate-fadeInUp">
            🎥 Let’s Find Movies You’ll Love
          </h1>
          <p className="text-xl text-gray-300 mt-4 max-w-xl mx-auto animate-fadeInUp delay-200">
            Use the search bar above to get AI-powered recommendations based on
            your taste.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-black w-[101%]">
        {movieNames.map((movieNames, index) => (
          <MovieList
            key={movieNames}
            title={movieNames}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
