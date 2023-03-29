const { faker } = require('@faker-js/faker');
const fs = require('fs').promises;

faker.locale = 'fr';

const NB_DELIVERY = 100;

const FILENAME = `delivery-${NB_DELIVERY}.json`;

async function createFile() {
  await fs.writeFile(FILENAME, '[');
  for (let deliveryIndex = 0; deliveryIndex < NB_DELIVERY; deliveryIndex += 1) {
    if (deliveryIndex > 0) {
      await fs.appendFile(FILENAME, ',');
    }
    const type_of_marchandise = faker.commerce.product();
    const quantity = faker.datatype.number({ min: 1, max: 10 });
    const volume = faker.datatype.number({ min: 1, max: 20 });
    const length = faker.datatype.number({ min: 1, max: 100 });
    const width = faker.datatype.number({ min: 1, max: 100 });
    const height = faker.datatype.number({ min: 1, max: 100 });
    const street_address = faker.address.streetAddress(true);
    const zipCode = faker.address.zipCode('#####');
    const city = faker.address.city();
    const fullAddress = `${street_address} ${zipCode} ${city}`;
    const departure_address = fullAddress.toString();
    const final_address = faker.address.streetAddress(true);
    const zipCodeFinal = faker.address.zipCode('#####');
    const cityFinal = faker.address.city();
    const finalAddress = `${final_address} ${zipCodeFinal} ${cityFinal}`;
    const arrival_address = finalAddress.toString();
    const departure_date = faker.date.between('2023-03-29T00:00:00.000Z', '2023-03-30T00:00:00.000Z');
    const arrival_date = faker.date.between('2023-04-01T00:00:00.000Z', '2023-04-02T00:00:00.000Z');
    const price = faker.commerce.price();
    const delivery = {
      type_of_marchandise, quantity, volume, length, width, height, departure_address, arrival_address, departure_date, arrival_date, price,
    };
    await fs.appendFile(FILENAME, JSON.stringify(delivery));
  }
  await fs.appendFile(FILENAME, ']');
  console.log(`${FILENAME}file created`);
}
createFile();
