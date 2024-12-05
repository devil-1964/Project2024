
const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    lastDateToApply: {
      type: Date,
      required: true,
    },
    requiredSkills: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
