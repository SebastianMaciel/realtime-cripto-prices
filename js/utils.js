// =======================================================================================
// Esta función es la principal, hace la búsqueda de criptos y conversión a divisas.
// Los argumentos son el nombre del cripto a buscar, y las divisas que queremos:
// =======================================================================================

let criptoActivo = "bitcoin"; // Por defecto

const actualizarPrecios = async (cripto, divisas) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cripto}&vs_currencies=${divisas.dolares},${divisas.pesos}`;

  try {
    fetch(url)
      .then((datosEnBruto) => datosEnBruto.json()) // Convertimos a Json
      .then((precio) => {
        const criptoEnDolares = precio[cripto][divisas.dolares]; // Valor en: precio.bitcoin.usd
        const criptoEnPesos = precio[cripto][divisas.pesos]; ////// Valor en: precio.bitcoin.ars

        const dolares = accounting.formatMoney(criptoEnDolares, "$", 0, ".", ","); // 18905,22 -> $18.905
        const pesos = accounting.formatMoney(criptoEnPesos, "$", 0, ".", ","); ////// 15031000 -> $1.503.100

        actualizarPanel(dolares, pesos); ////////////// Mandamos los precios
        actualizarConversor(cripto, dolares, pesos); // Seteamos el conversor
        actualizarHora(); ///////////////////////////// Actualizamos la hora
      });
  } catch (error) {
    console.log("Algo muuuuy malo sucedió..."); // Log de error
    console.log(`Error: ${error}`);
  }
};

// =======================================================================================
// Seleccionar los elementos en el HTML y mostrarlos al usuario:
// =======================================================================================
const actualizarPanel = (dolares, pesos) => {
  document.getElementById("usdEnPanel").textContent = dolares;
  document.getElementById("arsEnPanel").textContent = pesos;
};

// =======================================================================================
// Seleccionar los elementos en el HTML y mostrarlos al usuario:
// =======================================================================================
const actualizarConversor = (cripto, dolares, pesos) => {
  document.getElementById("criptoAPesos").textContent = `${cripto}`;
  document.getElementById("pesosACripto").textContent = `${cripto}`;
  document.getElementById("unidadConversion").textContent = `${cripto}:`;
};

// =======================================================================================
// Formateamos fecha y hora y los enviamos al usuario
// =======================================================================================
const actualizarHora = () => {
  const horas = new Date().getHours(); ////// Hora
  const minutos = new Date().getMinutes(); // Minutos

  minutos < 10 // Agregamos un cero cuando los minutos son del 0 al 9.
    ? (document.getElementById("horaActualizacion").textContent = `${horas}:0${minutos}`) // 12:3 -> 12:03
    : (document.getElementById("horaActualizacion").textContent = `${horas}:${minutos}`);
};

// =======================================================================================
// Queremos que la web cargue los datos por lo menos una vez.
// =======================================================================================
window.onload = () => {
  actualizarPrecios("bitcoin", divisas);
};

// =======================================================================================
// =======================================================================================
// =======================================================================================
// =======================================================================================
// =======================================================================================
// =======================================================================================
// =======================================================================================

// Función con explicación completa:

// Recibe la critomoneda a buscar y la lista de divisas a convertir
// const actualizarPrecios = async (cripto, divisas) => {
//   // Enviamos a la api el nombre de la criptomoneda "bitcoin" en el query "ids".
//   // El último query "vs_currencies" le pedimos dólares y pesos como "usd" y "ars"
//   const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cripto}&vs_currencies=${divisas.dolares},${divisas.pesos}`;

//   // Hacemos la búsqueda
//   try {
//     // Con fetch enviamos la url que definimos arriba
//     fetch(url)
//       // Necesitamos convertir esa respuesta a Json, así la podemos manipular:
//       .then((datosEnBruto) => datosEnBruto.json())
//       // Ahora si, ese Json lo vamos a desmenuzar...
//       .then((datosEnJSON) => {
//         // Desestructuramos todo lo que json contiene...
//         let precio = ({} = datosEnJSON);

//         // El Json viene como
//         //
//         // bitcoin: {
//         //    ars: 1527266,
//         //    usd: 18703.22
//         // }

//         // Del objeto, separamos el valor de bitcoin a dólares:
//         const bitcoinDolares = precio[cripto][divisas.dolares]; // Que es lo mismo que pedir precio.bitcoin.usd
//         // Y también el valor del bitcoin en pesos:
//         const bitcoinPesos = precio[cripto][divisas.pesos]; // Acá pedimos precio.bitcoin.ars

//         // El problema es que los datos vienen en bruto, por ej: 1534100
//         // Nosotros vamos a usar la librería accountingJs para ver: $1.534.100
//         const usd = accounting.formatMoney(bitcoinDolares, "$", 0, ".", ","); // Le decimos que queremos el símbolo $
//         const ars = accounting.formatMoney(bitcoinPesos, "$", 0, ".", ","); // Y que queremos los separadores de miles con un punto, sin decimales.

//         // Vamos a enviar esos valores ya formateados
//         // A la función que realmente se encarga de mostrarlos al usuario
//         mostrarPrecios(ars, usd);
//       });
//     // Por el momento, si algo salió mal, mostramos por consola el mensaje...
//     // Se puede enviar un alert, un modal, o algo similar para avisar al usuario.
//   } catch (error) {
//     console.log("Algo muuuuy malo sucedió...");
//   }
// };
