// Cripto a buscar
const nombreCripto = "bitcoin";

// Lista de monedas
const monedas = {
  dolares: "usd",
  pesos: "ars",
};

// Esta función simplifica la búsqueda de criptos y conversión a divisas.
// Apunta a que mañana pueda ser utilizada para buscar otros datos
const buscarPrecios = async (nombreCripto, monedas) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${nombreCripto}&vs_currencies=${monedas.dolares},${monedas.pesos}`;

  try {
    fetch(url)
      .then((datosEnBruto) => datosEnBruto.json())
      .then((datosJSON) => {
        // Desestructuramos todo el json que vino de la api
        let precio = ({} = datosJSON);

        const bitcoinDolares = precio[nombreCripto][monedas.dolares];
        const bitcoinPesos = precio[nombreCripto][monedas.pesos];

        const usd = accounting.formatMoney(bitcoinDolares, "$", 0, ".", ",");
        const ars = accounting.formatMoney(bitcoinPesos, "$", 0, ".", ",");

        console.log(usd);
        console.log(ars);
        mostrarPrecios(ars, usd);
      });
  } catch (error) {
    console.log("Algo muuuuy malo sucedió...");
  }
};

const mostrarPrecios = (ars, usd) => {
  document.getElementById("ars").textContent = ars;
  document.getElementById("usd").textContent = usd;
};

// Cuando hacemos click en el botón Actualizar
document.getElementById("actualizar").addEventListener("click", () => {
  buscarPrecios(nombreCripto, monedas);
  actualizarHora();
});

// Cuando inicia la página, actualizamos la hora actual
actualizarHora();
// Mostramos por primera vez los precios
buscarPrecios(nombreCripto, monedas);
