const API_URL = 'http://localhost:3000/';


let HTML = document.getElementById('tab-1');
function detail_product(id) {
    localStorage.setItem('id_sp', id)
    console.log(localStorage.getItem('id_sp'));
    window.location = 'shop-detail.html'
}

function list(id){
    fetch(API_URL + 'products')
    .then(function (response) {
      response.json().then(function (data) {
        let product = '';
        data.forEach(data => {
          if (data.category == id) {
            product +=`<div class="row g-4">
            
            <div class="col-md-6 col-lg-4 col-xl-3" onclick="detail_product(${data.id})">
            
                <div class="rounded position-relative fruite-item">
                    <div class="fruite-img">
                        <img src="./img/${data.image}" class="img-fluid w-100 rounded-top" alt="">
                    </div>
                    <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>${data.name}</h4>
                        <div class="d-flex justify-content-between flex-lg-wrap">
                            <p class="text-dark fs-5 fw-bold mb-0">${data.price}đ</p>
                            <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            `
}
})
HTML.innerHTML = product;
})
})
}
// fetch(API_URL + 'products')
//     .then(function (response) {
//         response.json().then(function (data) {
//             console.log(data);
//             let array = data;

//             let html = document.getElementById('tab-1');
            
//             let child_html = ` <div class="row g-4">
//             `

//             array.forEach(element => {
//                 console.log(element);
//                 child_html += `<div class="col-md-6 col-lg-4 col-xl-3">
//                 <div class="rounded position-relative fruite-item">
//                     <div class="fruite-img">
//                         <img src="./img/${element.image}" class="img-fluid w-100 rounded-top" alt="">
//                     </div>
//                     <div class="p-4 border border-secondary border-top-0 rounded-bottom">
//                         <h4>${element.name}</h4>
//                         <div class="d-flex justify-content-between flex-lg-wrap">
//                             <p class="text-dark fs-5 fw-bold mb-0">${element.price}đ</p>
//                             <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>`
//             })
        
            
//             child_html += ` </div>`;
//             html.innerHTML = child_html;
//         })

//     })

//     .catch(function (err) {
//         console.log(err);
//     })

// shop
    
fetch(API_URL + 'products')
.then(function (response) {
    response.json().then(function (data) {
    let product = ''  
    data.forEach(element => {
        product += 
        `
       
            <div class="col-md-6 col-lg-4 col-xl-3" onclick="detail_product(${element.id})">
                <div class="rounded position-relative fruite-item">
                    <div class="fruite-img">
                        <img src="./img/${element.image}" class="img-fluid w-100 rounded-top" alt="">
                    </div>
                    <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4>${element.name}</h4>
                        <div class="d-flex justify-content-between flex-lg-wrap">
                            <p class="text-dark fs-5 fw-bold mb-0">${element.price}đ</p>
                            <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                        </div>
                    </div>
                </div>
           
            
            
            </div>
        `
    });
    HTML.innerHTML = product
    });
  })



let danhmuc = document.getElementById('cate-shop');

fetch( API_URL+'categories')
.then(function (response) {
    response.json().then((data) => {
        let categories = '';
        data.forEach(function (data) {
            categories +=`
            <li>
                       <div class="d-flex justify-content-between fruite-name">
                           <a onclick='list(${data.id})'>
                           <i class="fas fa-apple-alt me-2">
                           </i>${data.name}</a>
                       </div>
                   </li>
            `

        });
        danhmuc.innerHTML = categories;
      });
    });
// fetch(API_URL + 'categories')
// .then(function (response) {
//     response.json().then(function (data) {
//         console.log(data);
//         let array = data;

//         let html = document.getElementById('cate-shop');
        
//         let child_html = ` <ul class="list-unstyled fruite-categorie">
//         `

//         array.forEach(element => {
//             console.log(element);
//             child_html += ` <li>
//             <div class="d-flex justify-content-between fruite-name">
//                 <a href="#"><i class="fas fa-apple-alt me-2"></i>${element.name}</a>
//             </div>
//         </li>
//         `
//         })
    
        
//         child_html += `  </ul>`;
//         html.innerHTML = child_html;
//     })

// })

// .catch(function (err) {
//     console.log(err);
// })
   