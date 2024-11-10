/*
 * Cormac Taylor
 * I pledge my honor that I have abided by the Stevens Honor System.
 */
import { Router } from "express";
const router = Router();
import { searchMoviesByTitle, getMovieById } from "../data/movies.js";
import { isInvalidString } from "../helpers.js";

router.route("/").get(async (_, res) => {
  try {
    res.render("home", { pageTitle: "Movie Search" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.route("/moviesearch").post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchByTitle and then call your data function passing in the searchByTitle and then rendering the search results of up to 50 Movies.
  try {
    if (isInvalidString(req.body.searchByTitle)) {
      res.status(400).json({ error: "search value must be a valid string!" });
      return;
    }
    const searchedMovieTitle = req.body.searchByTitle.trim();

    const searchResults = await searchMoviesByTitle(searchedMovieTitle);
    if (!searchResults || searchResults.Response === "False") {
      res.status(404).json({ error: "Not found!" });
      return;
    }

    res.render("searchResults", {
      pageTitle: "Movies Found",
      searchedMovieTitle,
      movies: searchResults.Search,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.route("/getmovie/:id").get(async (req, res) => {
  //code here for GET a single movie
  return { ok: true };
});

export default router;
