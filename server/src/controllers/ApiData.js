// const axios = require('axios');

// //Obtengo la informacion de la Api
// const ApiData = async () => {
//     try {
//         const {data} = await axios.get('http://localhost:5000/countries'); //destructuro la response de axios en su propiedad 'data' que es la info de la api
//         const countries = await data.map(country => {
//             return {
//                 id: country.cca3,
//                 name: country.name.common,
//                 flag_image: country.flags.svg,
//                 continent: country.continents? country.continents[0]: 'undefined',
//                 capital: country.capital? country.capital.join(', '): 'undefined',
//                 subregion: country.subregion? country.subregion: 'undefined',
//                 area: country.area? country.area: 'undefined',
//                 population: country.population? country.population: 'undefined',
//             }
//         }); //hago un mapeo de la respuesta de la api, y guardo en una constante un objeto con la info de la api que quiero guardad. El mapeo me va a devolver un array con esos objetos, donde cada objeto es un pais. 
//         return countries; 
//     } catch (error) {
//         console.log('Error al obtener los datos de la Api', error);
//     }
// };

// module.exports = ApiData;