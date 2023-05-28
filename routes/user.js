const express = require("express");
const router = new express.Router();
const UserController = require("../controler/UserController");
router.route("/").get(UserController.allUser);
router.route("/").post(UserController.addUser);
module.exports = router