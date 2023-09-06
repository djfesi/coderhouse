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

const DAY = new Date();
const DAYS_OF_THE_WEEK = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

//Variables ============================================================================================
let loadingProducts = true;
let order = [];

//Funciones ============================================================================================
function welcome() {
  const CURRENT_TIME = DAY.getHours();
  const DATE_TODAY = DAYS_OF_THE_WEEK[DAY.getDay()];
  alert("👨‍🍳 Bienvenido a Don Remolo");
  alert(`Solo por hoy ${DATE_TODAY}, pizzas de 12 porciones 10% OFF`);
  let TimeOfTheDay;
  if (CURRENT_TIME <= 15) {
    TimeOfTheDay = "almuerzo";
  } else {
    TimeOfTheDay = "cena";
  }
  alert(`Esta listo para pedir su ${TimeOfTheDay}`);
  startOrder();
}

function startOrder() {
  do {
    addProducts();
  } while (loadingProducts === true);
}

function addProducts() {
  let size = prompt(
    "🍕 Ingrese el tamaño de la pizza a ordenar \n 1 - 12 Porciones \n 2 - 8 Porciones \n 3 - 4 Porciones"
  );
  let flavour;
  if (PIZZA_SIZES.hasOwnProperty(size)) {
    flavour = whatFlavor(PIZZA_SIZES[size].size);
    order.push(
      new Pizza(PIZZA_SIZES[size].size, flavour, PIZZA_SIZES[size].price)
    );
  } else {
    return alert("❌ Valor Inválido");
  }
  message(flavour);
  addOtherProduct();
}

function whatFlavor(size) {
  let flavor = prompt(`🍕 De que sabor quiere su pizza de ${size} porciones`);
  return flavor;
}

function addOtherProduct() {
  let isFinished = prompt(
    "Desea agregar otro producto  \n  0 - NO \n  1 - SI  "
  );
  if (isFinished === "1") {
  } else if (isFinished === "0") {
    finishBuying(); //Finaliza el pedido
    loadingProducts = false;
  } else {
    alert("❌ Valor Inválido");
    addOtherProduct();
  }
}

function message(flavour) {
  alert(`✅ Su pizza de ${flavour} ha sido cargada...`);
}

function finishBuying() {
  let description;
  if (order.length > 1) {
    description = "pizzas";
  } else {
    description = "pizza";
  }
  if (order.length) {
    alert(
      `👨‍🍳 DON REMOLO ya esta preparando su pedido \n de ${order.length} ${description}...`
    );
  }
  if (order.find((pizza) => pizza.size === 12)) {
    order.forEach((pizza) => {
      if (pizza.size === 12) {
        const descuento = pizza.price * 0.1;
        pizza.price -= descuento;
      }
    });
  }
  let price = calculateTotalPrice();
  let numberOrder = Math.floor(Math.random() * 10000);
  alert(
    `Su numero de orden es: ${numberOrder}, Total a abonar: $ ${price.toFixed(
      2
    )}`
  );
  alert(`👋 Muchas Gracias por su compra...`);
}

//Funciones sin interacción con el usuario =============================================================
function Pizza(size, flavor, price) {
  this.size = size;
  this.flavor = flavor;
  this.price = price;
}

function calculateTotalPrice() {
  let total = 0;
  for (var i = 0; i < order.length; i++) {
    total += order[i].price;
  }
  return total;
}
// Fin de funciones

// Iniciación =========================================================================================
// setTimeout(() => {
//   welcome();
// }, 2000);

const productsHTML = document.getElementById("cardProducts");

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
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <div class="price">$999</div>
    </div>
    <div class="btn">
      <button class="buy-btn" id="${product.id}">Agregar al carrito</button>
      <button class="fav">
        <svg class="svg" id="i-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M16 2 L20 12 30 12 22 19 25 30 16 23 7 30 10 19 2 12 12 12 Z" />
        </svg>
      </button>
    </div>
    </section>`;
    productsHTML.appendChild(card);
  }
}

createGrid(PRODUCTS);

// Filtro de busqueda
const inputSearch = document.querySelector("#search");
inputSearch.addEventListener("keyup", () => {
  const searchText = inputSearch.value.toLowerCase();
  const filteredProducts = PRODUCTS.filter((product) => {
    const productName = product.name.toLowerCase();
    return productName.includes(searchText);
  });
  productsHTML.innerHTML = "";
  createGrid(filteredProducts);
});

let cart = [];
if (sessionStorage.getItem("cartItems")) {
  cart = JSON.parse(sessionStorage.getItem("cartItems"));
}
const addButtons = document.querySelectorAll(".buy-btn");
addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedProduct = PRODUCTS.find(
      (product) => product.id === Number(button.id)
    );
    cart.push(selectedProduct);
    sessionStorage.setItem("cartItems", JSON.stringify(cart));
  });
});

