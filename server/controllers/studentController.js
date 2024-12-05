const StudentDetails = require("../models/StudentDetails");
const User=require("../models/User")
// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await StudentDetails.find().populate("jobApplied");
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Create a new student
const createStudent = async (req, res) => {
  const { userId, name, branch, batchYear, phone, email, linkedinURL, githubURL, resumeURL, semCgpa, activeBacklogs } = req.body;

  // Basic validation
  if (!userId || !name || !branch || !batchYear || !phone || !email ) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Create new student entry
    const newStudent = new StudentDetails({
      _id: userId, // Use userId directly as _id
      name,
      branch,
      batchYear,
      phone,
      email,
      linkedinURL,
      githubURL,
      resumeURL,
      semCgpa,
      activeBacklogs,
      jobApplied: [], // Assuming this is an empty array to start with
    });

    // Save the student details
    await newStudent.save();

    // Update the User document to set isFirstLogin to false
    const user = await User.findById(userId); // Find user by userId
    if (user) {
      user.isFirstLogin = false; // Set isFirstLogin to false
      await user.save(); // Save the updated user document
    }

    res.status(201).json({
      message: "Student created successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};



// Update a student's details
const updateStudent = async (req, res) => {
  const { studentId } = req.params; // Here, studentId should be the same as the student _id
  const updates = req.body;
  console.log(req.params)
  try {
    const updatedStudent = await StudentDetails.findByIdAndUpdate(
      studentId, // Use the userId as _id for the update
      updates,
      { new: true }
    ).populate("jobApplied");

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

const getStudentById = async (req, res) => {
  const { studentId } = req.params; // Extract userId from URL params
  try {
    const student = await StudentDetails.findById(studentId).populate("jobApplied"); // Find student by userId (_id)
    // console.log(student)
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

module.exports = {
  getAllStudents,
  createStudent,
  updateStudent,
  getStudentById
};
