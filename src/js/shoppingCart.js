export default class shoppingCart {
  constructor(allProducts) {
    this.selectedProducts = [];
    this.allProducts = allProducts;
    this.cartContent = document.querySelector("#modal-basket .modal-content");
  }
  addToBasket(product_id) {
    let selectedProduct = this.allProducts.find((product) => {
      return product.id === product_id;
    });
    let newProduct = {
      id: selectedProduct.id,
      title: selectedProduct.title,
      price: selectedProduct.price,
      quantity: 1,
    };
    this.selectedProducts.push(newProduct);
    console.log(this.selectedProducts);
  }
  renderProducts() {
    this.cartContent.innerHTML = this.selectedProducts
      .map(({ id, title, price, quantity }) => `<p>${title} - ${price}</p>`)
      .join("");
  }
}
