// Estas funciones son ejemplos, aquí puedes desarrollar tus propias funciones.


export const sortData = (data,sortBy, sort) => {
  if (sort==="asc"){  //verificacion de ordenanza
    return data.sort((a, b) => {
      const nameA = a[sortBy].toUpperCase();  //convierte a mayuscula para no cometer errores al momento de ordenar
      const nameB = b[sortBy].toUpperCase();
      if (nameA < nameB) {   //esta comparacion es para verificar si nameA ira antes de nameB
        return -1;
      }
      if (nameA > nameB) {  //aqui devolvera 1 si nameA debe ir delante
        return 1;
      }
      return 0;  // caso contrario si son iguales
    });
  }else if (sort ==="desc"){  //en caso descendente sera al reves
    return data.sort((a, b) => {
      const nameA = a[sortBy].toUpperCase(); //sortBy indicara por que campo se ordenara asc o desd
      const nameB = b[sortBy].toUpperCase(); //en este caso se ordenara por nombre
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

export const filterData = (dataToFilter, filter, value) => {   //filter tiene el nombre del filtro
  const data = [...dataToFilter];

  if (filter==="select"){   //verifica el nombre, si llega a ser este se filtrara por generacion
    return data.filter((item)=>  //filtra los elementos del data, dependiendo de V o F filtrara aquellos que si pasen
      item.numberGeneration === parseInt(value));  //se compara numero de generacion con el valor del selector
  }
  if (filter==="type-order"){
    return data.filter((item) =>
      item.numberType === parseInt(value)); //se compara numero de tipo
  }

  if (filter==="searchName"){
    return data.filter((item) =>  //filtrara nuevo array con las datas encontradas
      item.name.replaceAll(" ", "").toLowerCase().includes(value.replaceAll(" ", "").toLowerCase())
      //reemplaza todo espacio dentro, convierte a minuscula y compara si el valor esta dentro de lo buscado
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

