/*
 * Cormac Taylor
 * I pledge my honor that I have abided by the Stevens Honor System.
 */
import moviesRoutes from './movies.js';

const constructorMethod = (app) => {
  app.use('', moviesRoutes);

  app.use('*', (_, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;