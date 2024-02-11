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
const blurBackground = document.querySelector('#blurBackground');
const closeButton = document.getElementById("closePopup");


const statistics = document.querySelector('#statistics-database');
const closeBox = document.querySelector('.closeHistogram');
const buttonStatistics = document.querySelector('#statics');


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
//ventanas emergente

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
//Ventana emergente de estadistica

function showStatistics(){
  blurBackground.style.display = 'block';
  /* document.body.style.overflow='hidden'; */
  statistics.style.display = "block";
  const ctx = document.getElementById('histograma').getContext('2d');

  const histograma = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Gen #1:Color Tv Game', 'Gen #2:Color Tv Game', 'Etiqueta 3', 'Etiqueta 4', 'Etiqueta 5', 'Etiqueta 6','Etiqueta'],
      datasets: [{
        label: 'Mayor Precio de Consola de cada Generación',
        data: [199, 40, 179.99, 5, 2,50,100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}

function hideStatistics(){
  blurBackground.style.display = 'none';
  /* document.body.style.overflow='auto'; */
  statistics.style.display = "none";
}
buttonStatistics.addEventListener("click",showStatistics);
closeBox.addEventListener("click",hideStatistics);


// Crear el histograma con Chart.js


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
