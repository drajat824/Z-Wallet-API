const express = require('express')
const transferRoute = require('express').Router();
const middleware =  require("../Helpers/middleware.js")
const controller = require("../Controllers/transfer.js");

transferRoute.get("/transfer", middleware, controller.getAll);
transferRoute.patch("/transfer/:id", middleware, controller.patchTransfer);
transferRoute.delete("/transfer/:id", middleware, controller.deleteTransfer);
transferRoute.post("/transfer", middleware, controller.postTransfer);

module.exports = transferRoute


