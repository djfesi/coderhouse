//Constantes ============================================================================================
const PIZZA_SIZES = {
  1: { size: 12, price: 2900 },
  2: { size: 8, price: 2000 },
  3: { size: 4, price: 1200 },
};

// Elementos capturados
const productsHTML = document.getElementById("cardProducts");
const inputSearch = document.querySelector("#search");
const clearCartButton = document.querySelector(".btn-clear");
const processOrderButton = document.querySelector(".btn-process");
const purchaseDetails = document.getElementById("purchaseDetails");

//Variables ============================================================================================
let PRODUCTS = [];
let loadingProducts = true;
let totalPrice = 0;
let totalQuantity = 0;
let order = [];
let cart = [];

//Funciones ============================================================================================
//Creacion de Cards de Productos
function createGrid(PRODUCTS) {
  for (const product of PRODUCTS) {
    const { id, img, name, description } = product;
    let card = document.createElement("div");
    card.classList.add("col-sm-12");
    card.classList.add("col-md-6");
    card.classList.add("col-lg-4");
    card.classList.add("p-4");
    card.innerHTML = `<section class="card">
    <div class="product-image">
      <img src=${img} draggable="false" />         
    </div>
    <div class="product-info">
      <h2>🍕 ${name}</h2>
      <p>${description}</p>
      <div class="price" id="price-${id}">$${PIZZA_SIZES[1].price}</div>
      <label for="portion-select">Porción:</label>
      <select id="portion-select-${id}">
        <option value="1">12 porciones</option>
        <option value="2">8 porciones</option>
        <option value="3">4 porciones</option>
      </select>
    </div>
    <div class="btn">
      <button class="buy-btn" id="${id}">Agregar al carrito 👨‍🍳</button>
      <button class="fav" id="fav-${id}">
        <svg class="svg" id="i-star-${id}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M16 2 L20 12 30 12 22 19 25 30 16 23 7 30 10 19 2 12 12 12 Z" />
        </svg>
      </button>
    </div>
    </section>`;

    productsHTML.appendChild(card);
    const favButton = document.getElementById(`fav-${id}`);

    favButton.addEventListener("click", () => toggleFavorite(id));

    const portionSelect = document.getElementById(`portion-select-${id}`);

    portionSelect.addEventListener("change", () => {
      const selectedSize = portionSelect.value;
      const priceElement = document.getElementById(`price-${id}`);
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
    isFavorite === "true"
      ? (svgIcon.style.fill = "#ffcc00")
      : (svgIcon.style.fill = "#fff");
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
    cart.push(selectedProduct);
  }

  sessionStorage.setItem("cartItems", JSON.stringify(cart));

  Toastify({
    text: `${selectedProduct.name} agregada`,
    duration: 1200,
    style: {
      background: "linear-gradient(to right, #b99811, #ffcc00)",
    },
  }).showToast();

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

//Fetch consumir productos
fetch("./data/data.json")
  .then((response) => response.json())
  .then((data) => {
    PRODUCTS = data;
    createGrid(PRODUCTS);
    if (sessionStorage.getItem("cartItems")) {
      cart = JSON.parse(sessionStorage.getItem("cartItems"));
    }
    updateCounter();
    renderCartTable();
    applyFavoriteStateOnLoad();
    let addButtons = document.querySelectorAll(".buy-btn");
    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        addToCart(button);
      });
    });
  })
  .catch((err) => {
    Toastify({
      text: "No se pueden cargar los productos.",
      duration: 2000,
      style: {
        background: "linear-gradient(to right, #a62121, #d71a1a)",
      },
    }).showToast();
  });
//Fin

//Eventos ============================================================================================
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
clearCartButton.addEventListener("click", function () {
  if (!sessionStorage.getItem("cartItems")) {
    Toastify({
      text: "No tienes productos cargados.",
      duration: 1200,
      style: {
        background: "linear-gradient(to right, #a62121, #d71a1a)",
      },
    }).showToast();
  } else {
    Swal.fire({
      title: "Vaciar Carrito",
      text: "Esta seguro que desea vaciar el carrito de compras?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffcc00",
      cancelButtonColor: "#a62121",
      confirmButtonText: "Vaciar",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
      }
    });
  }
});

//Finalizar compra
processOrderButton.addEventListener("click", processOrder);
