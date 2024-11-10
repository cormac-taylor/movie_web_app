/*
 * Cormac Taylor
 * I pledge my honor that I have abided by the Stevens Honor System.
 */
import movieRoutes from './movies.js';

const constructorMethod = (app) => {
  app.use('', movieRoutes);

  app.use('*', (_, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;