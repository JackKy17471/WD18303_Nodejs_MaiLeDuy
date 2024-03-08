

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3300

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/product', (req, res) => {
  res.send(`<p>đây là trang Product</p>`)
})
app.get('/add-product', (req, res) => {
  res.send(`<p> trang add Product</p>
  <form action="/added-product" method="POST"><input type="text" name="productName" ><button type="submit">add product</button></form>`)
})

app.post('/added-product', (req, res) => {
  const productName = req.body.productName
  res.send(`đã thêm product thành công: ${productName}`)
})

// app.post('/added-product',(req, res) => {
// console.log(req.body.productName);
// productList.unshift(req.body.productName),
// res.send(req.body);
// });

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})




