const axios = require("axios");
const server = require("./src/server");
const { conn, Country } = require('./src/db.js');
const PORT = 3001;

conn.sync({ force: true }).then(() => {

server.listen(PORT, async () => {

// const dataCountries = Country.findAll();
// if(!dataCountries.length){
//     const response = await axios.get('http://localhost:5000/countries'); //destructuro la response de axios en su propiedad 'data' que es la info de la api
//     const countries = await response.data.map(country => {
//             return {
//                 id: country.cca3,
//                 name: country.name.common,
//                 flag_img: country.flags.png,
//                 continent: country.continents? country.continents[0]: 'undefined',
//                 capital: country.capital? country.capital.join(', '): 'undefined',
//                 subregion: country.subregion? country.subregion: 'undefined',
//                 area: country.area? country.area: 'undefined',
//                 population: country.population? country.population: 'undefined',
//             }
//         });

//         for(let i=0; i< countries.length; i++){
//             await Country.findOrCreate({
//                 where:{
//                     id:countries[i].id,
//                     name:countries[i].name,
//                     flag_img:countries[i].flag_image,
//                     continent: countries[i].continent,
//                     capital: countries[i].capital,
//                     subregion: countries[i].subregion,
//                     area: countries[i].area,
//                     population: countries[i].population
//                 }
//             })
//         }
// }

console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
