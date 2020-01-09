import axios from 'axios';

const key = 'fce01530a73dfd9572ddc00511173b42';

export const getData = () => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}`;
  return axios.get(url).then(response => response.data.results);
};

export const getDataById = id => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;

  return axios.get(url).then(response => response.data);
};

export const getDataCast = id => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}`;

  return axios.get(url).then(response => response.data.cast);
};

export const getDataReviews = id => {
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${key}`;

  return axios.get(url).then(response => response.data.results);
};

export const getDataQuery = query => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}`;

  return axios.get(url).then(response => response.data.results);
};
