import { createSlice } from "@reduxjs/toolkit";

const GptSlice = createSlice({
  name: "GPT",
  initialState: {
    showGptSearch: false,
    movieNames: null,
    movieResults: null,
    isLoading: false,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    setGptLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const { toggleGptSearchView, addGptMovieResult, setGptLoading } =
  GptSlice.actions;
export default GptSlice.reducer;
