const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const port = 7300;

app.use(bodyParser.urlencoded({ extended: true }));



var listProduct = [
  {
    id: 1,
    title: "Apple Book",
    price: 3000,
    description:
      "A very interesting book about so many even more interesting things!",
    imageURL: "hinh1.png",
  },
  {
    id: 2,
    title: "Microsoft Book",
    price: 2000,
    description:
      "A very interesting book about so many even more interesting things!",
    imageURL: "unnamed.jpg",
  },
  {
    id: 3,
    title: "VFast Book",
    price: 1000,
    description:
      "A very interesting book about so many even more interesting things!",
    imageURL: "hinh1.png",
  },
];

app.set("view engine", "ejs");
app.set("views", "./Admin/public/views");
app.use(express.static("./Admin/public/"));




app.get("/", (req, res) => {

  res.render("user/user-index.ejs");
});


app.get("/detail-product", (req, res) => {

  res.render("user/detail-product.ejs");
});

app.get("/cart", (req, res) => {

  res.render("user/cart.ejs");
});
app.get("/shop", (req, res) => {

  res.render("user/shop.ejs");
})
app.get("/checkout", (req, res) => {

  res.render("user/checkout.ejs");
})
app.get("/contact", (req, res) => {

  res.render("user/contact.ejs");
})


// admin routes




app.get("/admin-product", (req, res) => {

  res.render("admin/admin-product.ejs");
});

app.get("/admin-categories", (req, res) => {

  res.render("admin/categories.ejs");
});
app.get("/admin-user", (req, res) => {

  res.render("admin/user.ejs");
});











 
  
  
app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});
