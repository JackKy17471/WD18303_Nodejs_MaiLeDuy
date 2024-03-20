const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mysql = require("mysql");
const app = express();
const port = 1231;

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "nodejs",
});

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

/*-----bai1-2--- */
app.get("/shop", (req, res) => {
  let sql = `SELECT * FROM products `;
  db.query(sql, function (err, data) {
    if (err) throw err;
    res.render("shop.ejs", { products: data });
  });
});

// Route GET để hiển thị trang thêm sản phẩm
app.get("/addnew", (req, res) => {
  let sql = `SELECT * FROM categories`; // Truy vấn để lấy danh sách các danh mục
  db.query(sql, function (err, categories) {
    if (err) throw err;
    res.render("addnew.ejs", { categories: categories }); // Truyền danh sách các danh mục vào biểu mẫu
  });
});



// Route POST để xử lý yêu cầu thêm sản phẩm mới
app.post('/addnew', upload.single('productImage'), (req, res) => {
  const file = req.file
  let name = req.body.name;
  let price = req.body.price;
  let short_description = req.body.short_description;
  let images = file.filename;
  product = {
    name: name,
    price: price,
    short_description: short_description,
    images: images,
  }
  db.query('insert into products SET ?', product, function (err, data) {
    if (err) throw err;
    res.redirect('/shop');
  })
});



// Route GET để hiển thị chi tiết sản phẩm
app.get("/product/:productId", (req, res) => {
  const productId = req.params.productId;

  let sql = `SELECT * FROM products WHERE id = ?`;
  db.query(sql, [productId], function (err, data) {
    if (err) throw err;

    // Kiểm tra nếu sản phẩm không tồn tại
    if (data.length === 0) {
      return res.status(404).send("Product not found");
    }


    res.render("productDetail.ejs", { product: data[0] });
  });
});


/*-----bai1-2--- */


/*-----trang home--- */
app.get("/", (req, res) => {
  var today = new Date();
  currentDay = today.getDay();
  var day = "";
  switch (currentDay) {
    case 0:
      day = "Chủ Nhật";
      break;
    case 1:
      day = "thứ 2";
      break;
    case 2:
      day = "thứ 3";
      break;
    case 3:
      day = "thứ 4";
      break;
    case 4:
      day = "thứ 5";
      break;
    case 5:
      day = "thứ 6";
      break;
    case 6:
      day = "thứ 7";
      break;
    default:
      console.log("ERROR:${currentDay}");
  }
  res.render("home.ejs", { kindOfDay: day });
});
/*-----trang home--- */



/*-----bai3--- */
//sản phẩm theo loại
app.get("/shop/:cateId", (req, res) => {
  let cateId = req.params.cateId;
  let sql = `SELECT * FROM products where categories_id=${cateId};select * from categories`;
  db.query(sql, function (err, data) {
    if (err) throw err;
    res.render('shop.ejs', { categories: data[1], products: data[0] });
  })
})

/*-----bai3--- */


/*-----bai5--- */

app.post("/product/delete/:productId", (req, res) => {
  const productId = req.params.productId;

  let sql = `DELETE FROM products WHERE id = ?`;
  db.query(sql, [productId], function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
    res.redirect("/shop"); // Chuyển hướng người dùng đến trang shop sau khi xóa sản phẩm
  });
});


app.get("/product-edit", (req, res) => {
  let sql = `SELECT * FROM products `;
  db.query(sql, function (err, data) {
    if (err) throw err;
    res.render("product.ejs", { products: data });
  });
});

app.post("/products/delete/:productId", (req, res) => {
  const productId = req.params.productId;
  let sql = `DELETE FROM products WHERE id = ?`;
  db.query(sql, [productId], function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
    res.redirect("products");
  });
});

app.get("/admin/products/edit/:productId", (req, res) => {
  const productId = req.params.productId;
  let sql = `SELECT * FROM products WHERE id = ?`;
  db.query(sql, [productId], function (err, product) {
    if (err) throw err;
    res.render("admin/editProduct.ejs", { product: product });
  });
});

app.post("/products/edit/:productId", (req, res) => {
  const productId = req.params.productId;
  const { name, price, short_description, images } = req.body;
  let sql = `UPDATE products SET name = ?, price = ?, short_description = ?, images = ? WHERE id = ?`;
  db.query(sql, [name, price, short_description, images, productId], function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
    res.redirect("products");
  });
});


/*-----bai5--- */


app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});
