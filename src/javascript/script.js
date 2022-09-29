// Imports
import productsJson from "../../products.json";

// Variables
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// Main cart
let cart = [];

// Get products
class Products {
  async getProducts() {
    try {
      let data = productsJson;
      let products = data.items;
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// display products
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `        
      
      <article class="product">
      <figure class="img-container">
        <img
          src="${product.image}"
          alt=""
          class="product-img"
        />
        <button class="bag-btn" data-id=${product.id}>
          <h4>Reserve</h4>
        </button>
      </figure>
      <div class="pricing">
        <div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </div>
        <div>
          <span class="material-symbols-outlined"> star </span
          ><span>New</span>
        </div>
      </div>
    </article>`;
    });
    // productsDOM.innerHTML = result;
    productsDOM.innerHTML += result;
  }
}

// local storage
class Stroage {}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  // get all products
  products.getProducts().then((products) => ui.displayProducts(products));
});
