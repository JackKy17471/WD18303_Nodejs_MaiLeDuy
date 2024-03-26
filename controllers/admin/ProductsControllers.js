const Product = require("../../models/Product");

const products = [];

exports.addProduct = (req, res, next) => {
  res.render("admin/product/add");
};

exports.postProduct = (req, res, next) => {
  // upload(req, res, (err) => {
  //   if (err) {
  //     throw err;
  //   }
  const name = req.body.name;
  const short_description = req.body.short_description;
  const images = req.file.filename;
  const price = req.body.price;
  product = {
    name: name,
    short_description: short_description,
    images: images,
    price: price,
  };
  Product.saveProduct(product);
  res.redirect("/admin/list-product");
  // });
};


// exports.getProduct = (req, res, next) => {
//     res.render('admin/products/list-product', {
//         pageTitle: 'Danh Sách Sản Phẩm',
//         path: 'admin/products/list-product',
//         activeAddProduct: true,
//         data: Product.getAll()
//     })
// }

exports.getProduct = (req, res, next) => {
  Product.getAll(function (data) {
    res.render("admin/product/list-product", {
      product: data,
    });
  });
};
