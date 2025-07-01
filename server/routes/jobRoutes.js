const express = require("express");
const {
  createJobApplication,
  getJobApplications,
  getJobApplicationById,
  editJobApplication,
  deleteJobApplication,
  applyForJob,
  exportApplicants
} = require("../controllers/jobController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getJobApplications); // Route to get all job applications (public for students to view)
router.get("/:jobId", getJobApplicationById); // Route to get a single job by ID (public for viewing)

// Protected routes for admins
router.post("/create", protect, authorize(["admin"]), createJobApplication); // Route to create a new job application
router.put("/:jobId", protect, authorize(["admin"]), editJobApplication); // Route to edit an existing job application
router.delete("/:jobId", protect, authorize(["admin"]), deleteJobApplication); // Route to delete a job application
router.get("/:jobId/export", protect, authorize(["admin"]), exportApplicants); // Route to export applicants

// Protected routes for students
router.post("/apply", protect, applyForJob); // Route for students to apply for jobs

module.exports = router;
