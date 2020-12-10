// ==================================================================================================
//
//  Lo que queremos hacer es:
//
//    1 - Crear una interfaz en HTML simple con Bootstrap
//    2 - Vamos a editar algunos detalles con CSS
//    3 - Planteamos hacer una llamada a una api para que nos devuelva la info que queremos
//    4 - Los datos que nos devuelve la api, los vamos a formatear para que se vean bien
//    5 - Esos datos vamos a tener que ponerlos en el panel del usuario
//    6 - Vamos a darle funcionalidad a los botones de criptos
//    7 - Cuando toquemos los botones, volvemos a hacer la llamada a la api así actualizamos los datos
//
// ===================================================================================================

// =======================================================================================
// Setup Inicial -> Divisas y Cripto por defecto
// =======================================================================================

// Por ahora, nos interesan los precios en dólares y en pesos
const divisas = {
  dolares: "usd",
  pesos: "ars",
};

// Como opción de cripto activo inicial, usamos bitcoin
// Esto se va a usar en el botón actualizar más adelante...
let criptoActivo = "bitcoin"; // Por defecto

// ===================================================================================================
// Los botones indican qué cripto queremos buscar:
// ===================================================================================================
// Vamos a usar querySelectorAll, porque queremos juntar todos los botones de cripto
// El querySelectorAll, nos va a devolver un array de elementos html en este caso, los de BTC, ETH y DAI
const botonesCripto = document.querySelectorAll(".buscarPrecio"); // Ej: botonesCripto[0] nos trae el botón de BTC

const mostrarPreciosEnPanel = (event) => {
  // El 'event' tiene la propiedad 'data-id' que nos interesa
  // Lo vamos a sacar de cada botón, por ej el botón BTC tiene el data-id 'bitcoin'
  const cripto = event.target.dataset.id;

  // Vamos a setear globlamente el cripto que se encuentra activo
  // Sobre todo, lo vamos a usar para el botón 'Actualizar' más adelante
  criptoActivo = cripto;

  // Vamos a seleccionar el título del panel, y ponerle el nombre del cripto que elegimos con el botón
  document.getElementById("tituloCriptoDelPanel").textContent = cripto;

  // Los logos de los criptos están en la carpeta 'img'
  // Cada imagen tiene el mismo nombre del cripto que elegimos, así es más práctico cambiarla
  // Elegimos el elemento, y le vamos a cambiar el 'src':
  document.getElementById("criptoLogo").src = `./img/${cripto}.png`;

  // Ahora, vamos a buscar todos los botones, y los desactivamos visualmente
  // Incluso el nuestro
  deshabilitaVisualmenteTodosLosBotones();

  // Vamos a volver a activar visualmente este botón en particular
  // Le vamos a tener que pasar el 'event' de este botón para que funcione la activación
  habilitarVisualmenteEsteBoton(event);

  // Ahora si, pasamos la actualización importante...
  buscarPreciosEnAPI(cripto, divisas);
};

// Necesitamos recorrer el array de botones
// Y a cada botón, cuando le hagamos click,
// Le vamos a mandar la función que hace varias actualizaciones en el panel
botonesCripto.forEach((boton) => {
  boton.addEventListener("click", (event) => mostrarPreciosEnPanel(event));
});

const habilitarVisualmenteEsteBoton = (event) => {
  event.target.classList.remove("btn-outline-warning"); /////////////////// Sacamos el estilo inactivo
  event.target.classList.add("btn-warning"); ////////////////////////////// Le damos el estilo de activo
};

const deshabilitaVisualmenteTodosLosBotones = () => {
  botonesCripto.forEach(function (botonesNoActivos) {
    botonesNoActivos.classList.remove("btn-warning");
    botonesNoActivos.classList.add("btn-outline-warning");
  });
};

// ===================================================================================================
// Esta función es la principal, hace la búsqueda de criptos y conversión a divisas.
// Los argumentos son el nombre del cripto a buscar, y las divisas que queremos:
// ===================================================================================================

// Recibe la critomoneda a buscar y la lista de divisas a convertir
const buscarPreciosEnAPI = async (cripto, divisas) => {
  // Enviamos a la api el nombre de la criptomoneda "bitcoin" en el query "ids".
  // El último query "vs_currencies" le pedimos dólares y pesos como "usd" y "ars"
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cripto}&vs_currencies=${divisas.dolares},${divisas.pesos}`;

  // Hacemos la búsqueda
  try {
    // Con fetch, vamos a enviar la consulta a la url que definimos arriba
    fetch(url)
      // Necesitamos convertir esa respuesta a Json, así la podemos manipular:
      .then((datosEnBruto) => datosEnBruto.json())
      // Ahora si, vamos a desmenuzar el precio de ese Json...
      .then((precio) => {
        // El Json de precio viene como un objeto:
        //
        // bitcoin: {
        //    ars: 1527266,
        //    usd: 18703.22
        // }

        // Del objeto, separamos el valor de cripto a dólares:
        const criptoEnDolares = precio[cripto][divisas.dolares]; // Estamos pidiendo dinámicamente: precio.bitcoin.usd
        // Y también el valor del cripto en pesos:
        const criptoEnPesos = precio[cripto][divisas.pesos]; ////// Acá pedimos: precio.bitcoin.ars

        // El problema es que los datos vienen en bruto, por ej: 1534100
        // Nosotros vamos a usar la librería accountingJs para ver: $1.534.100
        const dolares = accounting.formatMoney(criptoEnDolares, "", 0, ".", ","); // 18905,22 -> $18.905
        const pesos = accounting.formatMoney(criptoEnPesos, "", 0, ".", ","); ////// 15031000 -> $1.503.100

        actualizarPanel(dolares, pesos); ////////////// Mandamos los precios
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
// Cuando hacemos click en el botón Actualizar
// =======================================================================================
document.getElementById("actualizar").addEventListener("click", () => {
  buscarPreciosEnAPI(criptoActivo, divisas); // Volvemos a ejecutar la búsqueda de precios
});

// =======================================================================================
// Queremos que la web cargue los datos por lo menos una vez.
// =======================================================================================
window.onload = () => {
  buscarPreciosEnAPI("bitcoin", divisas);
};

// =======================================================================================
// =======================================================================================
// =======================================================================================
// =======================================================================================
// =======================================================================================
// =======================================================================================
// =======================================================================================

// Funciones con explicación completa:

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
