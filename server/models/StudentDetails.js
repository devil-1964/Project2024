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
    // phone/email sourced from User
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
      type: [Number],
      required: true,
      default: [],
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

studentDetailsSchema.index({ _id: 1 });
studentDetailsSchema.index({ branch: 1, batchYear: 1 });

module.exports = mongoose.model("StudentDetails", studentDetailsSchema);
