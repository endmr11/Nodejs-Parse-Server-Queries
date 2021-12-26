const express = require("express");
const router = express.Router();
var ParseServer = require("parse-server").ParseServer;
const controller = require("../controllers/controllers.js");

//Tüm Verileri Getirme
router.get("/", controller.getHome);
router.post("/", controller.getCreate);
router.post("/:id", controller.getDelete);
module.exports = router;
