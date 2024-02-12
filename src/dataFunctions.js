// Estas funciones son ejemplos, aquí puedes desarrollar tus propias funciones.

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
/* export const computeStats = (data) => {

  return data.length;
}; */
