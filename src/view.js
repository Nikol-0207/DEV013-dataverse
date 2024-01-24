/**
 * @description esta funcion crea cada li para cada tarjeta
 * @return {HTMLUListElement} retorna el elemnto ul
 * @author karen valeria
 * @author wendy nicol
 */
export const renderItems = (data) => {
  const $contenedorTarjetas = document.createElement("ul");
  $contenedorTarjetas.setAttribute("class", "ul");

  data.forEach((item) => {
    const $tarjeta = document.createElement("li");

    // <img src=item.imageUrl alt=item.name class=img />
    const $imagen = document.createElement("img");
    $imagen.setAttribute("src", item.imageUrl);
    $imagen.setAttribute("alt", item.name);
    $imagen.setAttribute("class", "img");

    // <p class=parrafo>item.description</p>
    const $parrafo = document.createElement("p");
    $parrafo.setAttribute("class", "parrafo");
    $parrafo.innerText = item.description;

    // <h2>item.name</h2>
    const $titulo = document.createElement("h2");
    $titulo.innerText = item.name;

    /*
     <li>
      <img src=item.imageUrl alt=item.name class=img />
      <h2>item.name</h2>
      <p class=parrafo>item.description</p>
     </li> 
     */
    $tarjeta.appendChild($imagen);
    $tarjeta.appendChild($titulo);
    $tarjeta.appendChild($parrafo);
    

    $contenedorTarjetas.appendChild($tarjeta);
  });

  return $contenedorTarjetas;
};
