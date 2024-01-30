/**
 * @description esta funcion crea cada li para cada tarjeta
 * @return {HTMLUListElement} retorna el elemnto ul
 * @author karen valeria
 * @author wendy nicol
 */
export const renderItems = (data) => {


 
  const $contenedorTarjetas = document.createElement("ul");
  $contenedorTarjetas.setAttribute("class", "container-item");

  data.forEach((item) => {
    const $tarjeta = document.createElement("li");
    $tarjeta.setAttribute("id", `li-${item.id}`);
    const lookContent = function () {
      const selector = this.getAttribute("data-id");
      const $tarjeta = document.getElementById(selector);
      if (!$tarjeta) {
        return;
      }
      $tarjeta.classList.add("card--back-face");
    };
    $tarjeta.innerHTML = `
      <section class="card-front">
        <header class="card-front__header">

          <figure class="card-front__header-image">
            <img src="${item.imageUrl}" alt  data-itemprop="imageUrl"  />
          </figure>

        </header>
        <main class="card-front__content">
          <h2 data-itemprop="name"> ${item.name} </h2>

        </main>
        <footer class="card-front__footer">
          <figure onclick="(${lookContent
            .toString()
            .replace(/\"/g, "'")}).call(this)" data-id="li-${
      item.id
    }" class="card-front__footer-image">
          <img src="${item.imageUrl}" alt  data-itemprop="imageUrl"  />
          </figure>
        </footer>
      </section>
      <section class="card-back">
        <header class="card-back__header">
          <h2 data-itemprop="name" ></h2>
        </header>
        <main class="card-back__content">
          <dl itemscope itemtype="consoles" class="card-back__details-list">
            <dt class="card-back__details-title">Descripción:</dt><dd  itemprop="description">${
              item.description
            }</dd>
            <dt class="card-back__details-title">Tipo de consola:</dt><dd itemprop="tipo">${
              item.tipo
            }</dd>
            <dt class="card-back__details-title">Precio de lanzamiento:</dt><dd itemprop="PrecioDeLanzamiento">${
              item.PrecioDeLanzamiento
            }</dd>
            <dt class="card-back__details-title">Duración en el mercado:</dt><dd itemprop="DuraciónEnElMercado">${
              item.DuraciónEnElMercado
            }</dd>
            <dt class="card-back__details-title">Generacion:</dt><dd itemprop="generation">${
              item.generation
            }</dd>
          </dl>
        </main>
        <footer class="card-back__footer">
          <figure class="card-back__footer-image">
            <img src alt  data-itemprop="imageUrlGame" />
            <span data-itemprop="JuegoMásPopular" >${
              item.JuegoMásPopular
            }</span>
          </figure>
        </footer>
      </section>

    `;

    $contenedorTarjetas.appendChild($tarjeta);
  });

  return $contenedorTarjetas;
};

export const renderBackground = () => {
  const $contenedorIconos = document.createElement("ul");
  $contenedorIconos.setAttribute("class", "iconos");
  $contenedorIconos.innerHTML= Array.from({ length: 50 }, (_, j) => `
  <li>
  ${Array.from({ length: 100 }, (_, i) => `
    <i class="fi fi-ss-gamepad" style="--color: hsl(${(i + j) * 18}, 90%, 50%);"></i>
    <i class="fi fi-ss-bomb" style="--color:  hsl(${(i + j) * 18}, 90%, 50%);"></i>
    <i class="fi fi-ss-joystick" style="--color:  hsl(${(i + j) * 18}, 90%, 50%);"></i>
    <i class="fi fi-sr-treasure-chest" style="--color:  hsl(${(i + j) * 18}, 90%, 50%);"></i>
    <i class="fi fi-sr-dice-d12" style="--color:  hsl(${(i + j) * 18}, 90%, 50%);"></i>
    <i class="fi fi-ss-dice-d6" style="--color:  hsl(${(i + j) * 18}, 90%, 50%);"></i>
  
  `).join('')
}
</li>
`).join('')

return  $contenedorIconos;
}