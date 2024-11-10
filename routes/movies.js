/*
 * Cormac Taylor
 * I pledge my honor that I have abided by the Stevens Honor System.
 */
import { Router } from "express";
const router = Router();
import { searchMoviesByTitle, getMovieById } from "../data/movies.js";

router.route("/").get(async (req, res) => {
  //code here for GET will render the home handlebars file
});

router.route("/moviesearch").post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchByTitle and then call your data function passing in the searchByTitle and then rendering the search results of up to 50 Movies.
});

router.route("/getmovie/:id").get(async (req, res) => {
  //code here for GET a single movie
});

//export router
