const axios = require('axios');
const { Team } = require("../db");

const getAllTeams = async () => {
    try {
        const teamsInDatabase = await Team.findAll();

        if (teamsInDatabase.length === 0) {
            const apiResponse = await axios.get('http://localhost:5000/drivers'); // Ajusta la ruta según donde se encuentren los datos de los equipos
            const apiData = apiResponse.data;

            if (Array.isArray(apiData)) {
                // Si la respuesta es un arreglo, asume que es un arreglo de conductores
                const apiDrivers = apiData;

                // Extrae y almacena los nombres de los equipos
                const apiTeams = apiDrivers.map(driver => {
                    const teams = driver.teams ? driver.teams.split(',').map(teamName => teamName.trim()) : []; // Divide los equipos por coma si es que no es undefined
                    return teams.map(teamName => ({ name: teamName }));
                }).flat();

                // Filtra equipos con nombres válidos antes de guardarlos en la base de datos
                const validTeams = apiTeams.filter(team => team.name);

                if (validTeams.length > 0) {
                    // Guarda los equipos en la base de datos
                    await Team.bulkCreate(validTeams);
                    return validTeams;
                } else {
                    throw new Error("No se encontraron equipos válidos en la API.");
                }
            } else {
                throw new Error("La respuesta de la API no es un arreglo de conductores.");
            }
        } else {
            // Si la base de datos no está vacía, obtén los equipos de la base de datos
            const dbTeams = teamsInDatabase.map((team) => team.get());
            return dbTeams;
        }
    } catch (error) {
        console.error("Error al obtener los datos de los equipos", error);
        throw error;
    }
};

module.exports = { getAllTeams };