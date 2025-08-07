// import React from "react";
import MovieList from "./MovieList";
import ShimmerMovieList from "./ShimmerMovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movie);

  const isLoading =
    !movies?.Upcomingmovies ||
    !movies?.nowPlayingmovies ||
    !movies?.TopRatedmovies ||
    !movies?.Popularmovies;

  return (
    <div className="bg-black w-[64%] md:w-[101%]">
      <div className=" -mt-2 md:-mt-60 relative z-50 ">
        {isLoading ? (
          <>
            <ShimmerMovieList title="Now Playing Movies" isFirst={true} />
            <ShimmerMovieList title="Top Rated Movies" />
            <ShimmerMovieList title="Popular Movies" />
            <ShimmerMovieList title="Upcoming Movies" />
          </>
        ) : (
          <>
            <MovieList
              title="Now Playing Movies"
              movies={movies?.nowPlayingmovies}
            />
            <MovieList
              title="Top Rated Movies"
              movies={movies?.TopRatedmovies}
            />
            <MovieList title="Popular Movies" movies={movies?.Popularmovies} />
            <MovieList
              title="Upcoming Movies"
              movies={movies?.Upcomingmovies}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SecondaryContainer;
