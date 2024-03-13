const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const port = 3300;

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
app.set("views", "./views");
app.use(express.static("public"));

const upload = multer({ dest: './public/images/' })

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

app.get("/shop", (req, res) => {
  res.render("shop.ejs", { products: listProduct });
});

app.get("/addnew", (req, res) => {
  res.render("addnew.ejs");
});

app.post('/addnew', upload.single('imageURL'),(req, res) => {
  //lấy dữ liệu từ form sau khi upload anh
  const file = req.file
  let title=req.body.title;
  let price=req.body.price;
  let description=req.body.description;
  let nameImage=file.fieldname ;
  //Thêm vào mảng json 1 cuối sách mới
  listProduct.push({
  id:1,
  title:title,
  price:price,
  description:description,
  imageURL :nameImage,
  })
  //chuyển về trang sản phẩm
  res.redirect('/shop');
  });


  app.get('/product/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const selectedProduct = listProduct.find(product => product.id === productId);
  
    if (selectedProduct) {
      res.render('productDetail.ejs', { product: selectedProduct });
    } else {
      // Handle product not found
      res.status(404).send('Product not found');
    }
  });
  
  
app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});
