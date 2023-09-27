

let productID = localStorage.getItem("indi-id");
let product;
let cart = JSON.parse(localStorage.getItem("cart"))||[];
let cartObj = {};
const URL = "https://good-rose-bass-ring.cyclic.app/data/";

let titleEl = document.querySelector("title");
let detailsEl = document.getElementById("data");


async function getProduct(productID){
  try {
    let res = await fetch(`${URL}${productID}`);
    let data = await res.json();
    displayData(data);
    displayExtraData(data);
    product = data;
  } catch (error) {
    console.log("Error:--",error);
  }
}
getProduct(productID);

  function displayData(product){
    titleEl.textContent = product.name;
    detailsEl.innerHTML = `
      <div>
          <div>
              <p id="deal">${product["deal"].toUpperCase()}</p>
              <p id="bought">Based on <span>${product.bought}</span> ratings</p>
          </div>
          <div>
              <h2 id="name">${product.name}</h2>
          </div>
          <p id="address">${product.address}</p>
      </div>
      <div>
          <img src=${product.image} alt="" id="image">
      </div>
    `;
   
  }
  // deals section
  let headEl = document.getElementById("head");
  let priceEl = document.getElementById("price");
  let addBtn = document.querySelector("#addBtn1");
  //cart section
  let indCartEl = document.getElementById("ind-cart");


  function displayExtraData(product){
    headEl.textContent = product.deal;
    priceEl.textContent = product.price;
  }

  addBtn.addEventListener('click', () => {
    let qty=1;
    addBtn.innerHTML = `
      <button id="subBtn">-</button>
      <span>${qty}</span>
      <button id="addBtn">+</button>
    `;

    let subBtn2 = document.getElementById("subBtn");
    let addBtn2 = document.getElementById("addBtn");

    subBtn2.addEventListener('click', () => {
      if(qty==1){
        addBtn.innerHTML = `
          <button id="addBtn1">Add +</button>
        `;
      } else {
        qty--;
        cartObj["qty"] = qty;
      }
    })

    addBtn2.addEventListener('click', () => {
      qty++;
      cartObj["qty"] = qty;
    })


    cartObj = {
      name: product["name"],
      image: product.image,
      address: product.address,
      deal: product.deal,
      price: product.price,
      qty: qty
    }
    indCartEl.innerHTML = `
      <p>${cartObj.deal}</p>
      <p>x${cartObj.qty}</p>
      <p>₹${cartObj.price}</p>
    `;
  });









  
// Redirect to cart page 
  let buyBtn = document.querySelector("#total>button");
  buyBtn.addEventListener('click', () => {
    cart.push(cartObj);
    localStorage.setItem("cart",JSON.stringify(cart));
    location.href = "./cart.html";
  });