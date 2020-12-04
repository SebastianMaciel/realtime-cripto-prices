// Cuando inicia la página, actualizamos la hora actual
actualizarHora();

// Cripto a buscar
const nombreCripto = "bitcoin";

// Lista de monedas
const monedas = {
  dolares: "usd",
  pesos: "ars",
};

// Esta función simplifica la búsqueda de criptos y conversión a divisas.
// Apunta a que mañana pueda ser utilizada para buscar otros datos
const buscarPrecios = (cripto, monedas) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cripto}&vs_currencies=${monedas.dolares},${monedas.pesos}`;

  fetch(url)
    .then((datosEnBruto) => datosEnBruto.json())
    .then((datosJSON) => {
      // Desestructuramos todo el json que vino de la api
      let precio = ({} = datosJSON);

      const numeros = precio[cripto][monedas];

      console.log(precio[cripto]);
    });
};

buscarPrecios(nombreCripto, monedas);

// Cuando hacemos click en el botón Actualizar
document.getElementById("actualizar").addEventListener("click", () => {
  actualizarHora();
});
