const express = require("express");
const { createAdmin, getAllAdmins, getAdminProfile, getCurrentAdminProfile, updateAdmin, updateCurrentAdminProfile } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get all admins (protected, admin only)
router.get("/", protect, authorize(["admin"]), getAllAdmins);

// Route to get current admin's own profile (protected, admin only)
router.get("/profile", protect, authorize(["admin"]), getCurrentAdminProfile);

// Route to update current admin's own profile (protected, admin only)
router.put("/profile", protect, authorize(["admin"]), updateCurrentAdminProfile);

// Route to get admin profile by ID (protected, admin only)
router.get("/:id", protect, authorize(["admin"]), getAdminProfile);

// Route to create a new admin (protected, admin only)
router.post("/create", protect, authorize(["admin"]), createAdmin);

// Route to update any admin details by ID (protected, admin only)
router.put("/:id", protect, authorize(["admin"]), updateAdmin);

module.exports = router;
