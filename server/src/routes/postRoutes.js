const {Router} = require ("express");
const { postCreateDriversHandler } = require("../Handlers/postDriversHandler");


const postRouter = Router();

postRouter.post("/create", postCreateDriversHandler);


module.exports = postRouter 