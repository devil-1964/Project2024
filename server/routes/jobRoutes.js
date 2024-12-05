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
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes for job operations
router.post("/create",protect, createJobApplication); // Route to create a new job application
router.get("/", getJobApplications); // Route to get all job applications
router.get("/:jobId", getJobApplicationById); // Route to get a single job by ID
router.put("/:jobId",protect, editJobApplication); // Route to edit an existing job application
router.delete("/:jobId/",protect, deleteJobApplication); // Route to delete a job application
router.post("/apply",  applyForJob);
router.get("/:jobId/export", exportApplicants);


module.exports = router;
