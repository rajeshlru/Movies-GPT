import React, { useRef, useState } from "react";
import lang from "./utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import geminiClient from "./utils/geminiClient";
import { API_OPTIONS } from "./utils/constants";
import { addGptMovieResult, setGptLoading } from "./utils/GptSlice";
const GptSearchbar = () => {
  const langKey = useSelector((store) => store.config.lang) || "en";
  const currentLang = lang[langKey] || lang["en"];
  //console.log(currentLang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const searchMoviesTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    dispatch(setGptLoading(true));
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query without any headings,straight anwers." +
      searchText.current.value +
      "Dont give me any kind of headings,I just want only 10 Movies separated by commas. Example: Gadar, Jawan, Bahubali, RRR, Animal, Coolie, OG, RowdyBoys, SitaRamam, Pushpa.";

    try {
      const model = geminiClient.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      const result = await model.generateContent(gptQuery);
      const response = await result.response.text();
      const gptResults = response.split(",");
      //console.log(gptResults);
      const promiseArray = gptResults.map((movie) => searchMoviesTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
      //console.log(tmdbResults);
      const validResults = tmdbResults.filter(
        (movieArray) => movieArray.length > 0 && movieArray[0].poster_path
      );

      dispatch(
        addGptMovieResult({
          movieNames: gptResults,
          movieResults: tmdbResults,
        })
      );
    } catch (err) {
      console.error(
        "Gemini error:This is gemini error api is not working here!!!!!!]\n",
        err
      );
    } finally {
      dispatch(setGptLoading(false));
    }
  };
  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const fetchSuggestions = async (text) => {
    if (!text) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(text),
      API_OPTIONS
    );
    const data = await res.json();
    setSuggestions(data.results?.slice(0, 5) || []);
  };

  const handleInputChange = (e) => {
    const text = e.target.value;

    if (debounceTimer) clearTimeout(debounceTimer);

    const newTimer = setTimeout(() => {
      fetchSuggestions(text);
    }, 400); // Debounce by 400ms

    setDebounceTimer(newTimer);
  };

  const handleSuggestionClick = (movie) => {
    searchText.current.value = movie.title;
    setSuggestions([]);
    setShowSuggestions(false);

    handleGptSearchClick();
  };

  const [showSuggestions, setShowSuggestions] = useState(false);
  return (
    <div>
      <div className="bg-black w-[101%] h-80  flex justify-center  pt-36">
        <form className="absolute z-50" onSubmit={(e) => e.preventDefault()}>
          <div className="text-center">
            {" "}
            <h1 className="text-white text-4xl font-bold my-7 ">
              {currentLang.find}
            </h1>
          </div>
          <input
            ref={searchText}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            onChange={handleInputChange}
            className="py-5 ml-2 md:ml-0 px-6 w-2/3 md:w-[500px]  text-gray-900 text-xl"
            type="text"
            placeholder={currentLang.GptSearchplaceHolder}
          ></input>
          <button
            className="py-5 px-6 text-[19.4px] font-sans text-white bg-[#FF000C] hover:bg-opacity-80"
            onClick={handleGptSearchClick}
          >
            {currentLang.search}
          </button>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-50 bg-white w-full mt-1 rounded shadow text-black">
              {suggestions.map((movie, i) => (
                <li
                  key={i}
                  onMouseDown={() => handleSuggestionClick(movie)}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {movie.title}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </div>
  );
};

export default GptSearchbar;
