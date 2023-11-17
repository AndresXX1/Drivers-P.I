const { allDrivers } = require("./allDrivers");

const getDriverById = async (idDriver) => {
  try {
    const drivers = await allDrivers();
    const driver = drivers.find((d) => d.id == idDriver); // Nota: Use == en lugar de === para la comparación de ID

    if (driver) {
      return driver;
    } else {
      throw new Error(`Driver with ID ${idDriver} not found.`);
    }
  } catch (error) {
    console.error({ error: "Error en getDriverById", details: error });
    throw error;
  }
};

module.exports = { getDriverById };