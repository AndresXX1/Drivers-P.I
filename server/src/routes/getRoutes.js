const {Router} = require ("express");
const { getDriverSearchHandler, getDriverIdHandler, getDriverTeamHandler, getDriverHandler, } = require("../Handlers/getDriversHandler");


const driversRouter = Router();

//el orden de las rutas es importante, express le da preoridad a las que sean mas especificas como la de /:id
driversRouter.get("/", getDriverHandler);

driversRouter.get("/team", getDriverTeamHandler); 

driversRouter.get("/name", getDriverSearchHandler);

driversRouter.get("/:id", getDriverIdHandler);





module.exports = driversRouter;