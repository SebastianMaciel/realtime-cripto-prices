// Configuramos la hora y el minuto de actualización:
const actualizarHora = () => {
  const hoy = new Date(),
    horas = hoy.getHours(),
    minutos = hoy.getMinutes();

  document.getElementById("hora").textContent = `${horas}:${minutos}`;
};
