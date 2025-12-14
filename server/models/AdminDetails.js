const mongoose = require("mongoose");

const adminDetailsSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Link to the User schema
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    jobPosted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobApplication",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Keep explicit _id linkage to User
adminDetailsSchema.index({ _id: 1 });

module.exports = mongoose.model("AdminDetails", adminDetailsSchema);
