// =======================================================================================
// Setup inicial!
// Seteamos el nomobre de la criptomoneda a buscar:
// =======================================================================================
const botonesPrecio = document.querySelectorAll(".buscarPrecio");

botonesPrecio.forEach(function (boton) {
  boton.addEventListener("click", (e) => {
    const cripto = e.target.dataset.id; // en el botón está el dato que nos interesa
    document.getElementById("nombreCripto").textContent = cripto; // Nombre del cripto
    // Falta cambiar loguito...
    // document.getElementById("logoCripto").textContent = cripto;
    // Actualizamos...
    actualizarPrecios(cripto, divisas);
  });
});

// const cripto = "bitcoin";

// =======================================================================================
// Hacemos una lista de monedas - Por el momento nos interesan pesos y dólares
// =======================================================================================
const divisas = {
  dolares: "usd",
  pesos: "ars",
};

// =======================================================================================
// Cuando hacemos click en el botón Actualizar
// =======================================================================================
// document.getElementById("actualizar").addEventListener("click", () => {
//   actualizarPrecios(cripto, divisas); // Volvemos a ejecutar la búsqueda de precios
// });
