const { Activity, Country } = require('../db.js');

const deleteActivity = async (name) => {
  try {
    const activity = await Activity.findOne({ where: { name } });

    if (!activity) {
      return false; // La actividad no se encontró
    }

    // Desvincula la actividad de todos los países relacionados
    await activity.setCountries([]);

    // Elimina la actividad
    await activity.destroy();

    return true; // Actividad eliminada con éxito
  } catch (error) {
    console.log('Error al eliminar la actividad', error);
    throw error;
  }
};

module.exports = deleteActivity;