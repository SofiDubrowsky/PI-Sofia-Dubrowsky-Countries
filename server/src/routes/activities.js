const { Router } = require('express');
const postActivity = require('../controllers/postActivity.js')
const deleteActivity = require('../controllers/deleteActivity.js')
const { Activity } = require('../db');

const router = Router();


//POST | /activities
//Esta ruta recibirá todos los datos necesarios para crear una actividad turística y relacionarla con los países solicitados.
//Toda la información debe ser recibida por body.
//Debe crear la actividad turística en la base de datos, y esta debe estar relacionada con los países indicados (al menos uno).

router.post('/', async (req, res) => {
    const {name, difficulty, duration, season, countryId} = req.body; //traigo de body todos los atributos de mi modelo Activity y el ID del Pais para establecer la relacion 
    try {
        const newActivity = await postActivity(name, difficulty, duration, season, countryId); //ejecuto mi controller pasandole los datos, este controler devuelve un objeto con la nueva actividad, relacionada con el pais correspondiente.
        return res.status(200).json(newActivity); //devuelvo esa respuesta. 
    } catch (error) {
        return res.status(400).send(error);
    }
});

//GET | /activities
//Obtiene un arreglo de objetos, donde cada objeto es una actividad turística.

router.get('/', async (req, res) => {
    try {
        const DataActivities = await Activity.findAll(); //traigo todas las actividades de la DB.
        res.status(200).json(DataActivities);
    } catch (error) {
        return res.status(400).send(error);
    }
})

//DELETE | /?=name="..."
//Elimino una actividad a partir de un nombre que me pasen por query. 

router.delete('/', async (req, res) => {
    const { name } = req.query;
    try {
      const isDeleted = await deleteActivity(name);
      if (isDeleted) {
        return res.status(200).json({ message: 'Actividad eliminada' });
      } else {
        return res.status(404).json({ message: 'Actividad no encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar la actividad' });
    }
  });
    
module.exports = router;