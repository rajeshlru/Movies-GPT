export const BACKGROUND_IMAGE =
  "https://assets.nflxext.com/ffe/siteui/vlv3/9a924b36-8e85-4f2a-baac-ce2872ee8163/web/IN-en-20250714-TRIFECTA-perspective_dfbf09de-9182-41e1-a9c6-cd7b1a6d84d6_large.jpg";

export const NETFLIX_LOGO =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-14/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const AVATAR_URL =
  "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg";

// export const AVATAR_URL =
//   "https://media.licdn.com/dms/image/v2/D4E03AQHaz37F7XaT0Q/profile-displayphoto-shrink_800_800/B4EZXAwiS2HUAc-/0/1742695705662?e=1757548800&v=beta&t=4pu1AI6VsjrV-Mwx4Tv_z53Ckp_Znyjwoh5t-7cwXQM";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_GEMINI_TMDB_API,
  },
};
export const CDN_IMG_URL = "https://image.tmdb.org/t/p/w500/";
export const SUPPORTED_LANGUAGES = [
  {
    identifier: "en",
    name: "English",
  },
  {
    identifier: "hindi",
    name: "Hindi",
  },
  {
    identifier: "telugu",
    name: "Telugu",
  },
];
export const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
