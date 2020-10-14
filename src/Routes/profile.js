const express = require('express')
const profileRoute = require('express').Router();
const middleware =  require("../Helpers/middleware.js")
const controller = require("../Controllers/profile.js");

profileRoute.get("/profile", middleware, controller.getAll);
profileRoute.get("/profile/id/:id", middleware, controller.getId);
profileRoute.get("/profile/search", middleware, controller.getName);
profileRoute.patch("/profile/id/:id", middleware, controller.patchProfile);
profileRoute.delete("/profile/:id", middleware, controller.deleteProfile);


module.exports = profileRoute


