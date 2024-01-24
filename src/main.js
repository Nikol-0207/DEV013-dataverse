import { example } from './dataFunctions.js';
import { renderItems } from './view.js';

import data from './data/dataset.js';

console.log("aqui main"+ example, renderItems(data), data);

const selectElement = document.getElementById('mySelect');
//const searchName = document.getElementById('searchName');
const inputElement = document.getElementById('buscador');
const searchButton = document.getElementById('searchName');
const ulElement = document.querySelector('.ul');
// Filtrar por generación
selectElement.addEventListener('input', (event) => {
  const selectedGeneration = event.target.value;
  // Filtra los elementos según la generación seleccionada
  const filteredData = data.filter(item => item.numberGeneration === parseInt(selectedGeneration));

  // Limpia el contenido existente en la lista
  ulElement.innerHTML = '';

  // Crea elementos <li> para cada elemento en el array filtrado
  filteredData.forEach((item) => {
    const liElement = document.createElement('li');
    liElement.innerHTML = `
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <img src="${item.imageUrl}" alt="${item.name}" class="img">
    `;
    ulElement.appendChild(liElement);
  });
});

// Filtrar por nombre
// Añade un event listener al botón
searchButton.addEventListener('click', () => {
  // Obtén el valor del input
  const searchTerm = inputElement.value.toLowerCase(); // convierte a minúsculas para ser insensible a mayúsculas/minúsculas

  // Filtra los elementos que contienen el término de búsqueda en el nombre
  const filteredData = data.filter(item => item.name.replaceAll(" ", "").toLowerCase().includes(searchTerm.replaceAll(" ","").toLowerCase()));


  if(filteredData.length > 0){
  // Limpia el contenido existente en la lista
    ulElement.innerHTML = '';
    // Crea elementos <li> para cada elemento en el array filtrado
    filteredData.forEach((item) => {
      const liElement = document.createElement('li');
      liElement.innerHTML = `
      <h2 class="name">${item.name}</h2>
      <p class="parrafo">${item.generation}</p>
      <img src="${item.imageUrl}" alt="${item.name}" class="img">
    `;
      ulElement.appendChild(liElement);
    });
  }else{
    alert("No se econtraron registros");
    return;
  }

});



