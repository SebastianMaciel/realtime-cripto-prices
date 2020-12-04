// Cripto a buscar
const nombreCripto = "bitcoin";

// Lista de monedas
const moneda = {
  dolares: "usd",
  pesos: "ars",
};

// Esta función simplifica la búsqueda de criptos y conversión a divisas.
// Apunta a que mañana pueda ser utilizada para buscar otros datos
const buscarPrecios = (cripto, moneda) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cripto}&vs_currencies=${moneda}`;

  fetch(url)
    .then((datosEnBruto) => datosEnBruto.json())
    .then((datosJSON) => {
      // Desestructuramos todo el json que vino de la api
      let precio = ({} = datosJSON);

      const numeros = precio[cripto][moneda];

      console.log(numeros);
    });
};

buscarPrecios(nombreCripto, moneda.dolares);
buscarPrecios(nombreCripto, moneda.pesos);
