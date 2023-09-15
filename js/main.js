//Constantes ============================================================================================
const PIZZA_SIZES = {
  1: { size: 12, price: 2900 },
  2: { size: 8, price: 2000 },
  3: { size: 4, price: 1200 },
};

const PRODUCTS = [
  {
    id: 0,
    name: "Pizza Cantimpalo",
    description:
      "Nuestra deliciosa pizza Cantimpalo está hecha con una base de salsa de tomate casera, queso mozzarella derretido y abundantes rodajas de chorizo Cantimpalo, ¡una explosión de sabor en cada bocado!",
    type: "Pizza",
    img: "https://th.bing.com/th/id/R.fb924adfcac2d9873093f80618bb137b?rik=MqV9PfXgBoPm5w&riu=http%3a%2f%2fpapaallenspizza.com%2fdowntown%2fimages%2fpepperoni.png&ehk=4%2bn5e2Z7XXIlHYGlmA42b15HqPlvRyrfuPfwzsLVY9s%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: 1,
    name: "Pizza Margherita",
    description:
      "Nuestra clásica Pizza Margherita es una obra maestra simple pero deliciosa. Con tomates frescos, mozzarella de alta calidad y hojas de albahaca fragantes, te transportará a la Italia auténtica en cada bocado.",
    type: "Pizza",
    img: "https://www.hearthandfirepizza.com/cdn/shop/products/product-beauty-the-margherita.png?v=1656423819",
  },
  {
    id: 2,
    name: "Pizza BBQ",
    description:
      "Si eres amante de los sabores ahumados y el toque agridulce, nuestra Pizza BBQ es perfecta para ti. Con salsa barbacoa, pollo a la parrilla, cebolla roja y queso cheddar, te llevará a una experiencia única.",
    type: "Pizza",
    img: "https://images.newyorkpizza.nl/Products/Original/BBQ_Double_Bacon-8181.png",
  },
  {
    id: 3,
    name: "Pizza Vegetariana",
    description:
      "Nuestra Pizza Vegetariana es un festín de sabores frescos. Con una mezcla de pimientos, champiñones, aceitunas, cebolla y espinacas, es una opción saludable y deliciosa para los amantes de las verduras.",
    type: "Pizza",
    img: "https://livornos.com/wp-content/uploads/2020/08/h2_pizza-1.png",
  },
  {
    id: 4,
    name: "Pizza Hawaiana",
    description:
      "La Pizza Hawaiana es la combinación perfecta de dulce y salado. Con trozos jugosos de piña, jamón, salsa de tomate y queso fundido, te transportará a una isla tropical en cada bocado.",
    type: "Pizza",
    img: "https://www.pizzapatron.com/wp-content/themes/patron/dist/img/hawaianawebP.webp",
  },
  {
    id: 5,
    name: "Pizza Pepperoni",
    description:
      "Nuestra Pizza Pepperoni es un clásico atemporal. Con generosas capas de pepperoni y queso derretido, es la elección perfecta para los amantes de los sabores intensos y picantes.",
    type: "Pizza",
    img: "https://assets.caseys.com/m/429f598e526c218c/400x400-8104_base.PNG",
  },
  {
    id: 6,
    name: "Pizza de Pollo BBQ",
    description:
      "¿Quieres un toque de barbacoa en tu pizza? Prueba nuestra Pizza de Pollo BBQ, con pollo a la parrilla, cebolla morada, maíz dulce y salsa de barbacoa, es una fiesta de sabores en cada rebanada.",
    type: "Pizza",
    img: "https://eldinamico.com/wp-content/uploads/2023/03/BBQ.png",
  },
];

// Elementos capturados
const productsHTML = document.getElementById("cardProducts");
const inputSearch = document.querySelector("#search");
const clearCartButton = document.querySelector(".btn-clear");
const processOrderButton = document.querySelector(".btn-process");
const purchaseDetails = document.getElementById("purchaseDetails");

//Variables ============================================================================================
let loadingProducts = true;
let totalPrice = 0;
let totalQuantity = 0;
let order = [];
let cart = [];

//Funciones ============================================================================================

//Creacion de Cards de Productos
function createGrid(PRODUCTS) {
  for (const product of PRODUCTS) {
    let card = document.createElement("div");
    card.classList.add("col-sm-12");
    card.classList.add("col-md-6");
    card.classList.add("col-lg-4");
    card.classList.add("p-4");
    card.innerHTML = `<section class="card">
    <div class="product-image">
      <img src=${product.img} draggable="false" />         
    </div>
    <div class="product-info">
      <h2>🍕 ${product.name}</h2>
      <p>${product.description}</p>
      <div class="price" id="price-${product.id}">$${PIZZA_SIZES[1].price}</div>
      <label for="portion-select">Porción:</label>
      <select id="portion-select-${product.id}">
        <option value="1">12 porciones</option>
        <option value="2">8 porciones</option>
        <option value="3">4 porciones</option>
      </select>
    </div>
    <div class="btn">
      <button class="buy-btn" id="${product.id}">Agregar al carrito 👨‍🍳</button>
      <button class="fav" id="fav-${product.id}">
        <svg class="svg" id="i-star-${product.id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M16 2 L20 12 30 12 22 19 25 30 16 23 7 30 10 19 2 12 12 12 Z" />
        </svg>
      </button>
    </div>
    </section>`;

    productsHTML.appendChild(card);
    const favButton = document.getElementById(`fav-${product.id}`);

    favButton.addEventListener("click", () => toggleFavorite(product.id));

    const portionSelect = document.getElementById(
      `portion-select-${product.id}`
    );

    portionSelect.addEventListener("change", () => {
      const selectedSize = portionSelect.value;
      const priceElement = document.getElementById(`price-${product.id}`);
      priceElement.textContent = `$${PIZZA_SIZES[selectedSize].price}`;
    });
  }
}

//Actualiza contador de productos
function updateCounter() {
  const cartQuantity = document.getElementById("cart-quantity");

  if (sessionStorage.getItem("cartItems")) {
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    const totalQuantity = cartItems.reduce((total, product) => {
      return total + product.amount;
    }, 0);
    cartQuantity.textContent = totalQuantity.toString();
  } else {
    cartQuantity.textContent = "0";
  }

  calculateTotal();
}

//Agregar a favoritos
function toggleFavorite(productId) {
  const svgIcon = document.getElementById(`i-star-${productId}`);
  const isFavorite = localStorage.getItem(`favorite-${productId}`);

  if (isFavorite === "true") {
    localStorage.removeItem(`favorite-${productId}`);
    svgIcon.style.fill = "#fff";
  } else {
    localStorage.setItem(`favorite-${productId}`, "true");
    svgIcon.style.fill = "#ffcc00";
  }
}

//Renderiza si el producto esta en fav o no
function applyFavoriteStateOnLoad() {
  PRODUCTS.forEach((product) => {
    const productId = product.id;
    const svgIcon = document.getElementById(`i-star-${productId}`);
    const isFavorite = localStorage.getItem(`favorite-${productId}`);
    if (isFavorite === "true") {
      svgIcon.style.fill = "#ffcc00";
    } else {
      svgIcon.style.fill = "#fff";
    }
  });
}

//Tabla con detalle del pedido
function renderCartTable() {
  const cartTableBody = document.querySelector("#cart-table tbody");
  cartTableBody.innerHTML = "";
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));

  if (cartItems && cartItems.length > 0) {
    cartItems.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.amount}</td>
        <td>${item.name}</td>
        <td>${item.size} porciones</td>
        <td>$${item.price.toFixed(2)}</td>
      `;
      cartTableBody.appendChild(row);
    });
  }
}

//Calcular costo
function calculateTotal() {
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
  totalPrice = 0;
  if (cartItems && cartItems.length > 0) {
    cartItems.forEach((item) => {
      totalPrice += item.price * item.amount;
    });
  }
  const totalPayElement = document.getElementById("totalPay");
  totalPayElement.textContent = `$${totalPrice.toFixed(2)}`;
}

//Limpiar carrito
function clearCart() {
  if (sessionStorage.getItem("cartItems")) {
    sessionStorage.removeItem("cartItems");
    totalPrice = 0;
  }
  updateCounter();
  renderCartTable();
}

//Boton agregar producto al carrito
function addToCart(button) {
  const selectedProduct = PRODUCTS.find(
    (product) => product.id === Number(button.id)
  );

  const portionSelect = document.getElementById(`portion-select-${button.id}`);
  const selectedSize = portionSelect.value;
  selectedProduct.size = PIZZA_SIZES[selectedSize].size;
  selectedProduct.price = PIZZA_SIZES[selectedSize].price;

  let cart = [];
  if (sessionStorage.getItem("cartItems")) {
    cart = JSON.parse(sessionStorage.getItem("cartItems"));
  }

  const existingProductIndex = cart.findIndex((product) => {
    return (
      product.name === selectedProduct.name &&
      product.size === selectedProduct.size
    );
  });

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].amount += 1;
  } else {
    selectedProduct.amount = 1;
    delete selectedProduct.img;
    delete selectedProduct.description;
    cart.push(selectedProduct);
  }

  sessionStorage.setItem("cartItems", JSON.stringify(cart));

  if (purchaseDetails.textContent) {
    purchaseDetails.classList.remove("bg-detail");
    purchaseDetails.classList.remove("bg-detail-false");
    purchaseDetails.textContent = "";
  }

  updateCounter();
  renderCartTable();
}

//Procesar compra
function processOrder() {
  const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
  if (cartItems) {
    purchaseDetails.classList.remove("bg-detail-false");
    purchaseDetails.classList.add("bg-detail");
    let numberOrder = Math.floor(Math.random() * 10000);
    purchaseDetails.textContent = `Su pedido ya esta en curso, el total a abonar es $${totalPrice.toFixed(
      2
    )}. Muchas Gracias por su compra...👋. Su n° de pedido es: ${numberOrder}.`;
  } else {
    purchaseDetails.classList.remove("bg-detail");
    purchaseDetails.classList.add("bg-detail-false");
    purchaseDetails.textContent = `❌ ¡No tienes productos cargados aún!`;
  }
  clearCart();
}

//Se llama a las funciones
createGrid(PRODUCTS);
if (sessionStorage.getItem("cartItems")) {
  cart = JSON.parse(sessionStorage.getItem("cartItems"));
}
updateCounter();
renderCartTable();
applyFavoriteStateOnLoad();
//Fin

//Eventos ============================================================================================
// Agregar event listener a los botones de compra
let addButtons = document.querySelectorAll(".buy-btn");
addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addToCart(button);
  });
});

// Filtro de busqueda
inputSearch.addEventListener("keyup", () => {
  const searchText = inputSearch.value.toLowerCase();
  const filteredProducts = PRODUCTS.filter((product) => {
    const productName = product.name.toLowerCase();
    return productName.includes(searchText);
  });
  productsHTML.innerHTML = "";
  createGrid(filteredProducts);
  btn = document.querySelectorAll(".buy-btn");
  btn.forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button);
    });
  });
  applyFavoriteStateOnLoad();
});

//Limpiar carrito
clearCartButton.addEventListener("click", clearCart);

//Finalizar compra
processOrderButton.addEventListener("click", processOrder);
