/**
 * @description esta funcion crea cada li para cada tarjeta
 * @return {HTMLUListElement} retorna el elemnto ul
 * @author karen valeria
 * @author wendy nicol
 */
export const renderItems = (data) => {



/*
BEM
block
element
modificador

https://css-tricks.com/bem-101/


<li>
  <section class="card-front">
    <header class="card-front__header">
      <figure class="card-front__header-image">
        <img src alt />
      </figure>
      <h2></h2>
    </header>
    <footer class="card-front__footer">
      <figure class="card-front__footer-image">
        <img src alt />
      </figure>
    </footer>
  </section>
  <section class="card-back">
    <header class="card-back__header">
      <h2 data-itemprop="name" ></h2>
    </header>
    <main class="card-back__content">
      <dl itemscope itemtype="consoles" class="card-back__details-list">
        <dt class="card-back__details-title">Descripción:</dt><dd >Pionera de la informática, fue la primera programadora.</dd>
        <dt class="card-back__details-title">Tipo de consola:</dt><dd itemprop="tipo">1843</dd>
        <dt>Precio de lanzamiento:</dt><dd itemprop="PrecioDeLanzamiento">London, England</dd>
        <dt>Duración en el mercado:</dt><dd itemprop="DuraciónEnElMercado">Computer Science</dd>
        <dt>Generacion:</dt><dd itemprop="generation">Computer Science</dd>
      </dl>
    </main>
    <footer class="card-back__footer">
      <figure class="card-back__footer-image">
        <img src alt data-itemprop="imageUrl" />
        <span data-itemprop="JuegoMásPopular" >Super Mario 64</span>
      </figure>
    </footer>
  </section>
</li>
*/
  const $contenedorTarjetas = document.createElement("ul");
  $contenedorTarjetas.setAttribute("class", "ul");

  data.forEach((item) => {
    const $tarjeta = document.createElement("li");

    $tarjeta.innerHTML=`
      <section class="card-front">
        <header class="card-front__header">
          <figure class="card-front__header-image">
            <img src="${item.imageUrl}" alt  data-itemprop="imageUrl"  />
          </figure>
          <h2></h2>
        </header>
        <footer class="card-front__footer">
          <figure class="card-front__footer-image">
            <img src alt />
          </figure>
        </footer>
      </section>
      <section class="card-back">
        <header class="card-back__header">
          <h2 data-itemprop="name" ></h2>
        </header>
        <main class="card-back__content">
          <dl itemscope itemtype="consoles" class="card-back__details-list">
            <dt class="card-back__details-title">Descripción:</dt><dd  itemprop="description">${item.description}</dd>
            <dt class="card-back__details-title">Tipo de consola:</dt><dd itemprop="tipo">${item.tipo}</dd>
            <dt class="card-back__details-title">Precio de lanzamiento:</dt><dd itemprop="PrecioDeLanzamiento">${item.PrecioDeLanzamiento}</dd>
            <dt class="card-back__details-title">Duración en el mercado:</dt><dd itemprop="DuraciónEnElMercado">${item.DuraciónEnElMercado}</dd>
            <dt class="card-back__details-title">Generacion:</dt><dd itemprop="generation">${item.generation}</dd>
          </dl>
        </main>
        <footer class="card-back__footer">
          <figure class="card-back__footer-image">
            <img src alt  data-itemprop="imageUrlGame" />
            <span data-itemprop="JuegoMásPopular" >${item.JuegoMásPopular}</span>
          </figure>
        </footer>
      </section>

    `;

    $contenedorTarjetas.appendChild($tarjeta);
  });

  return $contenedorTarjetas;
};
