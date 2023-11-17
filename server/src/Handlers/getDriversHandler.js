const { Router } = require ("express")
const { allDrivers } = require("../Controllers/allDrivers");
const { getDriverById } = require("../Controllers/DriversByID");
const { getAllTeams } = require ("../Controllers/allTeams");
const { driverApi } = require ("../Controllers/DriversByApi")
const { databaseDrivers } = require ("../Controllers/DriversByDb")
 
const getDriverHandler = async (req, res) => {
    try {
        const { name } = req.query;
        const driverList = await allDrivers();
        const defaultImage = 'https://img.freepik.com/fotos-premium/retrato-piloto-f1-casco-piloto-formula-parado-pista-carreras-despues-competencia_777271-15991.jpg';

        if (name) {
            const driverSelect = await driverList.filter(
                (driver) => driver.name === name.toLowerCase()
            );

            if (driverSelect.length > 0) {
                res.status(200).send(driverSelect);
            } else {
                res.status(404).send("Drivers by name not found");
            }
        } else {
            // Modificamos el arreglo de drivers para asignar la imagen por defecto
            const driversWithDefaultImage = driverList.map((driver) => {
                if (!driver.image) {
                    driver.image = { url: defaultImage };
                }
                return driver;
            });

            res.json(driversWithDefaultImage);
        }
    } catch (error) {
        res.status(400).json({ error: "Error when bringing the drivers" });
    }
};

//---------------------------------------------------------------------------------------------------------------------------------------


const getDriverIdHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const driver = await getDriverById(id);
  
      if (driver) {
        res.status(200).json(driver);
      } else {
        res.status(404).json({ error: `Driver with ID ${id} not found.` });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los detalles del conductor", details: error.message });
    }
  };

//---------------------------------------------------------------------------------------------------------------------------------------

const getDriverSearchHandler = async (req, res) => {
    try {
      const name = req.query.name;
      const dbDrivers = await databaseDrivers();
      const apiDrivers = await driverApi(); // Obtener datos de la API
  
      // Ajustar los nombres en la API
      const apiDriversWithAdjustedNames = apiDrivers.map((driver) => ({
        ...driver,
        name: `${driver.name.forename} ${driver.name.surname}`, // Combina el nombre en una sola cadena
      }));
  
      // Combinar los datos de la base de datos y la API
      const allDrivers = [...dbDrivers, ...apiDriversWithAdjustedNames];
  
      // Realizar la búsqueda por nombre
      const filteredDrivers = allDrivers.filter((driver) =>
        driver.name.toLowerCase().includes(name.toLowerCase())
      );
  
      if (filteredDrivers.length > 0) {
        res.status(200).send(filteredDrivers);
      } else {
        res.status(404).send("Drivers by name not found");
      }
    } catch (error) {
      console.error("Error when searching for drivers:", error);
      res.status(400).json({ error: "Error when searching for drivers" });
    }
  };

//---------------------------------------------------------------------------------------------------------------------------------------
const getDriverTeamHandler = async (req, res) => {
    try {
        const teams = await getAllTeams();

        if (teams.length > 0) {
            res.status(200).json(teams);
        } else {
            res.status(404).json({ error: "No se encontraron equipos" });
        }
    } catch (error) {
        console.error("Error al obtener los equipos:", error);
        res.status(500).json({ error: "Error al obtener los equipos" });
    }
};






module.exports = {
    getDriverHandler,
    getDriverIdHandler,
    getDriverSearchHandler,
    getDriverTeamHandler,
    
}