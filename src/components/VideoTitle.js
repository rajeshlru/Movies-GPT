import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="  flex flex-col pt-[30pc] md:pt-56  w-[60%] md:w-[99%] px-2 md:px-10 absolute aspect-video bg-gradient-to-r from-black ">
      <div className="font-bold text-[30px] md:text-[60px] text-white w-0 md:w-[1000px]">
        {title}
      </div>
      <div className="w-full md:w-[600px] text-white opacity-85 ">
        {overview}
      </div>
      <div className="my-10 flex flex-row md:flex-row">
        <button className="px-12 py-3 mx-2 text-black text-[20px] bg-white rounded-lg hover:bg-opacity-75">
          ▶ Play
        </button>
        <button className="px-4 py-3 mx-3 text-white  text-[20px] bg-gray-400 bg-opacity-30  rounded-lg ">
          🛈 More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
