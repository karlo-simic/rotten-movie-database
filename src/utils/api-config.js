// https://developers.themoviedb.org/3

export const API = "https://api.themoviedb.org/3/";
export const API_KEY = process.env.REACT_APP_API_KEY;

/* 
All image sizes available at:
https://developers.themoviedb.org/3/configuration/get-api-configuration
*/
const IMAGES_API = "https://image.tmdb.org/t/p/";

export const BACKDROP_ORIGINAL = `${IMAGES_API}original/`;
export const BACKDROP_BIG = `${IMAGES_API}w1280/`;
export const BACKDROP_MEDIUM = `${IMAGES_API}w780/`;

export const POSTER_BIG = `${IMAGES_API}w500/`;
export const POSTER_MEDIUM = `${IMAGES_API}w342/`;
export const POSTER_SMALL = `${IMAGES_API}w92/`;

export const LOGO = `${IMAGES_API}w92/`;

export const PROFILE_SMALL = `${IMAGES_API}w45/`;
export const PROFILE_MEDIUM = `${IMAGES_API}w185/`;
