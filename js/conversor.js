const inputUsuario = document.querySelector("#precioUsuario");
const resultadoUsuario = document.getElementById("resultadoConversion");

inputUsuario.addEventListener("keyup", conversion);

function conversion(e) {
  resultadoUsuario.textContent = e.target.value;
}
