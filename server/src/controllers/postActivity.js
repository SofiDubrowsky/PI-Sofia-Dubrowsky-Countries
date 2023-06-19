const { Activity } = require('../db.js');

//Creo una nueva Actividad y la relaciono con el pais correspondiente

const postActivity = async (name, difficulty, duration, season, countryId) => {
    try {//'actividad' es la actividad encontrada o creada, 'created' es el valor booleano por si se creo(true) o no se creo(false) una nueva actividad
        let [actividad, created] = await Activity.findOrCreate({
            where: {
                name, 
                difficulty, 
                duration, 
                season,
            }
        })
        // console.log(created); //veo en consola si se creo o no una actividad nueva
        await actividad.setCountries(countryId);//establezco la relacion con el pais correspondiente
        return actividad; //devuelvo el objeto con mi actividad, relacionada con el pais correspondiente. 
    } catch (error) {
        console.log('Error al crear la actividad', error);
    }
};

module.exports = postActivity;