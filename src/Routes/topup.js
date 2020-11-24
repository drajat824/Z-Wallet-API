const express = require('express')
const topupRoute = require('express').Router();
const middleware =  require("../Helpers/middleware.js")
const controller = require("../Controllers/topup.js");

topupRoute.get("/topup", middleware, controller.getAll);
topupRoute.patch("/topup/:id", middleware, controller.patchTopup);
topupRoute.delete("/topup/:id", middleware, controller.deleteTopup);
topupRoute.post("/topup", middleware, controller.postTopup);

module.exports = topupRoute


