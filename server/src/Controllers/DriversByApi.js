const axios = require("axios");

const driverApi = async () => {
  try {
    const drivers = await axios.get("http://localhost:5000/drivers");
    const driverDetailsPromises = drivers.data.map(async (driverInfo) => {
      return {
        id: driverInfo.id,
        name: driverInfo.name,
        image: driverInfo.image,
        dob: driverInfo.dob,
        nationality: driverInfo.nationality,
        teams: driverInfo.teams,
        description: driverInfo.description,
      };
    });

    const driverDetails = await Promise.all(driverDetailsPromises);
    return driverDetails;
  } catch (error) {
    console.error("Error obteniendo datos de conductores desde la API:", error);
    throw error;
  }
};

module.exports = { driverApi };