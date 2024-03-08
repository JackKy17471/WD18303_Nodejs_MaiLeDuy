const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7000;

app.use(bodyParser.urlencoded({ extended: true }));

// const products = [
//   { id: 1, name: 'Product 1', price: 50, shortDescription: 'Short description 1', detailedDescription: 'Detailed description 1', images: ['https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'] },
//   { id: 2, name: 'Product 2', price: 80, shortDescription: 'Short description 2', detailedDescription: 'Detailed description 2', images: ['https://lh3.googleusercontent.com/bip/ACo7QZ4c-fGHaYuftsEVQ9Ln6mkDfl57MVbXPKb0jpUNeZG4pzWNwIngdk1Ss8G6CDgd3laHuQlSchqd1plzKgR3BDtTZVtndnUAUtb1G7jPIbCxc2igPYOJi5A7o1OWxwFHBXAqPg=w250-h200-p'] },
//   { id: 3, name: 'Product 3', price: 120, shortDescription: 'Short description 3', detailedDescription: 'Detailed description 3', images: ['https://lh3.googleusercontent.com/bip/ACo7QZ6PZ6eriwBjq2__SkLj9rtqQ5gpM3HoeM9Xo0evQ05D-wyrUTbq7Fauy1z92Edb53p14jNgxmWDLRhP1OiyAO9g_WXMAClb-yDELEz2oLLfz9Gnf6SDi3OpHG6pxWBsuKRz=w250-h200-p'] },
// ];

// Thêm một trường comments vào cấu trúc sản phẩm
const products = [
  { 
    id: 1, 
    name: 'Product 1', 
    price: 50, 
    shortDescription: 'Short description 1', 
    detailedDescription: 'Detailed description 1', 
    images: ['https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'], 
    comments: [] // Thêm trường comments
  },
  { 
    id: 1, 
    name: 'Product 2', 
    price: 50, 
    shortDescription: 'Short description 1', 
    detailedDescription: 'Detailed description 1', 
    images: ['https://lh3.googleusercontent.com/bip/ACo7QZ4c-fGHaYuftsEVQ9Ln6mkDfl57MVbXPKb0jpUNeZG4pzWNwIngdk1Ss8G6CDgd3laHuQlSchqd1plzKgR3BDtTZVtndnUAUtb1G7jPIbCxc2igPYOJi5A7o1OWxwFHBXAqPg=w250-h200-p'], 
    comments: [] // Thêm trường comments
  },
  { 
    id: 1, 
    name: 'Product 3', 
    price: 50, 
    shortDescription: 'Short description 1', 
    detailedDescription: 'Detailed description 1', 
    images: ['https://lh3.googleusercontent.com/bip/ACo7QZ6PZ6eriwBjq2__SkLj9rtqQ5gpM3HoeM9Xo0evQ05D-wyrUTbq7Fauy1z92Edb53p14jNgxmWDLRhP1OiyAO9g_WXMAClb-yDELEz2oLLfz9Gnf6SDi3OpHG6pxWBsuKRz=w250-h200-p'], 
    comments: [] // Thêm trường comments
  },
  
];


app.get('/products', (req, res) => {
  let list = '<h2>Product List<ul>';
  products.forEach(product => {
    list += `
    <li><a style="text-decoration:none;color:blue;" href="/product/${product.id}">${product.name}<img src="${product.images} " width="100px"></a></li>`;
  });
  list += '</ul></h2>';
  res.send(list);
});

app.get('/product/:id', (req, res) => {
  let id = req.params.id;
  const product = products.find(p => p.id == id);
  const info = `
  <table class="table">
  <thead>
  <tr>
    <th scope="col">Name</th>
    <th scope="col">Price</th>
    <th scope="col">hort Description</th>
    <th scope="col"> Detailed Description</th>
    <th scope="col"> Images</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"> ${product.name}</th>
      <th scope="row">  ${product.price}</th>
      <td>${product.shortDescription}</td>
      <td>${product.detailedDescription}</td>
      <td><img src="${product.images.join(', ')}" width="100px"></td>
    </tr>
   
  </tbody>

  </table>

  <h3>Comments and Reviews</h3>
  <ul>
    ${product.comments.map(comment => `<li>${comment}</li>`).join('')}
  </ul>

  <form action="/product/${product.id}/comment" method="POST">
    <label for="comment">Add a comment:</label>
    <input type="text" id="comment" name="comment" required>
    <button type="submit">Submit Comment</button>
  </form>
  `;
  res.send(info);
});


app.post('/product/:id/comment', (req, res) => {
  let id = req.params.id;
  const product = products.find(p => p.id == id);

  // Lấy nội dung bình luận từ form
  const newComment = req.body.comment;

  // Thêm bình luận vào mảng comments của sản phẩm
  product.comments.push(newComment);

  // Chuyển hướng quay lại trang chi tiết sản phẩm sau khi thêm bình luận
  res.redirect(`/product/${product.id}`);
});


app.get('/add-product', (req, res) => {
  res.send('<form action="/product" method="POST"> <input type="text" name="name" placeholder="Product name"> <input type="number" name="price" placeholder="Price"><br><input type="text" name="shortDescription" placeholder="Short Description"><textarea name="detailedDescription" placeholder="Detailed Description"></textarea><input type="text" name="images" placeholder="Images (comma-separated)"><button type="submit">Add Product</button></form>');
});

app.post('/product', (req, res) => {
  // Lấy thông tin mới từ body của request
  let newProduct = req.body;

  // Tạo một ID mới cho sản phẩm
  newProduct.id = products.length + 1;

  // Chuyển chuỗi hình ảnh thành mảng các đường link
  newProduct.images = newProduct.images.split(',').map(image => image.trim());

  // Khởi tạo mảng comments trống cho sản phẩm mới
  newProduct.comments = [];

  // Thêm sản phẩm mới vào danh sách sản phẩm
  products.push(newProduct);

  // Chuyển hướng về trang danh sách sản phẩm
  res.redirect('/products');
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
