const express = require("express");
const router = express.Router();
const { getAllStudents, createStudent, updateStudent, getStudentById } = require("../controllers/studentController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Route to get all students (protected, admin only)
router.get("/", protect, authorize(["admin"]), getAllStudents);

// Route to get student by ID (protected)
router.get("/:studentId", protect, getStudentById);

// Route to create a new student (protected)
router.post("/create", protect, createStudent);

// Route to update a student's details (protected)
router.put("/update/:studentId", protect, updateStudent);

module.exports = router;
