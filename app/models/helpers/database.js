const debug = require('debug')('colis:databaset');

const { Pool } = require('pg');

const pool = new Pool();

pool.connect().then(() => {
  debug('database client  connected');
});

module.exports = {
  originalClient: pool,
  async query(...params) {
    debug(...params);
    return this.originalClient.query(...params);
  },
};
