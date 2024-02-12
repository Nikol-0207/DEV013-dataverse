/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { filterBy, sortBy} from "./dataFunctions.js";
import { renderItems, renderBackground } from "./view.js";

import data from "./data/dataset.js";

let currentData = data;  //variable global para guardar los cambios de la data y se guarde cuando halla cambios en filtros y pueda ordenar por ese
// Obtener el nombre del selector en forma de cadena
const $selecType = document.querySelector('[name="type-order"]');
const $selection = document.querySelector("#mySelect");
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

const actualizarTarjetas = (dataToShow) => {
  const $contenedorTarjetas = document.querySelector(".container-item");
  $contenedorTarjetas.remove();
  $contenedor.appendChild(renderItems(dataToShow));
};

$iconos.appendChild(renderBackground());
actualizarTarjetas(data);

$selection.addEventListener("input", (event) => {
  const selectorName = document.querySelector('#mySelect').getAttribute('name');
  const selectedGeneration = event.target.value;
  const filtered = filterBy(data,selectorName,selectedGeneration);
  currentData=filtered;
  actualizarTarjetas(filtered);
});
$selecType.addEventListener("input", (event) => {
  const selectorName = document.querySelector('#type').getAttribute('name');
  const selectedType = event.target.value;
  const filtered = filterBy(data,selectorName,selectedType);
  currentData=filtered;
  actualizarTarjetas(filtered);
});
//ordenamiento
const $ordenarSelect = document.querySelector("#ordenar");

$ordenarSelect.addEventListener("change", () => {
  const selectedOption = $ordenarSelect.value;
  const datosOrdenados= sortBy(currentData,selectedOption);
  currentData=datosOrdenados;

  actualizarTarjetas(datosOrdenados);
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

  const sumaGeneraciones = calcularSumaGeneraciones(data);

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
// Filtrar por nombre
const selectorName = document.querySelector('#buscador').getAttribute('name');
$botonBuscar.addEventListener("click", () => {

  const searchTerm = $buscador.value.toLowerCase(); // convierte a minúsculas para ser insensible a mayúsculas/minúsculas

  // Filtra los elementos que contienen el término de búsqueda en el nombre
  const filteredData = filterBy(data,selectorName,searchTerm);
  if (filteredData.length > 0) {
    actualizarTarjetas(filteredData);
  } else {
    showPopup();
  }
});
