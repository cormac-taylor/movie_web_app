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
  try {
    if (isInvalidString(req.body.searchByTitle)) {
      res.render("error", {
        pageTitle: "Error",
        errorMessage: "You must enter a search term!",
      });
      res.status(400);
      return;
    }
    const searchByTitle = req.body.searchByTitle.trim();

    const searchResults = await searchMoviesByTitle(searchByTitle);

    res.render("searchResults", {
      noErrors: searchResults.Response === "True",
      pageTitle: "Movies Found",
      searchByTitle,
      movies: searchResults.Search,
    });
    if (searchResults.Response === "False") {
      res.status(404);
      return;
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.route("/getmovie/:id").get(async (req, res) => {
  try {
    if (isInvalidString(req.params.id)) {
      res.render("error", {
        pageTitle: "Error",
        errorMessage: "You must enter a valid ID!",
      });
      res.status(400);
      return;
    }
    const movieID = req.params.id.trim();

    const searchResults = await getMovieById(movieID);

    if (searchResults.Response === "False") {
      res.render("error", {
        pageTitle: "Error",
        errorMessage: "No movie found with that id!",
      });
      res.status(404);
      return;
    } else {
      res.render("getmovie", {
        noErrors: searchResults.Response === "True",
        pageTitle: searchResults.Title,
        data: searchResults,
      });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
