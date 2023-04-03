const debug = require('debug')('colis:dataMapper');
const CoreDataMapper = require('./CoreDataMapper');
const client = require('./helpers/database');

 class DeliveryDataMapper extends CoreDataMapper {
  static tableName = 'delivery';

  constructor() {
    super();
    debug('delivery data mapper created');
  }
  async createDelivery(delivery) {
    console.log("--------------------------Iam in deliveydatamapperr");
    //const Delivery = req.body;
    try {
      const { rows } = await client.query(`
        INSERT INTO "delivery" (
          type_of_marchandise,
          quantity,
          volume,
          length,
          width,
          height,
          departure_address,
          arrival_address,
          departure_date,
          arrival_date,
          price
          
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
        ) RETURNING *
      `,
      [
        delivery.type_of_marchandise,
        delivery.quantity,
        delivery.volume,
        delivery.length,
        delivery.width,
        delivery.height,
        delivery.departure_address,
        delivery.arrival_address,
        delivery.departure_date,
        delivery.arrival_date,
        delivery.price,
      ]);
      return rows[0];
    } catch (err) {
      console.error(err);
      throw new InternalServerError(err);
    }
  }
//   async createDelivery(delivery) {
//     debug(`${this.constructor.name} createDelivery(${delivery})`);
//     const preparedQuery = {
//       text: `INSERT INTO "${this.constructor.tableName}"
//         (type_of_marchandise, quantity, volume, length, width, height, departure_address, arrival_address, departure_date, arrival_date, price, creator_id, created_at)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
//         RETURNING "id", "created_at"`,
//       values: [
//         delivery.type_of_marchandise,
//         delivery.quantity,
//         delivery.volume,
//         delivery.length,
//         delivery.width,
//         delivery.height,
//         delivery.departure_address,
//         delivery.arrival_address,
//         delivery.departure_date,
//         delivery.arrival_date,
//         delivery.price,
//         delivery.creator_id,
//       ],
//     };
//     const result = await client.query(preparedQuery);
//     return result.rows[0];
//   }

  // async findDeliveryById(id) {
  //   debug(`${this.constructor.name} findDeliveryById(${id})`);
  //   const preparedQuery = {
  //     text: `SELECT * FROM "${this.constructor.tableName}" WHERE id=$1`,
  //     values: [id],
  //   };
  //   const result = await client.query(preparedQuery);
  //   return result.rows[0];
  // }

//   async updateDelivery(delivery) {
//     debug(`${this.constructor.name} updateDelivery(${delivery})`);
//     const preparedQuery = {
//       text: `UPDATE "${this.constructor.tableName}" SET
//         type_of_marchandise=$1,
//         quantity=$2,
//         volume=$3,
//         length=$4,
//         width=$5,
//         height=$6,
//         departure_address=$7,
//         arrival_address=$8,
//         departure_date=$9,
//         arrival_date=$10,
//         price=$11,
//         carrier_id=$12,
//         updated_at=NOW()
//         WHERE id=$13
//         RETURNING "updated_at"`,
//       values: [
//         delivery.type_of_marchandise,
//         delivery.quantity,
//         delivery.volume,
//         delivery.length,
//         delivery.width,
//         delivery.height,
//         delivery.departure_address,
//         delivery.arrival_address,
//         delivery.departure_date,
//         delivery.arrival_date,
//         delivery.price,
//         delivery.carrier_id,
//         delivery.id,
//       ],
//     };
//     const result = await client.query(preparedQuery);
//     return result.rows[0];
//   }

//   async deleteDeliveryById(id) {
//     debug(`${this.constructor.name} deleteDeliveryById(${id})`);
//     const preparedQuery = {
//       text: `DELETE FROM "${this.constructor.tableName}" WHERE id=$1 RETURNING "id"`,
//       values: [id],
//     };
//     const result = await client.query(preparedQuery);
//     return result.rows[0];
//   }
 }

module.exports = new DeliveryDataMapper();

