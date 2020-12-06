const inputUsuario = document.querySelector("#precioUsuario");
const resultadoUsuario = document.getElementById("resultadoConversion");

inputUsuario.addEventListener("keyup", conversion);

function conversion(e) {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=ars`;
  try {
    fetch(url)
      .then((datosEnBruto) => datosEnBruto.json()) // Convertimos a Json
      .then((valor) => {
        const unidadBase = Number(valor.dai.ars.toFixed(0));

        const aMultiplicaPorPesos = document.getElementById("arsEnPanel").textContent;

        const totalConversion = Number(e.target.value) * Number(aMultiplicaPorPesos);

        console.log(totalConversion);

        resultadoUsuario.textContent = totalConversion;
        // const criptoEnDolares = precio[cripto][divisas.dolares]; // Valor en: precio.bitcoin.usd
        // const criptoEnPesos = precio[cripto][divisas.pesos]; ////// Valor en: precio.bitcoin.ars
      });
  } catch (error) {}
}
