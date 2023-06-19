const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    id: {
       type: DataTypes.UUID, //Identificador Universalmente Único
       defaultValue: DataTypes.UUIDV4, //utilizo el V4 que genera un valor aleatorio que es lo que utilizan la mayoria de los sistemas modernos.
       primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    difficulty: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5'),
        allowNull: false
      },
    duration: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12','13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24')
      },
    season: {
        type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
        allowNull: false
      },
  }, { timestamps: false });
};