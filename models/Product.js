const db = require("./Database.js");
const getALL = require("../controllers/admin/ProductsControllers.js");
module.exports = class Product {
  constructor() {}

//   static getAll() {
//     let sql = `SELECT * FROM products`;
//     db.query(sql, function (err, data) {
//       if (err) throw err;
//       products = data;
//     });
//     return products;
//   }

  static getAll(callback) {
    let sql = `SELECT * FROM products`;
    db.query(sql, function (err, data) {
      if (err) throw err;
      callback(data);
    });
  }

  static saveProduct(product) {
    db.query('insert into products SET ?',product, function(err, data) {
    if (err) throw err;
    return true;
    })
    }
  
};
