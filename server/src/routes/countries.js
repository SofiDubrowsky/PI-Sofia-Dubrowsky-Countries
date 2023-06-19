const { Router } = require('express');
const ApiToDB = require('../controllers/ApiToDB.js')
const getDBinfo = require('../controllers/getDBinfo.js')
const {Op} = require('sequelize');

const router = Router();

//En una primera instancia, al levantar tu servidor se deberá hacer una petición a la API, y se tendrán que guardar todos los países dentro de tu base de datos. Una vez guardados, toda tu aplicación utilizará la información sólo de tu base de datos. LISTO

// GET | /countries
//Obtiene un arreglo de objetos, donde cada objeto es un país con toda su información. LISTO

//GET | /countries/name?="..." LISTOO 
//Esta ruta debe obtener todos aquellos países que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
//Debe poder buscarlo independientemente de mayúsculas o minúsculas.
//Si no existe el país, debe mostrar un mensaje adecuado.

router.get('/', async (req, res) => {
    const {name} = req.query; //guardo la info que obtengo por query (name)
    await ApiToDB(); //Guardo en mi DB todos los paises.
    const DBinfo = await getDBinfo(); //obtengo la info que tengo ahora en mi DB
    
    try {
        if(!name) {

            return res.status(200).json(DBinfo);
            //si no me pasan "name" por query, devuelvo todos los paises. 
        }
        else {
            const filteredCountry = DBinfo.filter(element => element.name.toLowerCase().includes(name.toLowerCase()));
            //si si obtengo a "name" por query, hago un filter de lo que tengo en mi BD y comparo, si alguno de los nombres(propiedad name) de todos los objetos(paises) en minusculas (convertida toda la palabra en minuscula), incluye a lo que me llega en "name" tambien convertido en minuscula. ¿Por que?, para de esta forma buscar cualquier tipo de coincidencia, por ejemplo si en mi objeto de mi pais Argentina, su name es Argentina con minuscula, si me viene por query 'argent' va a devolver igual mi objeto con name "Argentina". 

            // if(!filteredCountry.length) return res.status(400).json({message: 'Country not found'}); // lo saque para poder hacer el "country not found" en el front, necesitaba un array vacio.
            return res.status(200).json(filteredCountry)
            //si el array que me devuelve el filter esta vacio, devuelvo un estadi 400 y un mensaje adecuando. Sino, un estado 200 OK, y mi array con mi objeto de paises que tuvieron una coincidencia en su propiedad name. 
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send(error);
    }
});

//GET | /countries/:idPais
//Esta ruta obtiene el detalle de un país específico. Es decir que devuelve un objeto con la información pedida en el detalle de un país.
//El país es recibido por parámetro (ID de tres letras del país).
//Tiene que incluir los datos de las actividades turísticas asociadas a este país.

router.get('/:idPais', async (req, res) => {
    const {idPais} = req.params; //guardo la info que obtengo por params (idPais)
    const allCountry = await getDBinfo();//obtengo la info que tengo ahora en mi DB

    try {
        if(idPais) {
            const idFound = await allCountry.find(country => country.id === idPais); 
            //si recibo por params un ID, me fijo con un find si encuentro coincidencia con algun ID de todos los paises que tengo en mi DB

            if(!idFound) return res.status(400).send('ID of country not found');
            // si no obtuve ninguna coincidencia mando un status 400 y un mensaje

            return res.status(200).json(idFound); // si si encuentra coincidencia, un 200 OK y el objeto que encontre.
        }
    } catch (error) {
        return res.status(400).send(error);
    }
});

module.exports = router;

