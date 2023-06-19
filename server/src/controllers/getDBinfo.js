const { Country } = require('../db.js');
const {Activity} = require('../db.js')

//Obtengo la informacion de mi base de datos
const getDBinfo = async () => {
    try {
        return await Country.findAll({
            include: {
                model: Activity,
                attributes: ['name', 'difficulty', 'duration', 'season'],
                through: {
                    attributes: [],
                },
            }
        }) //busco todos los paises e incluyo la relacion que tiene cada uno con el modelo Activity, de esta forma cada pais va a tener un atributo "Activities" con los atributos de las actividades con las que esta relacionado. 
    } catch (error) {
        console.log('Error al obtener todos los Paises de la DB incluyendo sus Actividades', error);
    }
};

module.exports = getDBinfo;