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
  const searchResults = await axios.get(SEARCH_URL);

  if (!searchResults.Response) return searchResults;

  const totalPages = Math.ceil(searchResults.totalResults / 10);
  const maxRequestPage = totalPages > 5 ? 5 : totalPages;
  for (let i = 2; i <= maxRequestPage; i++) {
    const { Search } = await axios.get(`${SEARCH_URL}&page=${i}`);
    searchResults.Search.concat(Search);
  }

  return searchResults;
};

export const getMovieById = async (id) => {
  if (isInvalidString(id)) throw "id argument must be valid string!";

  const SEARCH_URL = `${API_URL}&i=${id}`;
  const searchResults = await axios.get(SEARCH_URL);

  if (!searchResults.Response) {
    delete searchResults.Error;
    return searchResults;
  }

  return searchResults;
};
