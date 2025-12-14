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
  const { userId, name, branch, batchYear, phone, linkedinURL, githubURL, resumeURL, semCgpa, activeBacklogs } = req.body;

  // Basic validation aligned with StudentDetails schema
  if (!userId || !name || !branch || !batchYear) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Create new student entry (no phone/email in StudentDetails)
    const newStudent = new StudentDetails({
      _id: userId,
      name,
      branch,
      batchYear,
      linkedinURL,
      githubURL,
      resumeURL,
      semCgpa,
      activeBacklogs,
      jobApplied: [],
    });

    await newStudent.save();

    // Update the User document
    const user = await User.findById(userId);
    if (user) {
      // Persist phone on User if provided
      if (phone) user.phone = phone;
      user.isFirstLogin = false;
      await user.save();
    }

    res.status(201).json({ message: "Student created successfully", student: newStudent });
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
      studentId, 
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

// Get list of job IDs the current student has applied to
const getAppliedJobs = async (req, res) => {
  try {
    const studentId = req.user._id;
    const student = await StudentDetails.findById(studentId).select("jobApplied");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    const appliedJobIds = student.jobApplied.map((id) => id.toString());
    res.status(200).json({ appliedJobIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

module.exports = {
  getAllStudents,
  createStudent,
  updateStudent,
  getStudentById,
  getAppliedJobs,
};
