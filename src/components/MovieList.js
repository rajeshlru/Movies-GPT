import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="">
      <h1 className="text-3xl text-white px-0 md:px-9 pt-16 pb-2">{title}</h1>
      <div className="flex overflow-x-scroll hide-scrollbar ml-8 mr-8 ">
        {movies && (
          <div className="flex">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                posterpath={movie.poster_path}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
