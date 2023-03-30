require('dotenv').config();
const { Client } = require('pg');

const client = new Client();
client.connect();

const userData = require('./users-10.json');
const deliveryData = require('./delivery-10.json');

async function importTable(tableName, data) {
  const promises = [];

  for (const obj of data) {
    const values = Object.values(obj);
    const sqlQuery = `INSERT INTO ${tableName} VALUES ( DEFAULT,${values
      .map((_, i) => `$${i + 1}`)
      .join(', ')}) RETURNING *`;
    const promise = client.query(sqlQuery, values);
    promises.push(promise);
  }

  const results = await Promise.all(promises);
  console.log(`Eléments insérés dans ${tableName} : ${results.length}`);
}

(async () => {
  try {
    await client.query('TRUNCATE users,delivery CASCADE');
    await Promise.all([
      importTable('users', userData),
      importTable('delivery', deliveryData),
    ]);
  } catch (error) {
    console.error(error.message);
  } finally {
    await client.end();
    process.exit(0);
  }
})();
