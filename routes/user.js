const express = require("express");
const router = new express.Router();
const UserController = require("../controler/UserController");
router.route("/").get(UserController.allUser);
router.route("/post").post(UserController.addUser);
router.route("/deleteall").get(UserController.deleteUser);
module.exports = router