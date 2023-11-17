const { Router } = require("express");
const driversRouter = require("./getRoutes");
const postRouter = require("./postRoutes");

const mainRouter = Router();

mainRouter.use("/drivers", driversRouter);
mainRouter.use("/", postRouter);

module.exports = mainRouter;