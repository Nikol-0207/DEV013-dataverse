// Estas funciones son ejemplos, aquí puedes desarrollar tus propias funciones.

export const filterData = (data, filter, value) => {
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
export const sortData = (data,sortBy, sortOrder) => {
  if (sortOrder==="abc"){
    return data.sort((a, b) => {
      const nameA = a[sortBy].toUpperCase();
      const nameB = b[sortBy].toUpperCase();
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
      const nameA = a[sortBy].toUpperCase();
      const nameB = b[sortBy].toUpperCase();
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

export const computeStats = (data) => {
  return data.reduce((sumaPorGeneracion, item) => {
    const { precioDeLanzamiento, generation } = item;
    const generacionNormalizada = generation.toLowerCase().replace(/\s+/g, "");

    sumaPorGeneracion[generacionNormalizada] = (sumaPorGeneracion[generacionNormalizada] || 0) + precioDeLanzamiento;

    return sumaPorGeneracion;
  }, {});

}

