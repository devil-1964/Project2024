const JobApplication = require("../models/jobApplication");
const StudentDetails = require("../models/StudentDetails");
const AdminDetails = require("../models/AdminDetails");
const exportJobApplicants = require("../utils/excelExporter");



const applyForJob = async (req, res) => {
  const { userId, jobId } = req.body; // Assuming userId and jobId are provided in the body

  // Validate input
  if (!userId || !jobId) {
    return res.status(400).json({ message: "userId and jobId are required" });
  }

  try {
    // Check if the job exists
    const job = await JobApplication.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the student exists
    const student = await StudentDetails.findById(userId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Add jobId to the student's jobApplied array (if not already applied)
    if (!student.jobApplied.includes(jobId)) {
      student.jobApplied.push(jobId);
      await student.save();
    } else {
      return res
        .status(400)
        .json({ message: "Student has already applied for this job" });
    }

    res.status(200).json({
      message: "Job application successful",
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Create a new job application
const createJobApplication = async (req, res) => {
  const { jobTitle, jobDescription, location, company, lastDateToApply, requiredSkills, adminId } = req.body;

  // Basic validation
  if (!jobTitle || !jobDescription || !location || !company || !lastDateToApply || !requiredSkills || !adminId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new job application
    const newJobApplication = new JobApplication({
      jobTitle,
      jobDescription,
      location,
      company,
      lastDateToApply,
      requiredSkills,
    });

    // Save the job application to the database
    await newJobApplication.save();

    // Find the admin by adminId and link the job to the admin's jobPosted array
    const adminDetails = await AdminDetails.findById(adminId);
    if (!adminDetails) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Add the job to the admin's jobPosted array
    adminDetails.jobPosted.push(newJobApplication._id);
    await adminDetails.save();

    res.status(201).json({
      message: "Job application created successfully and linked to admin",
      jobApplication: newJobApplication,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Get all job applications
const getJobApplications = async (req, res) => {
  try {
    const jobApplications = await JobApplication.find();
    res.status(200).json(jobApplications);
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Get a single job application by ID
const getJobApplicationById = async (req, res) => {
  const { jobId } = req.params;

  try {
    const jobApplication = await JobApplication.findById(jobId);
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }
    res.status(200).json(jobApplication);
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Edit a job application by ID
const editJobApplication = async (req, res) => {
  const { jobId } = req.params;
  const { jobTitle, jobDescription, location, company, lastDateToApply, requiredSkills } = req.body;

  try {
    const updatedJobApplication = await JobApplication.findByIdAndUpdate(
      jobId,
      { jobTitle, jobDescription, location, company, lastDateToApply, requiredSkills },
      { new: true }
    );

    if (!updatedJobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    res.status(200).json({
      message: "Job application updated successfully",
      jobApplication: updatedJobApplication,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Delete a job application by ID
const deleteJobApplication = async (req, res) => {
  const { jobId } = req.params;
  const { adminId } = req.body;
  console.log(req.body)

  if (!adminId) {
    return res.status(400).json({ message: 'Admin ID is required' });
}

  try {
    // Remove the job application
    const deletedJobApplication = await JobApplication.findByIdAndDelete(jobId);
    if (!deletedJobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }

    // Remove the job ID from the admin's jobPosted array
    const adminDetails = await AdminDetails.findById(adminId);
    if (!adminDetails) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Remove the job ID from the jobPosted array
    adminDetails.jobPosted.pull(jobId);
    await adminDetails.save();

    res.status(200).json({ message: "Job application deleted successfully and removed from admin's jobPosted" });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

const exportApplicants = async (req, res) => {
  const { jobId } = req.params;
  await exportJobApplicants(res, jobId);
};

module.exports = {
  createJobApplication,
  getJobApplications,
  getJobApplicationById,
  editJobApplication,
  deleteJobApplication,
  applyForJob,
  exportApplicants, // Add the export handler
};
