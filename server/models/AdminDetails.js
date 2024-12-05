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
    phone: {
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

// Use `userId` as `_id` when creating a new AdminDetails document
adminDetailsSchema.pre("validate", function (next) {
  if (!this._id) {
    this._id = this.user; // Set _id to user ID
  }
  next();
});

module.exports = mongoose.model("AdminDetails", adminDetailsSchema);
