//Constantes ============================================================================================
const PIZZA_SIZES = {
  1: { size: 12, price: 2900 },
  2: { size: 8, price: 2000 },
  3: { size: 4, price: 1200 },
};

//Variables ============================================================================================
let loadingProducts = true;
let order = [];

//Funciones ============================================================================================
function welcome() {
  alert("👨‍🍳 Bienvenido a Don Remolo");
  alert("Esta listo para realizar su pedido");
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
  // AQUI COLOCAR FUNCION CALCULAR COSTO
  let numberOrder = Math.floor(Math.random() * 10000);
  alert(`Su numero de orden es: ${numberOrder}, Total a abonar: $`);
  alert(`👋 Muchas Gracias por su compra...`);
}

//Funciones sin interacción con el usuario =============================================================
function Pizza(size, flavor, price) {
  this.size = size;
  this.flavor = flavor;
  this.price = price;
}

function calculateTotalPrice() {}
// Fin de funciones

// Iniciación =========================================================================================
setTimeout(() => {
  welcome();
}, 2000);
