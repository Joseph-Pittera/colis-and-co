/* Connexion a la BDD */

const debug = require('debug')('colis:database');
// Importe la classe Pool du module 'pg'
const { Pool } = require('pg');

// Crée une nouvelle instance de la classe 'Pool'
const pool = new Pool();

// Connection à la base de donnée et affichage d'un message
pool.connect().then(() => {
  debug('database client connected');
  console.log('Database connected');
});

module.exports = {
  originalClient: pool,
  async query(...params) { // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/rest_parameters
    debug(...params); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    return this.originalClient.query(...params);
  },
};
