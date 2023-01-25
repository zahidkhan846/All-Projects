class Product {
  constructor(title, description, price, imageUrl) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}

class Element {
  constructor(attributeName, attributeValue) {
    this.attributeName = attributeName;
    this.attributeValue = attributeValue;
  }
}

class Component {
  constructor(elementId) {
    this.elementId = elementId;
  }

  createRootElement(htmlTag, cssStyle, attributes) {
    const rootElement = document.createElement(htmlTag);
    if (cssStyle) rootElement.className = cssStyle;
    if (attributes && attributes.length > 0) {
      attributes.forEach((attribute) =>
        rootElement.setAttribute(attribute.name, attribute.value)
      );
    }
    document.getElementById(this.elementId).append(rootElement);
    return rootElement;
  }
}

class Cart extends Component {
  items = [];

  set cartValues(value) {
    this.items = value;
    this.totalAmountEl.innerHTML = `<p id="total-amount">Total Amount: $${this.totalAmount.toFixed(
      2
    )}</p>`;
  }

  get totalAmount() {
    const sum = this.items.reduce((pValue, item) => pValue + item.price, 0);
    return sum;
  }

  constructor(elementId) {
    super(elementId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartValues = updatedItems;
  }

  orderNow() {
    console.log("Ordered!");
  }

  render() {
    const cartElement = this.createRootElement("div");
    cartElement.innerHTML = `
   <div class="cart-card">
    <div>
      <p class="total-amount">Total Amount: $0.00</p>
    </div>
    <div>
      <button class="btn btn-order">Order It</button>
    </div>
   </div>
    `;

    this.totalAmountEl = cartElement.querySelector(".total-amount");
    const orderButton = cartElement.querySelector(".btn-order");

    orderButton.addEventListener("click", this.orderNow);
    return cartElement;
  }
}

class ProductElement {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const productEl = document.createElement("li");
    productEl.className = "product-card";
    productEl.innerHTML = `
      <div class="product-detail">
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" />
        </div>
        <div class="px-1">
          <p>${this.product.title}</p>
          <p>$ ${this.product.price}</p>
        </div>
        <div class="mt-1">
          <button class="btn btn-primary full">Add to cart</button>
        </div>
      </div>
        `;

    const addToCartButton = productEl.querySelector("button");

    addToCartButton.addEventListener("click", this.addToCart.bind(this));

    return productEl;
  }
}

class ProductList {
  products = [
    new Product(
      "Macbook Air",
      "A good laptop.",
      999.99,
      "https://images.pexels.com/photos/293336/pexels-photo-293336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300"
    ),
    new Product(
      "Acer Aspire E1",
      "A good laptop.",
      499.99,
      "https://images.pexels.com/photos/169484/pexels-photo-169484.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300"
    ),

    new Product(
      "Logitech G Pro Wireless Mouse",
      "A good wireless mice with 1ms response rate.",
      99.99,
      "https://images.pexels.com/photos/399160/pexels-photo-399160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300"
    ),

    new Product(
      "Logitech G Pro Wireless Keyboard",
      "A good wireless keyboard with 1ms response rate and Romer G Switches.",
      199.99,
      "https://images.pexels.com/photos/399160/pexels-photo-399160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300"
    ),
  ];

  constructure() {}

  render() {
    const allProducts = document.createElement("ul");
    allProducts.className = "all-products";
    for (const product of this.products) {
      const productElement = new ProductElement(product);
      const productEl = productElement.render();
      allProducts.append(productEl);
    }
    return allProducts;
  }
}

class Shop {
  render() {
    const app = document.getElementById("root");
    const container = document.createElement("div");
    const cartItems = document.createElement("div");
    cartItems.className = "cart-items";
    container.className = "container";
    this.cart = new Cart("root");
    const cartElements = this.cart.render();
    const productList = new ProductList();
    const productListElement = productList.render();

    container.append(productListElement);
    cartItems.append(cartElements);
    app.append(cartItems);
    app.append(container);
  }
}

class App {
  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
