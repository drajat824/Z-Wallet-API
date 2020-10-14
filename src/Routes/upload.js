const uploadRoute = require("express").Router();
const middleware =  require("../Helpers/middleware.js");
const controller = require("../Controllers/upload.js");

uploadRoute.patch("/upload", middleware, controller.uploadImage);

module.exports = uploadRoute;