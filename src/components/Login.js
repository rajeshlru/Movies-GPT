import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkName, checkValidate } from "./utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./utils/firebase";
import { updateProfile } from "firebase/auth";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { AVATAR_URL, BACKGROUND_IMAGE } from "./utils/constants";

const Login = () => {
  const [signInForm, setSignInForm] = useState(true);
  const [errorMess, setErrorMessage] = useState(null);
  const [signName, setSignName] = useState(null);
  const [passchange, setPassChange] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const user = useSelector((store) => store?.user);
  //console.log(user);    ->equivalent to redux dev tools

  const dispatch = useDispatch();

  const passwordHandler = () => {
    setPassChange(!passchange);
    password.current.focus();
  };
  const handleButonClick = () => {
    //console.log(email.current.value, password.current.value);
    if (!email.current || !password.current || (!signInForm && !name.current)) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const message = checkValidate(email.current.value, password.current.value);
    setErrorMessage(message);

    // setSignName(siginupName);

    if (!signInForm && name.current.value) {
      const siginupName = checkName(name.current.value);
      setSignName(siginupName);
    } else {
      setSignName(null); // Clear previous name error if switching modes
    }

    if (message) return;

    if (!signInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          //console.log(user);

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: AVATAR_URL,
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(message);
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          //const errorMessage = error.message;
          // ..
          //setErrorMessage(errorCode + "--" + errorMessage);
          setErrorMessage(errorCode);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //console.log(user);

          // ...
        })
        .catch((error) => {
          // const errorCode = error.code;
          //const errorMessage = error.message;
          //setErrorMessage(errorCode + "--" + errorMessage);
          const errorCode = " User Not Found";
          setErrorMessage(errorCode);
        });
    }
  };
  const toggleSignInForm = () => {
    setSignInForm(!signInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen object-cover md:h-screen md:w-screen"
          alt="bg-image"
          src={BACKGROUND_IMAGE}
        />
      </div>
      <div className="absolute z-50 top-10 bg-black lg:w-[30%] text-center lg:mx-[36%] bg-opacity-80 px-6 h-auto my-12 pt-6 mx-[20%] w-[290px]">
        <h1 className="text-white font-bold text-[39px] -ml-[50%] mt-10 mb-11">
          {signInForm ? "Sign in" : "Sign up"}
        </h1>
        <form className="W-[500]" onSubmit={(e) => e.preventDefault()}>
          {!signInForm && (
            <div className="my-5 px-10">
              <input
                ref={name}
                className="w-full h-[55px] bg-gray-700 bg-opacity-75 px-5 rounded-lg text-white text-xl"
                type="text"
                placeholder="Name"
              ></input>
              <div className="text-red-500 text-[19px] w-full  flex ml-1">
                {signName}
              </div>
            </div>
          )}
          <div className="my-5 px-10">
            <input
              autoSave="bg"
              ref={email}
              className="w-full h-[55px] bg-gray-700 bg-opacity-75 px-5 rounded-lg text-white text-xl"
              type="text"
              placeholder="Email"
            ></input>
          </div>
          <div className="my-5 px-10 ">
            <div className="flex flex-row ">
              <div className="">
                <input
                  ref={password}
                  className="w-[124%] h-[55px] bg-gray-700 bg-opacity-75 px-5 rounded-lg text-white text-xl"
                  type={passchange ? "text" : "password"}
                  placeholder="Password"
                ></input>{" "}
              </div>

              <div>
                <div
                  onClick={passwordHandler}
                  className="cursor-pointer text-2xl text-white justify-center items-center my-3 mx-2 pt-[2.6px] pl-[10px] hover:scale-110 transition select-none"
                >
                  {/* {passchange ? "👀" : "🙈"} */}
                  {passchange ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
            </div>
          </div>

          <div className="text-red-500 text-[17px] w-[84%] h-auto flex justify-start items-start ml-8 px-4 font-semibold">
            <div>{errorMess}</div>
          </div>
        </form>

        <button
          type="submit"
          className="bg-red-700 px-[30%] text-white font-semibold text-[29px] rounded-lg pb-2 mb-2 my-6 hover:bg-opacity-80 "
          onClick={handleButonClick}
        >
          {signInForm ? "Sign In" : "Sign up"}
        </button>
        <p className=" text-white ml-11 flex  mt-6 mb-4 text-[16px]">
          {" "}
          {signInForm ? "New to Netflix ?" : "Already registered ?"}
          <span
            className="  mx-2 text-[22px] -mt-[8px] hover:border-b-2  hover:border-white-600 text-red-500"
            onClick={toggleSignInForm}
          >
            {signInForm ? " Sign up" : "Sign In"}
          </span>
          now...
        </p>
        <div className="bg-white w-full py-3 my-4 rounded-md">
          <span className="text-red-500 font-bold text-[18px] h-10 ">
            {" "}
            Please Use VPN{" "}
          </span>
          <div className="font-semibold">
            {" "}
            I am using{" "}
            <span className="text-green-600 font-bold">TMDB API</span> which is
            not accesible in India
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
