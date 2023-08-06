//Variables ============================================================================================
let loadingProducts = true;
let countProducts = 0;

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
  switch (size) {
    case "1": //12 Porciones
      flavour = whatFlavor(12);
      console.log(flavour);
      break;
    case "2": //8 Porciones
      flavour = whatFlavor(8);
      console.log(flavour);
      break;
    case "3": //4 Porciones
      flavour = whatFlavor(4);
      console.log(flavour);
      break;
    default:
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
  countProducts += 1; // Vamos acumulando la cantidad de productos agregados
  alert(`✅ Su pizza de ${flavour} ha sido cargada...`);
}

function finishBuying() {
  let description;
  if (countProducts > 1){
    description = 'pizzas';
  }else{
    description = 'pizza';
  };
  if(countProducts)
  alert(`👨‍🍳 DON REMOLO ya esta preparando su pedido \n de ${countProducts} ${description}...`);
  alert(`👋 Muchas Gracias por su compra...`);
}
// Fin de funciones

// Iniciación =========================================================================================
setTimeout(() => {
  welcome();
}, 2000);