/*

Setup inicial!
==============

Queremos que la web cargue los datos por lo menos una vez.

Después, con el botón actualizar hacemos lo mismo cada vez que queramos.

*/

// Seteamos el nomobre de la criptomoneda a buscar
const nombreCripto = "bitcoin";

// Hacemos una lista de monedas - Por el momento nos interesan pesos y dólares
// Estos valores realmente se envían como argumentos a una función
// Que se encarga de separar estos valores para enviarlos a la api de consulta
const divisas = {
  dolares: "usd",
  pesos: "ars",
};

// Esta función pone en pantalla la hora actual y los precios
// Cada vez que cargamos la página por primera vez o cuando refrezcamos el sitio
actualizarHoraYPrecios();

// Cuando hacemos click en el botón Actualizar
document.getElementById("actualizar").addEventListener("click", () => {
  // Volvemos a ejecutar la búsqueda de precios
  actualizarPrecios(nombreCripto, divisas);
  // Actualizamos la hora de nuevo
  actualizarHora();
});
