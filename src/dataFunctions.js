// Estas funciones son ejemplos, aquí puedes desarrollar tus propias funciones.
import data from "./data/dataset.js";

export const orderType = (selectedType) => {
  const filtered = data.filter((item) =>
    item.numberType === parseInt(selectedType));
  return filtered;
};
export const orderGeneration = (selectedGeneration) => {
  const filtered = data.filter((item)=>
    item.numberGeneration === parseInt(selectedGeneration));
  return filtered;
};


/* export const sortBy = (data, sortBy, sortOrder) => {
 return "example";
};


export const filterBy = (data, filterBy, value) => {
  return data.filter(item => item[filterBy] === value);
};

// Calcular estadísticas
export const computeStats = (data) => {

  return data.length;
}; */
