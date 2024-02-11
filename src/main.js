/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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
const blurBackground = document.querySelector("#blurBackground");
const closeButton = document.getElementById("closePopup");

const statistics = document.querySelector("#statistics-database");
const closeBox = document.querySelector(".closeHistogram");
const buttonStatistics = document.querySelector("#statics");

const actualizarTarjetas = (data) => {
  const $contenedorTarjetas = document.querySelector(".container-item");
  $contenedorTarjetas.remove();
  $contenedor.appendChild(renderItems(data));
};

$iconos.appendChild(renderBackground());
actualizarTarjetas(data);

$selection.addEventListener("input", (event) => {
  const selectedGeneration = event.target.value;
  const filteredData = orderGeneration(selectedGeneration);

  actualizarTarjetas(filteredData);
});
$selecType.addEventListener("input", (event) => {
  const selectedType = event.target.value;
  const filteredDataByType = orderType(selectedType);

  actualizarTarjetas(filteredDataByType);
});

function showPopup() {
  blurBackground.style.display = "block";
  document.body.style.overflow = "hidden";
  popup.style.display = "block";
}

function hidePopup() {
  blurBackground.style.display = "none";
  document.body.style.overflow = "auto";
  popup.style.display = "none";
}

closeButton.addEventListener("click", hidePopup);

function calcularSumaGeneraciones(arreglo) {
  const sumaPorGeneracion = {};

  arreglo.forEach((item) => {
    const { PrecioDeLanzamiento, generation } = item;

    const generacionNormalizada = generation.toLowerCase().replace(/\s+/g, "");

    if (sumaPorGeneracion[generacionNormalizada]) {
      sumaPorGeneracion[generacionNormalizada] += PrecioDeLanzamiento;
    } else {
      sumaPorGeneracion[generacionNormalizada] = PrecioDeLanzamiento;
    }
  });

  return sumaPorGeneracion;
}

function getInfoToFilters() {
  const cardsInformation = Array.from(document.querySelectorAll(`.card-back`));
  console.log(cardsInformation);
  const data = cardsInformation.map(function (card) {
    return {
      PrecioDeLanzamiento: parseInt(
        card
          .querySelector(`[itemprop="PrecioDeLanzamiento"]`)
          .textContent.split(".")[0]
          .replace(/\D/g, "")
      ),
      generation: card.querySelector(`[itemprop="generation"]`).textContent,
    };
  });
  console.log(data);
  const sumaGeneraciones = calcularSumaGeneraciones(data);
  console.log(sumaGeneraciones);
  return sumaGeneraciones;
}
let histograma;
function showStatistics() {
  blurBackground.style.display = "block";
  /* document.body.style.overflow='hidden'; */
  statistics.style.display = "block";
  const ctx = document.getElementById("histograma").getContext("2d");
  const generationPrice = getInfoToFilters();
  histograma = new Chart(ctx, {
    type: "polarArea",
    data: {
      labels: Object.keys(generationPrice),
      datasets: [
        {
          label: "Mayor Precio de Consola de cada Generación",
          data: Object.values(generationPrice),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      width: 400, // Establece el ancho del canvas
      height: 300, // Establece la altura del canvas
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function hideStatistics() {
  histograma.destroy();
  blurBackground.style.display = "none";
  /* document.body.style.overflow='auto'; */
  statistics.style.display = "none";
}
buttonStatistics.addEventListener("click", showStatistics);
closeBox.addEventListener("click", hideStatistics);

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
    actualizarTarjetas(filteredData);
  } else {
    showPopup();
  }
});
