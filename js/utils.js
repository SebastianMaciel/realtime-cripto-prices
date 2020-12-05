// Esta función toma la hora y los minutos actuales yos formatea para que se vean bien,
// Seleccionamos los elementos en el HTML así los mostramos al usuario:
const actualizarHora = () => {
  const hoy = new Date(), // Tomamos el día de hoy.
    horas = hoy.getHours(), // Separamos la hora actual,
    minutos = hoy.getMinutes(); // y los minutos

  // Pequeño condicional, para mostrar un cero cuando los minutos son del 0 al 9.
  minutos < 10
    ? (document.getElementById("hora").textContent = `${horas}:0${minutos}`) // Acá mostramos por ejemplo 12:03 en vez de 12:3
    : (document.getElementById("hora").textContent = `${horas}:${minutos}`); // Acá los valores son de 10 hasta 59 así que se muestran bien
};

// Esta función es la principal, hace la búsqueda de criptos y conversión a divisas.
// Apunta a que mañana pueda ser utilizada para buscar otras criptos.

// Recibe la critomoneda a buscar y la lista de divisas a convertir
const actualizarPrecios = async (nombreCripto, divisas) => {
  // Enviamos a la api el nombre de la criptomoneda "bitcoin" en el query "ids".
  // El último query "vs_currencies" le pedimos dólares y pesos como "usd" y "ars"
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${nombreCripto}&vs_currencies=${divisas.dolares},${divisas.pesos}`;

  // Hacemos la búsqueda
  try {
    // Con fetch enviamos la url que definimos arriba
    fetch(url)
      // Necesitamos convertir esa respuesta a Json, así la podemos manipular:
      .then((datosEnBruto) => datosEnBruto.json())
      // Ahora si, ese Json lo vamos a desmenuzar...
      .then((datosEnJSON) => {
        // Desestructuramos todo lo que json contiene...
        let precio = ({} = datosEnJSON);

        // El Json viene como
        //
        // bitcoin: {
        //    ars: 1527266,
        //    usd: 18703.22
        // }

        // Del objeto, separamos el valor de bitcoin a dólares:
        const bitcoinDolares = precio[nombreCripto][divisas.dolares]; // Que es lo mismo que pedir precio.bitcoin.usd
        // Y también el valor del bitcoin en pesos:
        const bitcoinPesos = precio[nombreCripto][divisas.pesos]; // Acá pedimos precio.bitcoin.ars

        // El problema es que los datos vienen en bruto, por ej: 1534100
        // Nosotros vamos a usar la librería accountingJs para ver: $1.534.100
        const usd = accounting.formatMoney(bitcoinDolares, "$", 0, ".", ","); // Le decimos que queremos el símbolo $
        const ars = accounting.formatMoney(bitcoinPesos, "$", 0, ".", ","); // Y que queremos los separadores de miles con un punto, sin decimales.

        // Vamos a enviar esos valores ya formateados
        // A la función que realmente se encarga de mostrarlos al usuario
        mostrarPrecios(ars, usd);
      });
    // Por el momento, si algo salió mal, mostramos por consola el mensaje...
    // Se puede enviar un alert, un modal, o algo similar para avisar al usuario.
  } catch (error) {
    console.log("Algo muuuuy malo sucedió...");
  }
};

// Acá vamos a tomar los precios en dólares y pesos,
// Seleccionar los elementos en el HTML y mostrarlos al usuario:
const mostrarPrecios = (ars, usd) => {
  document.getElementById("ars").textContent = ars;
  document.getElementById("usd").textContent = usd;
};

const actualizarHoraYPrecios = () => {
  // Cuando inicia la página, actualizamos la hora actual:
  actualizarHora();
  // Mostramos por primera vez los precios, o cada vez que se refrezca la web:
  actualizarPrecios(nombreCripto, divisas);
};
