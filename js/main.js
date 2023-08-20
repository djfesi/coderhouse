//Constantes ============================================================================================
const PIZZA_SIZES = {
  1: { size: 12, price: 2900 },
  2: { size: 8, price: 2000 },
  3: { size: 4, price: 1200 },
};
const DAY = new Date()
const DAYS_OF_THE_WEEK = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

//Variables ============================================================================================
let loadingProducts = true;
let order = [];

//Funciones ============================================================================================
function welcome() {
  const CURRENT_TIME  = DAY.getHours();
  const DATE_TODAY  = DAYS_OF_THE_WEEK[DAY.getDay()];
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
  if(order.find(pizza => pizza.size === 12)){
    order.forEach(pizza => {
      if (pizza.size === 12) {
        const descuento = pizza.price * 0.10;
        pizza.price -= descuento;
        }
    });
  }
  let price = calculateTotalPrice();
  let numberOrder = Math.floor(Math.random() * 10000);
  alert(`Su numero de orden es: ${numberOrder}, Total a abonar: $ ${price.toFixed(2)}`);
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
return total
}
// Fin de funciones

// Iniciación ==========================================================================================
setTimeout(() => {
  welcome();
}, 2000);
