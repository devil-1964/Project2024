const express = require("express");
const { createAdmin,getAllAdmins } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to create a new admin
router.get("/", getAllAdmins);

router.post("/create",protect, createAdmin);

module.exports = router;
