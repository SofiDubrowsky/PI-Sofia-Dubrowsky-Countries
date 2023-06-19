const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag_img: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
      charset: 'utf8', //  indica el conjunto de caracteres utilizado para codificar la cadena de caracteres en la base de datos, UTF-8 -> una amplia gama de caracteres de diferentes idiomas. (paises con nombres de capitales raros)
      collate: 'utf8_general_ci', // ci case-insensitive, permite que las consultas y comparaciones de cadenas sean independientes de las diferencias de mayúsculas y minúsculas.
    },
    subregion: {
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.STRING
    },
    population: {
      type: DataTypes.STRING
    }
  }, { timestamps: false });
};