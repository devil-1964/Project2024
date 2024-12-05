const mongoose = require("mongoose");

const studentDetailsSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId, // Use _id as a reference to User
      ref: "User", 
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    batchYear: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    linkedinURL: {
      type: String,
    },
    githubURL: {
      type: String,
    },
    resumeURL: {
      type: String,
    },
    semCgpa: {
      type: [Number], // Array of CGPA for each semester
      required: true,
    },
    activeBacklogs: {
      type: Number,
      default: 0,
    },
    jobApplied: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobApplication",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentDetails", studentDetailsSchema);
