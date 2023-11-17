const { Driver, Team } = require("../db.js");

const databaseDrivers = async () => {
  try {
    const driversOnDB = await Driver.findAll({
      include: Team,
    });

    const driversFromAPI = []; // Aquí almacenaremos los conductores de la API, si los hay.

    // Verificamos si driversFromAPI está habilitado, si lo está, obtendremos los conductores de la API.
    if (process.env.DRIVERS_FROM_API === 'enabled') {
      
    }

    // Combinamos los conductores de la base de datos y los de la API.
    const combinedDrivers = driversOnDB.map((driver) => {
      return {
        id: driver.id,
        name: driver.name,
        image: driver.image && driver.image.url ? driver.image.url : 'https://img.freepik.com/fotos-premium/retrato-piloto-f1-casco-piloto-formula-parado-pista-carreras-despues-competencia_777271-15991.jpg',
        dob: driver.dob,
        nationality: driver.nationality,
        teams: driver.Teams.map((team) => {
          return {
            id: team.id,
            name: team.name,
            
          };
        }),
        description: driver.description,
      };
    });

    // Agregamos los conductores de la API a los conductores combinados.
    combinedDrivers.push(...driversFromAPI);

    return combinedDrivers;
  } catch (error) {
    console.error("Error al obtener datos de los conductores desde la base de datos:", error);
    throw error;
  }
};

module.exports = { databaseDrivers };