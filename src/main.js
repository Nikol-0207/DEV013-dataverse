import { orderType, orderGeneration } from "./dataFunctions.js";
import { renderItems, renderBackground } from "./view.js";

import data from "./data/dataset.js";

//console.log("aqui main" + example, renderItems(data), data);
const $selecType = document.querySelector('[name="type-order"]'); //selector por tipo
const $selection = document.querySelector("#mySelect");
//const $ordAlpha = document.querySelector('#ordenar');
const $iconos = document.querySelector("#iconos");
const $buscador = document.querySelector("#buscador");
const $botonBuscar = document.querySelector("#searchName");
const $contenedor = document.querySelector("#root");

const popup = document.getElementById("popup");
const blurBackground = document.querySelector('#blurBackground');
const closeButton = document.getElementById("closePopup");

const actualizarTarjetas = (data) => {
  const $contenedorTarjetas = document.querySelector(".container-item");
  $contenedorTarjetas.remove();
  $contenedor.appendChild(renderItems(data));
};

$iconos.appendChild(renderBackground())
actualizarTarjetas(data);

// Filtrar por generación
$selection.addEventListener("input", (event) => {
  const selectedGeneration = event.target.value;
  const filteredData = orderGeneration(selectedGeneration);

  actualizarTarjetas(filteredData);
});
// Filtrar por tipo
$selecType.addEventListener("input", (event) => {
  const selectedType = event.target.value;
  const filteredDataByType = orderType(selectedType);

  actualizarTarjetas(filteredDataByType);
});
//ventana emergente

// Función para mostrar la ventana emergente
function showPopup() {
  blurBackground.style.display = 'block';
  document.body.style.overflow='hidden';
  popup.style.display = "block";
}

// Función para ocultar la ventana emergente
function hidePopup() {
  blurBackground.style.display = 'none';
  document.body.style.overflow = 'auto';
  popup.style.display = "none";
}

// Asignar evento de click al botón de cerrar
closeButton.addEventListener("click", hidePopup);
// Filtrar por nombre

$botonBuscar.addEventListener("click", () => {
  // Obtén el valor del input
  const searchTerm = $buscador.value.toLowerCase(); // convierte a minúsculas para ser insensible a mayúsculas/minúsculas

  // Filtra los elementos que contienen el término de búsqueda en el nombre
  const filteredData = data.filter((item) =>
    item.name.replaceAll(" ", "").toLowerCase().includes(searchTerm.replaceAll(" ", "").toLowerCase())
  );

  if (filteredData.length > 0) {
    actualizarTarjetas(filteredData);
  } else {
    showPopup();
  }
});
