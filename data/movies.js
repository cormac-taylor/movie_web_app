/*
 * Cormac Taylor
 * I pledge my honor that I have abided by the Stevens Honor System.
 */
import axios from "axios";
import { isInvalidString } from "../helpers.js";

const API_URL = "http://www.omdbapi.com/?apikey=CS546";

export const searchMoviesByTitle = async (title) => {
  if (isInvalidString(title)) throw "title argument must be valid string!";

  const SEARCH_URL = `${API_URL}&s=${title}`;
  const { data: searchResults } = await axios.get(SEARCH_URL);

  if (searchResults.Response === "False") return searchResults;

  const totalPages = Math.ceil(parseInt(searchResults.totalResults) / 10);
  const maxRequestPage = totalPages > 5 ? 5 : totalPages;
  for (let i = 2; i <= maxRequestPage; i++) {
    const { data } = await axios.get(`${SEARCH_URL}&page=${i}`);
    searchResults.Search = searchResults.Search.concat(data.Search);
  }

  return searchResults;
};

export const getMovieById = async (id) => {
  if (isInvalidString(id)) throw "id argument must be valid string!";

  const SEARCH_URL = `${API_URL}&i=${id}`;
  const { data: searchResults } = await axios.get(SEARCH_URL);

  return searchResults;
};
