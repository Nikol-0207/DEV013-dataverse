// Estas funciones son ejemplos, aquí puedes desarrollar tus propias funciones.
import data from "./data/dataset.js";
import { renderItems } from "./view.js";

export const orderType = (selectedType) => {
  const filtered = data.filter(
    (item) => item.numberType === parseInt(selectedType)
  );
  return filtered;
};

export const filterBy = (data, filter, value) => {
  let filtered="";
  if (filter==="select"){
    filtered = data.filter((item)=>
      item.numberGeneration === parseInt(value));
  } else if (filter==="type-order"){
    filtered = data.filter((item) =>
      item.numberType === parseInt(value));
  } else if (filter==="searchName"){
    filtered = data.filter((item) =>
      item.name.replaceAll(" ", "").toLowerCase().includes(value.replaceAll(" ", "").toLowerCase())
    );
  }
  return filtered;
};
export const sortBy = (data, sortOrder) => {
  if (sortOrder==="abc"){
    return data.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }else if (sortOrder ==="cba"){
    return data.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
  }

};

// Calcular estadísticas
export const computeStats = (data) => {
  return data.length;
};

export function showPopup(blurBackground, popup) {
  blurBackground.style.display = "block";
  document.body.style.overflow = "hidden";
  popup.style.display = "block";
}

export function hidePopup(blurBackground, popup) {
  blurBackground.style.display = "none";
  document.body.style.overflow = "auto";
  popup.style.display = "none";
}

export function calcularSumaGeneraciones(arreglo) {
  return arreglo.reduce((sumaPorGeneracion, item) => {
    const { PrecioDeLanzamiento, generation } = item;
    const generacionNormalizada = generation.toLowerCase().replace(/\s+/g, "");

    sumaPorGeneracion[generacionNormalizada] = (sumaPorGeneracion[generacionNormalizada] || 0) + PrecioDeLanzamiento;

    return sumaPorGeneracion;
  }, {});
}


export function getInfoToFilters() {
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

  const dataSort = data.sort((a, b) => a.PrecioDeLanzamiento - b.PrecioDeLanzamiento);
  const sumaGeneraciones = calcularSumaGeneraciones(dataSort);
  return sumaGeneraciones;
}

let histogram;

export function hideStatistics(blurBackground, statistics) {
  histogram.destroy();
  blurBackground.style.display = "none";
  /* document.body.style.overflow='auto'; */
  statistics.style.display = "none";
}

export function showStatistics(blurBackground, statistics) {
  blurBackground.style.display = "block";
  /* document.body.style.overflow='hidden'; */
  statistics.style.display = "flex";
  const ctx = document.getElementById("histograma").getContext("2d");
  const generationPrice = getInfoToFilters();
  // eslint-disable-next-line no-undef
  histogram = new Chart(ctx, {
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
/**
 *
 * @param {Array} data
 * @param {HTMLElement} $contenedor
 */
export const actualizarTarjetas = (data, $contenedor) => {
  const $contenedorTarjetas = document.querySelector(".container-item");
  $contenedorTarjetas.remove();
  $contenedor.appendChild(renderItems(data));
};