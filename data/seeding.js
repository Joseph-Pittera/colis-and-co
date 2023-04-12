const fs = require('fs');
const path = require('path');
const deliveries = require('./delivery-10.json');
const users = require('./users-10.json');

let transaction = 'BEGIN;';

async function generateSQL() {
  deliveries.forEach((delivery) => {
    transaction += `
      INSERT INTO "delivery"(
      "type_of_marchandise", 
      "quantity",
      "volume",
      "length",
      "width",
      "height",
      "departure_address",
      "arrival_address",
      "departure_date",
      "arrival_date",
      "price"
      )
      VALUES(
        '${delivery.type_of_marchandise}', 
        '${delivery.quantity}',
        '${delivery.volume}',
        '${delivery.length}',
        '${delivery.width}',
        '${delivery.height}',
        '${delivery.departure_address}',
        '${delivery.arrival_address}',
        '${delivery.departure_date}',
        '${delivery.arrival_date}',
        '${delivery.price}'
        );
    `;
  });
  users.forEach((user) => {
    transaction += `
      INSERT INTO "users"(
        "email",
        "password", 
        "first_name", 
        "last_name", 
        "address",
        "zipcode",
        "birth_date",
        "phoneNumber",
        "carrier",
        "identity_verified"
        )
      VALUES
        (
          '${user.email}',
          '${user.password}',
          '${user.firstName}',
          '${user.lastName}',
          '${user.address}',
          '${user.zipCode}',
          '${user.birthDate}',
          '${user.phoneNumber}',
          '${user.carrier}',
          '${user.identityVerified}'          
        );
      `;
  });
  transaction += 'COMMIT;';
  fs.writeFileSync(path.join(__dirname, 'seeding.sql'), transaction);
}

generateSQL();
/* eslint-disable-next-line */
console.log('fichier seeding.sql généré');