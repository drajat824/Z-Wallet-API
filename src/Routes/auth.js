const authRoute = require('express').Router();

const controller = require("../Controllers/auth.js");

authRoute.post("/register", controller.register);
authRoute.patch("/register/pin", controller.registerPin);
authRoute.post("/login", controller.login);

module.exports = authRoute
