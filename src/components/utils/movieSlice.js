import { createSlice } from "@reduxjs/toolkit";
const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingmovies: null,
    Popularmovies: null,
    TopRatedmovies: null,
    Upcomingmovies: null,
    trailerVideo: null,
  },
  reducers: {
    addNowPlayingmovies: (state, action) => {
      state.nowPlayingmovies = action.payload;
    },
    addPopularmovies: (state, action) => {
      state.Popularmovies = action.payload;
    },
    addTopRatedmovies: (state, action) => {
      state.TopRatedmovies = action.payload;
    },
    addUpcomingmovies: (state, action) => {
      state.Upcomingmovies = action.payload;
    },
    addMovieTrailer: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});
export const {
  addNowPlayingmovies,
  addMovieTrailer,
  addPopularmovies,
  addTopRatedmovies,
  addUpcomingmovies,
} = movieSlice.actions;
export default movieSlice.reducer;
