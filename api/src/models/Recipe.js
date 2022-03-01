const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    image: {
      type: DataTypes.STRING,    
      allowNull: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      
    },

    score: {
      type: DataTypes.FLOAT,   
      
    },

    healthScore:{
      type: DataTypes.FLOAT,
      
    },

    steps: {
      type: DataTypes.TEXT
    },

    createdINBd: {                  
      type: DataTypes.BOOLEAN,  
      allowNull: false,  
      defaultValue: true
    }
  }, {timestamps:false});
};

