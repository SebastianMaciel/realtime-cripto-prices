// Configuramos la hora y el minuto de actualización:
const actualizarHora = () => {
  const hoy = new Date(),
    horas = hoy.getHours(),
    minutos = hoy.getMinutes();

  minutos < 10
    ? (document.getElementById("hora").textContent = `${horas}:0${minutos}`)
    : (document.getElementById("hora").textContent = `${horas}:${minutos}`);
};
