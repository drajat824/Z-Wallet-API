const express = require('express')
const profileRoute = require('express').Router();
const middleware =  require("../Helpers/middleware.js")
const controller = require("../Controllers/profile.js");

profileRoute.get("/profile", middleware, controller.getAll);
profileRoute.get("/profile/detail", middleware, controller.getUserByToken);
profileRoute.get("/profile/id/:id", middleware, controller.getId);
profileRoute.get("/profile/search", middleware, controller.getName);
profileRoute.get("/profile/cekpw", middleware, controller.cekPassword);
profileRoute.get("/profile/cekpin", middleware, controller.cekPin);
profileRoute.patch("/profile", middleware, controller.patchProfile);
profileRoute.delete("/profile/:id", middleware, controller.deleteProfile);
profileRoute.patch("/profile/token", controller.updateToken);

module.exports = profileRoute


