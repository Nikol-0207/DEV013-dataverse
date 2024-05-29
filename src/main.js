/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {filterData,sortData,computeStats} from "./dataFunctions.js";

import { renderItems, renderBackground } from "./view.js";

import data from "./data/dataset.js";

let currentData = data; //variable global para guardar los cambios de la data y se guarde cuando halla cambios en filtros y pueda ordenar por ese

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
//actualizar data
const actualizarTarjetas = (dataToShow) => {
  const $contenedorTarjetas = document.querySelector(".container-item");
  $contenedorTarjetas.remove();
  $contenedor.appendChild(renderItems(dataToShow));
};
$iconos.appendChild(renderBackground());
actualizarTarjetas(data);

$selection.addEventListener("change", (event) => {
  const selectorName = document.querySelector("#mySelect").getAttribute("name");
  const selectedGeneration = event.target.value;
  const filtered = filterData(data, selectorName, selectedGeneration);
  currentData = filtered;
  actualizarTarjetas(filtered);
});

$selecType.addEventListener("input", (event) => {
  const selectorName = document.querySelector("#type").getAttribute("name"); //consigo en String devulva el nombre del elemento
  const selectedType = event.target.value;
  const filtered = filterData(data, selectorName, selectedType);
  currentData = filtered;  //se guarda en esta variable globl para ver la actual data
  actualizarTarjetas(filtered);
});

const $ordenarSelect = document.querySelector("#ordenar");
$ordenarSelect.addEventListener("change", () => {
  const selectedOption = $ordenarSelect.value;
  const datosOrdenados = sortData(currentData,"name", selectedOption);

  actualizarTarjetas(datosOrdenados);
});
function showPopup() {
  blurBackground.style.display = "block"; //bloquea que tenga iteracion con la pagina aparte de la ventana emergente
  document.body.style.overflow = "hidden";
  popup.style.display = "block";
}
function hidePopup() {
  blurBackground.style.display = "none";
  document.body.style.overflow = "auto";
  popup.style.display = "none";
}
closeButton.addEventListener("click", hidePopup);
// Crear el histograma con Chart.js
let histogram;

function getInfoToFilters() { //recopilacion de informacion
  const cardsInformation = Array.from(document.querySelectorAll(`.card-back`));  //convertir en matriz
  const data = cardsInformation.map(function (card) {  //iteracion sobre cada tarjeta
    return {
      precioDeLanzamiento: parseInt(
        card.querySelector(`[itemprop="precioDeLanzamiento"]`).textContent.split(".")[0].replace(/\D/g, "")),
      generation: card.querySelector(`[itemprop="generation"]`).textContent,
    };
  });

  const dataSort = data.sort((a, b) => a.precioDeLanzamiento - b.precioDeLanzamiento);
  const sumaGeneraciones = computeStats(dataSort);
  return sumaGeneraciones;
}

function showStatistics() {  //todo lo dentro de esta funcion se activa solamente cuando se llame a la funcion
  blurBackground.style.display =  "block";
  statistics.style.display = "flex";
  const ctx = document.getElementById("histograma").getContext("2d");
  const generationPrice = getInfoToFilters();
  // eslint-disable-next-line no-undef
  histogram = new Chart(ctx, {
    type: 'polarArea',
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
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
        },
      },
      
    },
  });
}
function hideStatistics() {
  histogram.destroy();
  blurBackground.style.display = "none";   //se desactiva el bloqueo para que el usuario pueda seguir iterando con la pagina
  statistics.style.display = "none";
}

buttonStatistics.addEventListener("click", showStatistics);
closeBox.addEventListener("click", hideStatistics);


// Filtrar por nombre
const selectorName = document.querySelector("#buscador").getAttribute("name");
$botonBuscar.addEventListener("click", () => {
  const searchTerm = $buscador.value.toLowerCase(); // convierte a minúsculas para ser insensible a mayúsculas/minúsculas
  // Filtra los elementos que contienen el término de búsqueda en el nombre
  const filteredData = filterData(data, selectorName, searchTerm);
  if (filteredData.length > 0) {
    actualizarTarjetas(filteredData);
  } else {
    showPopup();  //funcion que hace aparacer la ventana emergente
  }
});

$botonReset.addEventListener("click", () => {
  $buscador.value = "";
  $selecType.selectedIndex=0;
  $selection.selectedIndex=0;
  $ordenarSelect.selectedIndex=0;
  actualizarTarjetas(data);

});
