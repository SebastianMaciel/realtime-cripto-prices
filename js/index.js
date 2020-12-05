// =======================================================================================
// Setup inicial!
// Los botones indican qué cripto queremos buscar:
// =======================================================================================
const botonesCripto = document.querySelectorAll(".buscarPrecio"); // Listamos los botones BTC, ETH y DAI

botonesCripto.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    const cripto = e.target.dataset.id; // Sacamos el nombre de la cripto de data-id del botón
    document.getElementById("nombreCripto").textContent = cripto; // Cambiamos el nombre del cripto

    // Buscamos todos los botones, y los desactivamos visualmente
    botonesCripto.forEach(function (botonesNoActivos) {
      botonesNoActivos.classList.remove("btn-warning");
      botonesNoActivos.classList.add("btn-outline-warning");
    });

    e.target.classList.remove("btn-outline-warning"); // Sacamos el estilo inactivo
    e.target.classList.add("btn-warning"); ///////////// Le damos el estilo de activo

    // Falta cambiar loguito...
    // document.getElementById("logoCripto").textContent = cripto;
    // Actualizamos...
    actualizarPrecios(cripto, divisas);
  });
});

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
