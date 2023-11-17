const { driverApi } = require("./DriversByApi");
const { databaseDrivers } = require("./DriversByDb");

const allDrivers = async () => {
  try {
    const dbDrivers = await databaseDrivers(); // Obtener datos de la base de datos
    const apiDrivers = await driverApi(); // Obtener datos de la API

    // Ajustar los IDs de los controladores de la API para evitar solapamientos
    const apiDriversWithAdjustedIDs = apiDrivers.map((driver, index) => ({
      ...driver,
      id: dbDrivers.length + index + 1, // Empezar desde un valor mayor que el último ID de la base de datos
    }));

    // Combinar los datos de la base de datos y la API
    const allDrivers = [...dbDrivers, ...apiDriversWithAdjustedIDs];

    return allDrivers;
  } catch (error) {
    console.error({ error: "Error en allDrivers", details: error });
    throw error;
  }
};

module.exports = { allDrivers };
