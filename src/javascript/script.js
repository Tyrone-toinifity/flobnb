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

// buttons
const filterBtn = document.querySelectorAll(".filter-btn");
const cottageBtn = document.querySelector(".cottage");

filterBtn.forEach((item) => {
  item.addEventListener("click", (e) => {});
});

// Main cart
let cart = [];
// buttons
let buttonsDOM = [];

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
        const type = item.fields.type;
        return { title, price, id, image, type };
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
      // products
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

    let swiper = new Swiper(".mySwiper", {
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

  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);

      if (inCart) {
        button.innerText = "Booked!";
        button.disabled = true;
      }
      button.addEventListener("click", (e) => {
        button.innerText = "Booked!";
        button.disabled = true;
        button.style.font = "inherit";
        button.classList.add("bag-btn-Booked");
        // get product from products
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        // add product to the cart
        cart = [...cart, cartItem];
        // save cart in local storage
        Storage.saveCart(cart);
        // set cart values
        this.setCartValues(cart);
        // display cart Item
        this.addCartItem(cartItem);
        // show cart
        // this.showCart();
      });
    });
  }

  setCartValues(cart) {
    let total = 0;
    let itemsTotal = 0;
    cart.map((e) => {
      total += e.price * e.amount;
      itemsTotal += e.amount;
    });
    cartItems.innerText = itemsTotal;
    cartTotal.innerText = total;
  }
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `  
    <img
    src="${item.image[0]}"
    alt="product"
  />
  <div>
    <h4>${item.title}</h4>
    <h5>$${item.price}</h5>
    <span class="remove-item" data-id=${item.id} >remove</span>
  </div>
  <div>
    <span class="material-symbols-outlined chevron-up" data-id=${item.id}>
      expand_less
    </span>
    <p class="item-amount">${item.amount} ${
      item.amount === 1 ? "night" : "nights"
    }</p>
    <span class="material-symbols-outlined chevron-down" data-id=${item.id}>
      expand_more
    </span>
  </div>`;
    cartContent.appendChild(div);
  }
  // cart hide / show
  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
  }
  hideCart() {
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
  }

  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener("click", this.showCart);
    closeCartBtn.addEventListener("click", this.hideCart);
  }

  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
  cartLogic() {
    // clear cart button
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
    });
    // cart functionality
    cartContent.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        let removeItem = e.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      } else if (e.target.classList.contains("chevron-up")) {
        let addAmount = e.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = `${tempItem.amount} ${
          tempItem.amount === 1 ? "night" : "nights"
        }`;
      } else if (e.target.classList.contains("chevron-down")) {
        let lowerAmount = e.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = `${tempItem.amount} ${
            tempItem.amount === 1 ? "night" : "nights"
          }`;
        } else {
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
          this.removeItem(id);
        }
      }
    });
  }
  clearCart() {
    let cartItem = cart.map((item) => item.id);
    cartItem.forEach((id) => this.removeItem(id));
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
      this.hideCart();
    }
  }

  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.classList.remove("bag-btn-Booked");
    button.disabled = false;
    button.innerText = "Reserve";
  }
  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
  }
}

// local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  // setup
  ui.setupAPP();
  // get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic();
    });
});
