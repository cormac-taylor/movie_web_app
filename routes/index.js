/*
 * Cormac Taylor
 * I pledge my honor that I have abided by the Stevens Honor System.
 */
import movieRoutes from './movies.js';

const constructorMethod = (app) => {
  app.use('', movieRoutes);

  app.use('*', (_, res) => {
    res.render("error", {
      pageTitle: "Error",
      errorMessage: "Route Not found!",
    });
    res.status(404);
    return;
  });
};

export default constructorMethod;