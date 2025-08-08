import React, { useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "./utils/userSlice";
import { NETFLIX_LOGO, SUPPORTED_LANGUAGES } from "./utils/constants";
import { toggleGptSearchView } from "./utils/GptSlice";
import { FaHome, FaRocket } from "react-icons/fa";
import { changeLanguage } from "./utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");

        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const user = useSelector((store) => store?.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  const GptSearchHandler = () => {
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  return (
    <div>
      <div className="flex flex-row justify-evenly">
        <div className="absolute bg-gradient-to-b from-black -px-[1000px] md:px-16 pt-2 z-50 w-screen">
          <img
            className="w-[40%] md:w-[14.5%] "
            src={NETFLIX_LOGO}
            alt="Netflix logo"
          />
        </div>

        {user && (
          <div className="flex ">
            {showGptSearch && (
              <select
                className="bg-black p-2  text-white  z-50 absolute ml-[80px] md:ml-[330px] my-[26px]"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.name}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <button
              className="bg-[#e50914e9] rounded-lg px-4 py-2 absolute z-50 text-white text-[18px] -ml-[180px] md:ml-[440px] my-[99px] md:my-[26px] hover:bg-gray-400 hover:bg-opacity-20 "
              onClick={GptSearchHandler}
            >
              {showGptSearch ? (
                <div className="flex w-[95px] ">
                  <span className="ml-3"> Home </span>
                  <div className="pl-2 pt-1 ml-[1px] pr-3">
                    <FaHome />
                  </div>
                </div>
              ) : (
                <div className="flex ">
                  GPT Search{" "}
                  <div className="pl-2 pt-1">
                    <FaRocket />
                  </div>
                </div>
              )}
            </button>
            <img
              className=" h-10 ml-[10px]  md:ml-[603px] z-50 absolute  my-[100px] md:my-7"
              alt="flix logo"
              src={user?.photoURL}
            />

            <div
              className=" h-0 ml-[75px] md:ml-[660px] z-50 absolute  my-[100px] md:my-7 "
              onClick={handleSignOut}
            >
              {" "}
              <FiLogOut
                size={40}
                className="bg-[#E50914] text-white py-1 rounded hover:opacity-60"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
