import _ from "lodash";
import gsap from "gsap";
import products from "./data.js";
import "./scss/styles.scss";
import productsTemplate from "./templates/products.hbs";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";
import * as basicLightbox from "basiclightbox";
import shoppingCart from "./js/shoppingCart";

const productsContainer = document.querySelector("#products-container");
productsContainer.insertAdjacentHTML("beforeend", productsTemplate(products));

const cart = new shoppingCart(products);

// const renderProducts = (products) => {
//   const html = products.reduce(
//     (accum, { id, title, price, quantity, img, description }) => {
//       const product = document.createElement("div");
//       const imageCard = document.createElement("div");
//       const image = document.createElement("img");
//       const titleElem = document.createElement("h4");
//       const priceElem = document.createElement("p");
//       const button = document.createElement("button");

//       product.classList.add("product");
//       imageCard.classList.add("image");
//       button.classList.add("buttonBuy");

//       titleElem.textContent = title;
//       priceElem.textContent = price;
//       image.src = img;
//       button.type = "button";
//       button.textContent = "Buy";

//       imageCard.appendChild(image);
//       product.append(imageCard, titleElem, priceElem, button);
//       accum.push(product);
//       return accum;
//     },
//     []
//   );
//   productsContainer.append(...html);
// };

// renderProducts(products);

const sidebar = document.querySelector(".sidebar");
const menuBtn = document.querySelector("#menu-button");

let openMenu = true;
menuBtn.addEventListener("click", () => {
  if (openMenu) {
    gsap.to(".sidebar", {
      duration: 1,
      x: -200,
    });
    openMenu = false;
  } else {
    gsap.to(".sidebar", {
      duration: 1,
      x: 0,
    });
    openMenu = true;
  }
});

//open modal-window
document.querySelectorAll(".open-modal").forEach((elem) => {
  elem.addEventListener("click", (event) => {
    cart.renderProducts();
    document
      .querySelector(`#${event.currentTarget.dataset.modal}`)
      .classList.remove("is-hidden");
  });
});

// close modal-window
document.querySelectorAll(".modal-overlay, .modal-close").forEach((elem) => {
  elem.addEventListener("click", (event) => {
    document
      .querySelector(`#${event.currentTarget.dataset.for}`)
      .classList.add("is-hidden");
  });
});

// add to basket

// const shoppingCart2 = {
//   data: {
//     products: [],
//   },
//   addToBasket(product_id) {
//     let selectedProduct = products.find((product) => {
//       return product.id === product_id;
//     });
//     let newProduct = {
//       id: selectedProduct.id,
//       title: selectedProduct.title,
//       price: selectedProduct.price,
//       quantity: 1,
//     };
//     this.data.products.push(newProduct);
//     console.log(this.data.products);
//   },
// };

document.querySelectorAll(".buttonBuy").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let productId = Number(event.currentTarget.dataset.productId);
    cart.addToBasket(productId);
  });
});

productsContainer.addEventListener("click", (event) => {
  if (event.target.nodeName === "IMG") {
    event.preventDefault();
    console.log(event);
    const instance = basicLightbox.create(`
        <img src="${event.target.src}" width="800" height="600">
    `);
    instance.show();
  }
});

// пограйся с промісами
// let name = "natasha";

// const myfirstPromise = new Promise((resolve, reject) => {
//   if (name === "natasha") {
//     resolve(name);
//   }
//   reject("promise not fullfilled");
// });

// myfirstPromise
//   .then(
//     (name) => "mrs. " + name,
//     (data) => console.log(data)
//   )
//   .then((msname) => console.log(msname))
//   .catch((error) => console.error(error))
//   .finally(() => console.log("done"));
