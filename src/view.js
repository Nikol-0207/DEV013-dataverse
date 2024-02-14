/**
 * @description esta funcion crea cada li para cada tarjeta
 * @return {HTMLUListElement} retorna el elemento ul
 * @author karen valeria
 * @author wendy nicol
 */
export const renderItems = (data) => {
  const $contenedorTarjetas = document.createElement("ul");
  $contenedorTarjetas.setAttribute("class", "container-item");

  data.forEach((item) => {
    const $tarjeta = document.createElement("li");
    $tarjeta.setAttribute("class","li_sta");
    $tarjeta.setAttribute("id", `li-${item.id}`);
    $tarjeta.setAttribute("itemtype","consoles");
    $tarjeta.setAttribute("itemscope","");

    const toggleContent = function () {
      const selector = this.getAttribute("data-id");
      const $tarjeta = document.getElementById(selector);
      if (!$tarjeta) {
        return;
      }
      $tarjeta.classList.toggle("card--back-face");
      $tarjeta.classList.toggle("card--front-face");
    };
    $tarjeta.innerHTML = /*html*/`
      <section class="card-front">
        <header class="card-front__header">

          <figure class="card-front__header-image">
            <img src="${item.imageUrl}" alt  data-itemprop="imageUrl"  />
          </figure>

        </header>
        <main class="card-front__content">
          <h2 data-itemprop="name" > ${item.name} </h2>
          <dl itemscope itemtype="consoles" class="card-back__details-list" style="margin-top: 20px;">
          <dt class="card-back__details-title" >Precio de lanzamiento: </dt>
            <dd class="card-back__item" itemprop="precioDeLanzamiento">${item.precioDeLanzamiento}</dd>
            </dl>
            </main>
        <footer class="card-front__footer">
        <figure onclick="(${toggleContent.toString().replace(/"/g, "'")}).call(this)" data-id="li-${item.id
}" class="card-front__footer-image">
        <img src="${item.imageUrl}" alt  data-itemprop="imageUrl"  />
          </figure>
        </footer>
      </section>
      <section class="card-back">
      <header class="card-back__header">
      <figure onclick="(${toggleContent.toString().replace(/"/g, "'")}).call(this)" data-id="li-${item.id}" class="card-back__header-image">
        <img src="${item.imageUrl}" alt  data-itemprop="imageUrl"  />
          </figure>
          <h2 data-itemprop="name" ></h2>
        </header>
        <main class="card-back__content">
          <dl itemscope itemtype="consoles" class="card-back__details-list">
            <dt ></dt>
            <dd itemprop="description" class="card-back__details-description">${item.description}</dd>
            <dt class="card-back__details-title" style="margin-bottom: 0;">Tipo de consola: </dt>
            <dd class="card-back__item" itemprop="tipo">${item.tipo}</dd>

            <dt class="card-back__details-title">Duración en el mercado: </dt>
            <dd class="card-back__item" itemprop="DuraciónEnElMercado">${item.DuraciónEnElMercado}</dd>
            <dt class="card-back__details-title">Generacion:</dt>
            <dd class="card-back__item" itemprop="generation">${item.generation}</dd>
            <dt class="card-back__details-title">Juego más jugado:</dt>
            <dd class="card-back__item" itemprop="JuegoMásPopular">${item.JuegoMásPopular}</dd>

          </dl>
        </main>
        <footer class="card-back__footer" >
          <figure class="card-back__footer-image">
            <img src alt  data-itemprop="imageUrlGame" />

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
  $contenedorIconos.innerHTML = Array.from(
    { length: 50 },
    (_, j) => `
  <li>
  ${Array.from(
    { length: 100 },
    (_, i) => `
    <i class="fi fi-rs-gamepad" style="--color: hsl(${(i + j) * 18
}, 90%, 50%);"></i>
    <i class="fi fi-rs-bomb" style="--color:  hsl(${(i + j) * 18
}, 90%, 50%);"></i>
    <i class="fi fi-rs-joystick" style="--color:  hsl(${(i + j) * 18
}, 90%, 50%);"></i>
    <i class="fi fi-rs-treasure-chest" style="--color:  hsl(${(i + j) * 18
}, 90%, 50%);"></i>
    <i class="fi fi-rs-dice-d12" style="--color:  hsl(${(i + j) * 18
}, 90%, 50%);"></i>
    <i class="fi fi-rr-dice-d6" style="--color:  hsl(${(i + j) * 18
}, 90%, 50%);"></i>

  `
  ).join("")}
</li>
`
  ).join("");

  return $contenedorIconos;
};
