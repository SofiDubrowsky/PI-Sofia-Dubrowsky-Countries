const { Country } = require('../db.js');


const axios = require('axios');

//Obtengo la informacion de la Api
const ApiData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/countries'); 
        const countries = await response.data.map(country => {
            return {
                id: country.cca3,
                name: country.name.common,
                flag_img: country.flags.svg,
                continent: country.continents? country.continents[0]: 'undefined',
                capital: country.capital? country.capital.join(', '): 'undefined',
                subregion: country.subregion? country.subregion: 'undefined',
                area: country.area? country.area: 'undefined',
                population: country.population? country.population: 'undefined',
            }
        }); //hago un mapeo de la respuesta de la api, y guardo en una constante un objeto con la info de la api que quiero guardar. El mapeo me va a devolver un array con esos objetos, donde cada objeto es un pais. 
        return countries; 
    } catch (error) {
        console.log('Error al obtener los datos de la Api', error);
    }
};



//Traigo la info de la Api y la cargo en mi Base de Datos
const ApiToDB = async () => {
    try {
        const DataBase = await Country.findAll(); //guardo en una constante todos los paises que existan en la Base de Datos

        if(DataBase.length < 1) {
            const allCountries = await ApiData();
            await Country.bulkCreate(allCountries);
        }//si no encuentro ningun pais en mi DB, guardo en una constante la respuesta de mi controler ApiData. Ejecuto el metodo bulkCreate, pasadole el array de objetos y cargar en mi DB todos los paises. 
    } catch (error) {
        console.log('Error al cargar los datos de la Api en la Data Base',error);
    }
};

module.exports = ApiToDB; 