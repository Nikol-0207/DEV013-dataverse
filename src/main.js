/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  orderType,
  computeStats,
  showPopup,
  hidePopup,
  calcularSumaGeneraciones,
  getInfoToFilters,
  hideStatistics,
  showStatistics,
  actualizarTarjetas,
  filterBy,
  sortBy,
} from "./dataFunctions.js";

import { renderItems, renderBackground } from "./view.js";

import data from "./data/dataset.js";

let currentData = data; //variable global para guardar los cambios de la data y se guarde cuando halla cambios en filtros y pueda ordenar por ese
// Obtener el nombre del selector en forma de cadena
const $selecType = document.querySelector('[name="type-order"]');
const $selection = document.querySelector("#mySelect");
const $iconos = document.querySelector("#iconos");
const $buscador = document.querySelector("#buscador");
const $botonBuscar = document.querySelector("#searchName");
const $contenedor = document.querySelector("#root");
const $botonReset = document.querySelector("#reset");

const popup = document.getElementById("popup");
const blurBackground = document.querySelector("#blurBackground");
const closeButton = document.getElementById("closePopup");

const statistics = document.querySelector("#statistics-database");
const closeBox = document.querySelector(".closeHistogram");
const buttonStatistics = document.querySelector("#statics");

$iconos.appendChild(renderBackground());
actualizarTarjetas(data, $contenedor);

$selection.addEventListener("change", (event) => {
  const selectorName = document.querySelector("#mySelect").getAttribute("name");
  const selectedGeneration = event.target.value;
  const filtered = filterBy(data, selectorName, selectedGeneration);
  currentData = filtered;
  actualizarTarjetas(filtered, $contenedor);
});

$selecType.addEventListener("input", (event) => {
  const selectorName = document.querySelector("#type").getAttribute("name");
  const selectedType = event.target.value;
  const filtered = filterBy(data, selectorName, selectedType);
  currentData = filtered;
  actualizarTarjetas(filtered, $contenedor);
});

const $ordenarSelect = document.querySelector("#ordenar");

$ordenarSelect.addEventListener("change", () => {
  const selectedOption = $ordenarSelect.value;
  const datosOrdenados = sortBy(currentData, selectedOption);

  actualizarTarjetas(datosOrdenados, $contenedor);
});

closeButton.addEventListener("click", () =>
  hidePopup(blurBackground, popup)
);

buttonStatistics.addEventListener("click", () =>
  showStatistics(blurBackground, statistics)
);
closeBox.addEventListener("click", () =>
  hideStatistics(blurBackground, statistics)
);

// Crear el histograma con Chart.js

// Filtrar por nombre
const selectorName = document.querySelector("#buscador").getAttribute("name");
$botonBuscar.addEventListener("click", () => {
  const searchTerm = $buscador.value.toLowerCase(); // convierte a minúsculas para ser insensible a mayúsculas/minúsculas

  
  // Filtra los elementos que contienen el término de búsqueda en el nombre
  const filteredData = filterBy(data, selectorName, searchTerm);
  if (filteredData.length > 0) {
    actualizarTarjetas(filteredData, $contenedor);
  } else {
    showPopup(blurBackground, popup);
  }
});

$botonReset.addEventListener("click", () => {
  actualizarTarjetas(data, $contenedor);
  $buscador.value = "";
});
