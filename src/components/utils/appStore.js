import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import gptReducer from "./GptSlice";
import configReducer from "./configSlice";
// in these reducer we can import anything like
// import pizza from "./movieSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
    // movie: pizza,
    gpt: gptReducer,
    config: configReducer,
  },
});

export default appStore;
