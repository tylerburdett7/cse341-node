const express = require("express");
const router = express.Router();
const nameController = require("../controllers/nameController");

// Home route
router.get("/", nameController.getName);

module.exports = router;
