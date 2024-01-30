import { example } from "./dataFunctions.js";
import { renderItems, renderBackground } from "./view.js";

import data from "./data/dataset.js";

console.log("aqui main" + example, renderItems(data), data);

const $selection = document.getElementById("mySelect");
const $iconos = document.getElementById("iconos");
//const searchName = document.getElementById('searchName');
const $buscador = document.getElementById("buscador");
const $botonBuscar = document.getElementById("searchName");
const $contenedor = document.getElementById("root");

const actualizarTarjetas = (data) => {
  const $contenedorTarjetas = document.querySelector(".ul");
  $contenedorTarjetas.remove();
  $contenedor.appendChild(renderItems(data));
};

$iconos.appendChild(renderBackground())


actualizarTarjetas(data);

// Filtrar por generación
$selection.addEventListener("input", (event) => {
  const selectedGeneration = event.target.value;

  const filteredData = data.filter(
    (item) => item.numberGeneration === parseInt(selectedGeneration)
  );

  actualizarTarjetas(filteredData);
});

// Filtrar por nombre
// Añade un event listener al botón
$botonBuscar.addEventListener("click", () => {
  // Obtén el valor del input
  const searchTerm = $buscador.value.toLowerCase(); // convierte a minúsculas para ser insensible a mayúsculas/minúsculas

  // Filtra los elementos que contienen el término de búsqueda en el nombre
  const filteredData = data.filter((item) =>
    item.name
      .replaceAll(" ", "")
      .toLowerCase()
      .includes(searchTerm.replaceAll(" ", "").toLowerCase())
  );

  if (filteredData.length > 0) {
    actualizarTarjetas(filteredData);
  } else {
    alert("No se econtraron registros");
  }
});
