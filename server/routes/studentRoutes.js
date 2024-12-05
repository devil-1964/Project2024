const express = require("express");
const router = express.Router();
const { getAllStudents, createStudent, updateStudent,getStudentById } = require("../controllers/studentController");

// Route to get all students
router.get("/", getAllStudents);

// Route to create a new student
router.post("/create", createStudent);

// Route to update a student's details
router.put("/update/:studentId", updateStudent);

router.get("/:studentId", getStudentById);

module.exports = router;
