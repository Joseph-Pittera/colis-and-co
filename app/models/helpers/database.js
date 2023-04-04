const debug = require('debug')('colis:database');

const { Pool } = require('pg');

const pool = new Pool();

pool.connect().then(() => {
  console.log('database client  connected');
});

module.exports = {
  originalClient: pool,
  async query(...params) {
    console.log(...params);
    return this.originalClient.query(...params);
  },
};
