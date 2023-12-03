const express = require("express");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", authController.register);
router.post("/signin", authController.signin);
router.get("/isauth", auth(), authController.isauth);

module.exports = router;
