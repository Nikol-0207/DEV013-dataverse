/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {
  orderType,
  orderGeneration,
  computeStats,
  showPopup,
  hidePopup,
  calcularSumaGeneraciones,
  getInfoToFilters,
  hideStatistics,
  showStatistics,
  actualizarTarjetas,
} from "./dataFunctions.js";
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
  const selectedGeneration = event.target.value;
  const filteredData = orderGeneration(selectedGeneration);

  actualizarTarjetas(filteredData, $contenedor);
});
$selecType.addEventListener("input", (event) => {
  const selectedType = event.target.value;
  const filteredDataByType = orderType(selectedType);

  actualizarTarjetas(filteredDataByType, $contenedor);
});

closeButton.addEventListener("click", () => hidePopup(blurBackground, statistics));

buttonStatistics.addEventListener("click", () => showStatistics(blurBackground, statistics));
closeBox.addEventListener("click", () => hideStatistics(blurBackground, statistics));

// Crear el histograma con Chart.js

// Filtrar por nombre

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
    actualizarTarjetas(filteredData, $contenedor);
  } else {
    showPopup();
  }
});

$botonReset.addEventListener("click", () => actualizarTarjetas(data, $contenedor));

