export const renderItems = (data) => {
  // Aquí comienza tu código y puedes retornar lo que tu necesites
  const ulElement = document.querySelector('.ul'); // Selecciona el elemento <ul>

  // Itera sobre los elementos en el array de datos
  data.forEach((item) => {
    // Crea un elemento <li> por cada elemento en el array de datos
    const liElement = document.createElement('li');

    // Asigna el contenido del <li> con los datos del elemento actual
    liElement.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}" class="img">
      <h2>${item.name}</h2>
      <p>${item.description}</p>

    `;

    // Agrega el <li> al elemento <ul>
    ulElement.appendChild(liElement);
  });

  // Puedes retornar algo si es necesario
  return 'Rendered items successfully';
  //return 'example';
};
