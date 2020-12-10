const inputUsuario = document.querySelector("#precioUsuario");
const resultadoUsuario = document.getElementById("resultadoConversion");

const monedas = {
  dolares: "usd",
  pesos: "ars",
};

inputUsuario.addEventListener("onChange", conversion("bitcoin", monedas));

function conversion(cripto, monedas) {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cripto}&vs_currencies=${monedas.dolares},${monedas.pesos}`;

  console.log("ok");

  try {
    fetch(url)
      .then((datosEnBruto) => datosEnBruto.json()) // Convertimos a Json
      .then((precio) => {
        const criptoEnDolares = precio[cripto][monedas.dolares]; // Valor en: precio.bitcoin.usd
        const criptoEnPesos = precio[cripto][monedas.pesos]; ////// Valor en: precio.bitcoin.ars

        // Conversión:
        let result = inputUsuario.value * criptoEnDolares;

        console.log(inputUsuario.value);
        // const unidadBase = Number(valor.dai.ars.toFixed(0));
        // const aMultiplicaPorPesos = document.getElementById("arsEnPanel").textContent;
        // const totalConversion = Number(e.target.value) * Number(aMultiplicaPorPesos);
        // resultadoUsuario.textContent = totalConversion;
        // const criptoEnDolares = precio[cripto][divisas.dolares]; // Valor en: precio.bitcoin.usd
        // const criptoEnPesos = precio[cripto][divisas.pesos]; ////// Valor en: precio.bitcoin.ars
      });
  } catch (error) {}
}
