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
        // const image = item.fields.image.fields.file.url[0];
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
    // let newImage = "";

    products.forEach((product) => {
      const printPhoto = (img) => {
        return `<img
          src=${img[0]}
          alt=""
          class="product-img swiper-slide"
          /> <img
          src=${img[1]}
          alt=""

          class="product-img swiper-slide"
          />
          <img
          src=${img[2]}
          alt=""

          class="product-img swiper-slide"
          />
          <img
          src=${img[3]}
          alt=""

          class="product-img swiper-slide"
          />
        
          `;
      };
      //   product
      result += `    
      <article class="product">
      <figure class="img-container">
        <div class="swiper mySwiper ">
        <div class="swiper-wrapper">

        ${printPhoto(product.image)}


              <div class="swiper-button-next show-swiper"></div>
              <div class="swiper-button-prev show-swiper"></div>
              <div class="swiper-pagination show-swiper"></div>
            </div>

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
    productsDOM.insertAdjacentHTML("beforeend", result);
    var swiper = new Swiper(".mySwiper", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      keyboard: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
    });
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
