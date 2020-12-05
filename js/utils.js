// Esta función toma la hora y los minutos actuales,
// Los formateamos para que se vean bien,
// Seleccionamos los elementos a actualizar en el HTML
// Y les damos el valor de la hora actual.
const actualizarHora = () => {
  // Creamos una nueva fecha, a día de hoy
  const hoy = new Date(),
    // Tomamos la hora actual,
    horas = hoy.getHours(),
    // Y tomamos los minutos
    minutos = hoy.getMinutes();

  // Pequeño condicional, para mostrar un cero cuando los minutos son del 0 al 9.
  minutos < 10
    ? (document.getElementById("hora").textContent = `${horas}:0${minutos}`) // Acá mostramos por ejemplo 12:03 en vez de 12:3
    : (document.getElementById("hora").textContent = `${horas}:${minutos}`); // Acá los valores son de 10 hasta 59 así que se muestran bien
};

// Esta función es la principal,
// Simplifica y clarifica la búsqueda de criptos y conversión a divisas.
// Apunta a que mañana pueda ser utilizada para buscar otros datos
//
// Le pasamos el nombre de la critomoneda a buscar y la lista de divisas a convertir
const actualizarPrecios = async (nombreCripto, divisas) => {
  // La api acepta uno o varios nombres de criptomonedas, en nuestro caso enviamos en el query "ids" el valor "bitcoin"
  // Por otro lado, nos interesa el precio en dolares y en precios, por lo que en "vs_currencies" enviamos "usd" y "ars"
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${nombreCripto}&vs_currencies=${divisas.dolares},${divisas.pesos}`;

  // Vamos a probar buscar datos con try catch
  try {
    // Con fetch enviamos la url que definimos arriba
    fetch(url)
      // Necesitamos convertir esa respuesta a Json, así la podemos manipular:
      .then((datosEnBruto) => datosEnBruto.json())
      // Ahora si, ese Json lo vamos a desmenuzar...
      .then((datosEnJSON) => {
        // Desestructuramos todo lo que json contiene...
        let precio = ({} = datosEnJSON);

        // Del objeto, separamos el valor de bitcoin a dólares:
        const bitcoinDolares = precio[nombreCripto][divisas.dolares];
        // Y también el valor del bitcoin en pesos:
        const bitcoinPesos = precio[nombreCripto][divisas.pesos];

        // El problema es que los datos vienen en bruto, por ej: 1534100
        // Nosotros vamos a usar la librería accountingJs para ver: $1.534.100
        const usd = accounting.formatMoney(bitcoinDolares, "$", 0, ".", ","); // Le decimos que queremos el símbolo $
        const ars = accounting.formatMoney(bitcoinPesos, "$", 0, ".", ","); // Y que queremos los separadores de miles con un punto

        // Vamos a enviar esos valores ya formateados bien
        // A una función que realmente se encarga de mostrarlos al usuario
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
