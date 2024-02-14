// Estas funciones son ejemplos, aquí puedes desarrollar tus propias funciones.


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

export const filterData = (dataToFilter, filter, value) => {
  const data = [...dataToFilter];
  
  if (filter==="select"){
    return data.filter((item)=>
      item.numberGeneration === parseInt(value));
  } 
  if (filter==="type-order"){
    return data.filter((item) =>
      item.numberType === parseInt(value));
  }
  
  if (filter==="searchName"){
    return data.filter((item) =>
      item.name.replaceAll(" ", "").toLowerCase().includes(value.replaceAll(" ", "").toLowerCase())
    );
  }
  return [];
};

export const computeStats = (data) => {
  return data.reduce((sumaPorGeneracion, item) => {
    const { precioDeLanzamiento, generation } = item;
    const generacionNormalizada = generation.toLowerCase().replace(/\s+/g, "");
    sumaPorGeneracion[generacionNormalizada] = (sumaPorGeneracion[generacionNormalizada] || 0) + (typeof precioDeLanzamiento === "number" ? precioDeLanzamiento : parseFloat(precioDeLanzamiento.split(".")[0].replace(/\D/g, "")));

    return sumaPorGeneracion;
  }, {});

}

