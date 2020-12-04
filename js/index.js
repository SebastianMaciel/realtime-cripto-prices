// Cripto a buscar
const nombreCripto = "bitcoin";

// Lista de monedas - Por el momento nos interesan pesos y dólares
const monedas = {
  dolares: "usd",
  pesos: "ars",
};

// Cuando inicia la página, actualizamos la hora actual
actualizarHora();
// Mostramos por primera vez los precios
buscarPrecios(nombreCripto, monedas);

// Cuando hacemos click en el botón Actualizar
document.getElementById("actualizar").addEventListener("click", () => {
  // Volvemos a ejecutar la búsqueda de precios
  buscarPrecios(nombreCripto, monedas);
  // Actualizamos la hora de nuevo
  actualizarHora();
});
