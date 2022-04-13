import avatar from "assets/avatar.svg";

export const formatDate = (date) => {
  if (!date) return;

  const newDate = new Date(date);
  const options = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(newDate);
};

export const formatCurrency = (num) => {
  if (!num) return;
  const options = {
    style: "currency",
    currency: "usd",
  };
  return new Intl.NumberFormat("en-US", options).format(num);
};

export const getYear = (date) => {
  if (!date) return null;
  return new Date(date).getFullYear();
};

/* 
Parses movie or tv certificate from data which is arrived from API

'flickType' - required because movie and tv have different data
*/
export const parseCertificate = (data, flickType = "movie") => {
  const us = data.results.find((r) => /us/gi.test(r.iso_3166_1)); // US certificate

  if (flickType === "tv") {
    if (!us) return null;
    return us.rating;
  }

  if (flickType === "movie") {
    if (!us || us.release_dates.length === 0) return null;
    return us.release_dates.find((e) => e.certification)?.certification;
  }
};

/* 
Finds a YouTube trailer from 'videos' data from the API
*/
export const parseTrailer = (videos) => {
  const trailer = videos.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return trailer || null;
};

/* 
Fixes paths received from the API, it can return either no path,
path to external website, or path on TMDb API

'apiUrl' - TMDb image route url
'avatarPath' - path received from API
*/
export const getAvatarUrl = (apiUrl, avatarPath) => {
  if (!avatarPath) return avatar;

  if (/^\/https/.test(avatarPath)) return avatarPath.slice(1);

  return `${apiUrl}${avatarPath}`;
};

/* 
Joins an array into a string, if the array is made out of
objects, pass in the second argument 'property' to tell
the function which property on the objects you want to use
*/
export const formatArrToStr = (arr, property = null) => {
  if (!arr || arr?.length === 0) return;
  if (property) return arr.map((g) => g[property]).join(", ");
  if (!property) return arr.join(", ");
};

/* 
Takes a number of minutes (e.g. 121) and turns it into a string
like '2:01h'
*/
export const formatRuntime = (value) => {
  if (!value || typeof value !== "number") return null;

  const lengthHours = Math.floor(value / 60);
  const lengthMinutes = String(value % 60).padStart(2, 0);

  const hoursStr = lengthHours ? `${lengthHours}:` : "";

  const minutesStr = `${lengthMinutes}${hoursStr ? "h" : "min"}`;

  return hoursStr + minutesStr;
};

/* 
Adjusts 'mediaType' properties when they need to be rendered to the DOM
*/
export const adjustMediaType = (type) => {
  if (!type || type === "multi") return "all"; // multi ==> all
  if (type === "movie") return "movies"; // movie ==> movies
  return type; // tv ==> tv
};

export const resetScroll = () => {
  window.scrollTo(0, 0);
};
