const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Team = sequelize.define('Team', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'ID', // Nombre de la columna en la base de datos
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Nombre', // Nombre de la columna en la base de datos
        }
    }, {
        timestamps: false
    });

    return Team;
};