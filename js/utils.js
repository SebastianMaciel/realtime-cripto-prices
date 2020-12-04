// Configuramos la hora y el minuto de actualización:
const actualizarHora = () => {
  const hoy = new Date(),
    horas = hoy.getHours(),
    minutos = hoy.getMinutes();

  minutos < 10
    ? (document.getElementById("hora").textContent = `${horas}:0${minutos}`)
    : (document.getElementById("hora").textContent = `${horas}:${minutos}`);
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
