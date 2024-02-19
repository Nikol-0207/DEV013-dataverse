# Data Verse
En este sitio web encontraras un cierto número de tarjetas con información a la que podras acceder dinamicamente, dicha temática son * **consolas nintendo** * .
Podras visualizar las consolas lanzadas de esta empresa, desde la primera generación hasta la actualidad.
Dichas consolas tendran una descripción y otros datos que podrian ser de interes para aficionados a los videojuegos.

[![Screenshot-30.png](https://i.postimg.cc/SxgNY2Hj/Screenshot-30.png)](https://postimg.cc/cv8NVHxN)

------
### Contenido
* [ 1. Historias de Usuario](#historias-de-usuario)
* [2. Prompt Usado en la IA para generar la data](Prompt-IA)
* [ 3. Diseño de DataVerse](#diseño-de-dataverse)
* [ 4. Dificultades en el proceso de usabilidad](#dificultades-en-el-proceso-de-usabilidad)
* [ 5. Funcionalidades](#funciones)
------

## Historias de usuario

| Usuario    1      |
| -----------------|
| Como usuario web, quiero poder visualizar las datas de consolas por generación. |

| Usuario   2      |
| -----------------|
| Como usuario web, quisiera poder ordenar la data según el filtrado este actualmente.       |

| Usuario   3      |
| -----------------|
| Como usuario web, quiero saber el precio de cada consola para saber como esta en el mercado y poder comparar con otras consolas. |

| Usuario   4      |
| -----------------|
| Como usuario web, quisiera tener la facilidad de buscar una consola por su nombre y así no desperdiciar tiempo.  |

| Usuario   5      |
| -----------------|
| Como usuario web fan de los videojuegos y/o consolas nintendo quisiera ver como fueron las consolas lanzadas cada generación/año hasta hoy. |

## Prompt IA
Orden para el primer data

[![proompt.png](https://i.postimg.cc/h4MxGPcj/proompt.png)](https://postimg.cc/K4k4qbKS)

Respuesta a la pregunta que se dio

[![respuestaprompt2.png](https://i.postimg.cc/cCJv3w0J/respuestaprompt2.png)](https://postimg.cc/Q9RNGBBL)

Segunda Orden para la data de las pruebas unitarias

[![dataset.png](https://i.postimg.cc/SNBKSw2R/dataset.png)](https://postimg.cc/vcvyX2vw)

Respuesta:

[![datasetrespuesta.png](https://i.postimg.cc/rsvqprp3/datasetrespuesta.png)](https://postimg.cc/kRF01DKv)


## Diseño de DataVerse
**Prototipo 1**

[![prototipouno.png](https://i.postimg.cc/j2C3d9VM/prototipouno.png)](https://postimg.cc/LgK3xx8P)

**Prototipo 2**

[![prototipo2.png](https://i.postimg.cc/59kkkxvT/prototipo2.png)](https://postimg.cc/K4BN1h0D)

De ambos diseño lo que más menos cambios tuvo fue la posición de los filtros, buscador y botones.

**Prototipo Final**

[![finalprot.png](https://i.postimg.cc/ZRLXvy50/finalprot.png)](https://postimg.cc/62yMDqRN)

## Dificultades en el proceso de usabilidad

* Hubo problemas con el filtro de buscar, el cual requeria que escribas el nombre de la consola que querias ver, el problema era que en un principio si no tomaba en cuenta los espacios que podria haber delante o atrás del texto, no habria resultados. Teniendo en cuenta que se quiere un algoritmo de búsqueda por defecto te encuentre lo que buscas escribiendo el 70% del nombre.
* Al momento de sacar un dato estadistico y mostrarlo tenia un margen de error que los datos no se visualizaban bien, debido a que cuando habia muchas datas de las cules iba a verse el resultado el tamaño se encogia haciendo que sea más pequeño aquellos datos.
* El atractivo que le quisimos poner fue de que voltearan las tarjetas al hacerle click en la figura de alienigena pero este no resultaba por ende hubo muchos arreglos ahi.

## Funciones

#### Javascript　

**Ordenar :** Esta función de tres parametros ordena la data por nombre, ya sea ascendente o descendente, el primer parametro manda la data, el segundo indica por cual campo vamos a ordenar asc o desc, en este caso por nombre, tercer parametro indica el valor del selector que vas a seleccionar, si ascendente o descendente.

    export const sortData = (data,sortBy, sortOrder) => {
    if (sortOrder==="asc"){  //verificacion de ordenanza
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
    }else if (sortOrder ==="desc"){  //en caso descendente sera al reves
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

**Filtraciones:** Hay tres filtros, por nombre, tipo y generación. Esta función tiene tres parametros al igual que la anterior. En 1er lugar esta data, en 2do el nombre del selector para poder retornar según el filtro seleccionado, y el 3ero es el valor de dicho selector, si es que tomaste el filtro por tipo, que tipo es el valor como se Consolas de sobremesa o portatil.

    export const filterData = (dataToFilter, filter, value) => {   //filter tiene el         nombre del filtro
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

**Datos de la estadistica:** Se realiza una operación de suma para sacar el total de precios por cada generación.

    export const computeStats = (data) => {
     return data.reduce((sumaPorGeneracion, item) => {
    const { precioDeLanzamiento, generation } = item;
    const generacionNormalizada = generation.toLowerCase().replace(/\s+/g, "");
    sumaPorGeneracion[generacionNormalizada] = (sumaPorGeneracion[generacionNormalizada] || 0) + (typeof precioDeLanzamiento === "number" ? precioDeLanzamiento : parseFloat(precioDeLanzamiento.split(".")[0].replace(/\D/g, "")));

    return sumaPorGeneracion;
    }, {});

    }
