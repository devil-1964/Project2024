const StudentDetails = require("../models/StudentDetails");
const JobApplication = require("../models/jobApplication");
const ExcelJS = require("exceljs");

/**
 * Export student details who applied for a specific job to an Excel file.
 * @param {Object} res - Express response object
 * @param {String} jobId - ID of the job
 */
const exportJobApplicants = async (res, jobId) => {
  try {
    // Validate the job ID
    const job = await JobApplication.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Fetch students who have applied for the job
    const students = await StudentDetails.find({ jobApplied: jobId });

    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No students have applied for this job" });
    }

    // Create a new Excel workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Applicants");

    // Add headers to the worksheet
    worksheet.columns = [
      { header: "Index", key: "index", width: 10 },
      { header: "Name", key: "name", width: 30 },
      { header: "Branch", key: "branch", width: 20 },
      { header: "Batch Year", key: "batchYear", width: 15 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone", key: "phone", width: 15 },
      { header: "Average CGPA", key: "averageCgpa", width: 15 },
      { header: "LinkedIn URL", key: "linkedinURL", width: 30 },
      { header: "GitHub URL", key: "githubURL", width: 30 },
      { header: "Resume URL", key: "resumeURL", width: 40 },
    ];

    // Add student data to the worksheet with an index
    students.forEach((student,index) => {
        const cgpaArray = student.semCgpa || [];
        const averageCgpa =
          cgpaArray.length > 0
            ? (cgpaArray.reduce((sum, cgpa) => sum + cgpa, 0) / cgpaArray.length).toFixed(2) // Calculate average CGPA
            : "N/A";
  
        worksheet.addRow({
          index:index+1,
          name: student.name,
          branch: student.branch,
          batchYear: student.batchYear,
          email: student.email,
          phone: student.phone,
          averageCgpa, 
          resumeURL: student.resumeURL,
          linkedinURL: student.linkedinURL,
          githubURL: student.githubURL
        });
      });

    // Set response headers for file download
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename="job_${jobId}_applicants.xlsx"`);

    // Write workbook to the response
    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

module.exports = exportJobApplicants;
