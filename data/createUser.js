const { faker } = require('@faker-js/faker');
const fs = require('fs').promises;

faker.locale = 'fr';

const NB_USERS = 100;
const FILENAME = `users-${NB_USERS}.json`;
// Création des users pour notre BDD
async function createFile() {
  await fs.writeFile(FILENAME, '[');
  for (let userIndex = 0; userIndex < NB_USERS; userIndex += 1) {
    if (userIndex > 0) {
    await fs.appendFile(FILENAME, ',');
}
   
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const address = faker.address.city();
    const zipCode = faker.address.zipCode('#####');
    const birthDate = faker.date.birthdate();
    const phoneNumber = faker.phone.number();
    const carrier = faker.datatype.boolean();
    const identityVerified = faker.datatype.boolean();
    const user = {
      email,
      firstName,
      lastName,
      address,
      zipCode,
      birthDate,
      phoneNumber,
      carrier,
      identityVerified,
    };
    await fs.appendFile(FILENAME, JSON.stringify(user));
}
await fs.appendFile(FILENAME, ']');
console.log(FILENAME + 'file created');
}
createFile();