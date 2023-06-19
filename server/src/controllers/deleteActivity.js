const { Activity, Country } = require('../db.js');

//Borrar una actividad
const deleteActivity = async (name) => {
  try {
    const activity = await Activity.findOne({ where: { name } });

    if (!activity) {
      return false; 
    }

    // desvincula la actividad de todos los países relacionados
    await activity.setCountries([]);

    // elimina la actividad
    await activity.destroy();

    return true; 
  } catch (error) {
    console.log('Error al eliminar la actividad', error);
  }
};

module.exports = deleteActivity;