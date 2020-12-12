// ================================================================================================================
//
//  Lo que queremos hacer es:
//
//    1 - Creamos una interfaz en HTML simple con Bootstrap
//    2 - Vamos a editar algunos detalles con CSS
//    3 - En el HTML, vamos a marcar algunos elementos para actualizarlos desde este index.js
//    4 - Le damos acciones a Los botones de cripto, primero actualizamos algunos textos según el botón
//    5 - Esos botones van a llamar a la api para que nos devuelva info
//    6 - Vamos a preconfigurar algunas variables así se nos facilita enviar a la api
//    7 - Vamos a tener un botón de actualizar para volver a pedir precios según qué botón de cripto tenemos activo
//    8 - En cada acción, vamos a incluir una función para actualizar la hora
//    9 - Último, nos vamos a asegurar de que los precios se muestren desde que se carga la app
//
//  Tenemos que tener en cuenta que:
//
//    - Los precios que nos devuelva la api, los vamos a formatear para que se vean bien con la librería AccountingJS
//    - La hora en Vanilla Javascript no es ideal, por lo que hay un mínimo reformateo para los minutos
//
// ================================================================================================================

// ===================================================================================================
// Setup Inicial -> Divisas y Cripto por defecto
// Por el momento: Bitcoin en dólares y pesos.
// ===================================================================================================

// Por ahora, nos interesan los precios en dólares y en pesos.
// Creamos este objeto con los valores ya configurados, que van a ser usados en la función que busca precios más adelante:
const divisas = {
  dolares: "usd", // El formato 'usd' es el que realmente se va a usar en la llamada a la API.
  pesos: "ars", //// Le vamos a llamar 'dolares' o 'pesos', así se nos hace más intuitivo saber qué es.
};

// Como opción de cripto activo inicial, usamos bitcoin.
// Esto se va a usar principalmente para el botón actualizar más adelante:
let criptoActivo = "bitcoin"; // Por defecto

// ===================================================================================================
// Comienzo de la aplicación
// ===================================================================================================

// ===================================================================================================
// Los botones indican qué cripto queremos buscar:
// ===================================================================================================
// Vamos a usar querySelectorAll, porque queremos listar todos los botones de cripto.
// El querySelectorAll, nos va a devolver un array de elementos html en este caso, los de BTC, ETH y DAI:
const botonesCripto = document.querySelectorAll(".buscarPrecio"); // Ej: botonesCripto[0] nos trae el botón de BTC.

// ===================================================================================================
// Le vamos a dar acciones a todos los botones de cripto
// ===================================================================================================
// Necesitamos recorrer el array de botones
// y a cada botón, cuando le hagamos click
// le vamos a mandar la función que hace varias actualizaciones en el panel.
// Y sobre todo, va a enviar información a la API para la búsqueda real:
// ===================================================================================================
botonesCripto.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    // El 'event' tiene la propiedad 'data-id' que nos interesa
    // Lo vamos a sacar de cada botón del HTML, por ej, el botón BTC tiene el data-id 'bitcoin'.
    // Podemos hacer un console.log(cripto), para saber qué estamos guardando en esa variable
    const cripto = event.target.dataset.id;
    //console.log(cripto);

    // Vamos a hacerle saber a la app globlamente el cripto que se encuentra activo.
    // Sobre todo, lo vamos a usar para el botón 'Actualizar' más adelante:
    criptoActivo = cripto;

    // Vamos a seleccionar el título del panel, y ponerle el nombre del cripto que elegimos con el botón:
    document.getElementById("tituloCriptoDelPanel").textContent = cripto;

    // Los logos de los criptos están en la carpeta 'img'.
    // Cada imagen tiene el mismo nombre del cripto que elegimos, así es más práctico cambiarla.
    // Elegimos el elemento, y le vamos a cambiar el 'src':
    document.getElementById("criptoLogo").src = `./img/${cripto}.png`; // Ej: "./img/bitcoin.png".

    // Ahora, vamos a buscar todos los botones, y los desactivamos visualmente,
    // incluso el nuestro (después lo habilitamos en las siguientes líneas).
    botonesCripto.forEach((boton) => {
      boton.classList.remove("btn-warning"); /////// Sacamos el estilo de activo.
      boton.classList.add("btn-outline-warning"); // Ponemos el estilo de inactivo.
    });

    // Vamos a seleccionar las clases de este botón en particular:
    const botonActual = event.target;
    // Y como arriba, vamos a modificar su estilo así aparece como activo:
    botonActual.classList.remove("btn-outline-warning"); // Sacamos el estilo inactivo.
    botonActual.classList.add("btn-warning"); ///////////// Le damos el estilo de activo.

    // Vamos a enviar en la siguiente función los valores del cripto que nos interesa y la lista de divisas
    // La explicación completa se encuentra comentada en esa función:
    buscarPreciosEnAPI(cripto, divisas);
  });
});

// ===================================================================================================
// Esta función es la principal, hace la búsqueda de criptos y conversión a divisas.
// Los argumentos son el nombre del cripto a buscar, y las divisas que queremos:
// ===================================================================================================

// Cuando hacemos clic en algún botón de cripto, por ej: BTC,
// vamos a ejecutar esta función, la cual va a recibir 'bitcoin' como valor de cripto,
// y la lista de divisas que nos interesa para la consulta:
const buscarPreciosEnAPI = async (cripto, divisas) => {
  // Enviamos a la api el nombre de la criptomoneda "bitcoin" en el query "ids".
  // El último query "vs_currencies" le pedimos dólares y pesos como "usd" y "ars".
  // Nota: podemos pedir varias criptos y varias divisas, todo separado por comas, por ej: ids=bitcoin,ethereum y vs_currencies=usd,eur
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${cripto}&vs_currencies=${divisas.dolares},${divisas.pesos}`;

  // Usamos el bloque try/catch,
  // para búsqueda asincrónica y manejo de errores:
  try {
    // Con fetch, vamos a enviar la consulta a la url que definimos arriba:
    await fetch(url)
      // Necesitamos convertir esa respuesta a Json, así la podemos manipular:
      .then((datosEnBruto) => datosEnBruto.json())
      // Ahora si, vamos a desmenuzar el precio de ese Json...
      .then((precio) => {
        // 'precio' va a tener dentro un objeto:
        //
        // bitcoin: {
        //    ars: 1527266,
        //    usd: 18703.22
        // }
        //
        //  Vamos a pedir el valor que nos interese así: precio.bitcoin.usd

        // Para las siguientes líneas, supongamos que 'cripto' tiene el valor 'bitcoin' que enviamos desde el botón,
        // y recordemos que 'divisas' es un objeto que ya definimos en el setup inicial, por lo que 'divisas.dolares' es igual a 'usd'.

        // Del objeto 'precio', le pedimos el valor de cripto en dólares:
        const dolaresDesdeLaApi = precio[cripto][divisas.dolares]; // Estamos pidiendo dinámicamente: precio.bitcoin.usd
        // Y también el valor del cripto en pesos:
        const pesosDesdeLaApi = precio[cripto][divisas.pesos]; ////// Acá pedimos: precio.bitcoin.ars

        // El problema es que los datos vienen en bruto, por ej: 1534100
        // Nosotros vamos a usar la librería accountingJs para ver: 1.534.100
        const dolares = accounting.formatMoney(dolaresDesdeLaApi, "", 0, ".", ","); // 18905,22 -> 18.905
        const pesos = accounting.formatMoney(pesosDesdeLaApi, "", 0, ".", ","); ////// 15031000 -> 1.503.10
        // Argumentos de la librería: ( precio, símbolo de precio, cuántos decimales, divisor de miles, divisor de decimales )

        // Ya teniendo los precios, vamos a actualizar los elementos del panel.
        // Seleccionamos los elementos del HTML y le cambiamos el contenido:
        document.getElementById("usdEnPanel").textContent = dolares;
        document.getElementById("arsEnPanel").textContent = pesos;

        // Vamos a actualizar la hora en que obtubimos los precios:
        actualizarHora();
      });
  } catch (error) {
    // Si algo malo pasa, como que no se encuentre disponible la información desde la API,
    // vamos a avisar al usuario que no se pudo actualizar, en la parte de última hora de actualización:
    document.getElementById("horaActualizacion").textContent = "No se pudo actualizar...";
    // Logueamos por consola el error para información extra que pueda ayudarnos:
    console.log(`Error: ${error}`);
  }
};

// =======================================================================================
// Formateamos fecha y hora y los enviamos al usuario
// =======================================================================================
// Hacemos esta función por separado,
// Porque la usamos con los botones de cripto, y con el botón actualizar.
// =======================================================================================
const actualizarHora = () => {
  // Vamos a tomar la hora y minutos de la fecha actual:
  const horas = new Date().getHours(); ////// Hora
  const minutos = new Date().getMinutes(); // Minutos

  // Este condicional es necesario para arreglar cómo se muestran los minutos.
  // Hacemos que a los minutos del 0 al 9, se les anteponga el '0' así queda por ej '12:07' en vez de '12:7'.
  // Básicamente: Si los minutos son menores a 10, al template string agregale el '0', si no, mandamos los minutos tal cual.
  const horaFormateada = minutos < 10 ? `${horas}:0${minutos}` : `${horas}:${minutos}`;

  // Finalmente, elegimos el elemento del HTML y enviamos la hora bien formateada
  document.getElementById("horaActualizacion").textContent = `Actualizado a las ${horaFormateada}`;
};

// =======================================================================================
// Cuando hacemos click en el botón Actualizar...
// =======================================================================================
// Vamos a tener en cuenta que criptoActivo por default es 'bitcoin'
// Ese valor va a cambiar cuando hagamos clic en algún botón de cripto
// =======================================================================================
document.getElementById("actualizar").addEventListener("click", () => {
  // Volvemos a ejecutar la búsqueda de precios
  buscarPreciosEnAPI(criptoActivo, divisas);
});

// =======================================================================================
// Nos seguramos que la web muestre los precios por lo menos una vez:
// =======================================================================================
window.onload = () => {
  buscarPreciosEnAPI(criptoActivo, divisas);
};

// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
//
//  Próximas funcionalidades:
//
//    - Agregar o eliminar dinámicamente qué criptos queremos tener disponibles para consulta
//        · La función de la api ya está preparada para esto, tenemos que crear otra función así agregamos más botones
//
//    - Poder ver precio según Dólar Blue
//        · Necesitamos otra api, o posiblemente implementar web scraping en dolarhoy.com para contar con ese valor
//
//    - Diseñar un conversor de precios cripto a pesos y viceversa.
//        · Nivel de dificultad más avanzado, pero totalmente diseñable
//
// ================================================================================================================
// ================================================================================================================
// ================================================================================================================
