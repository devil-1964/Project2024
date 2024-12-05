const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
      unique: [true, "Roll No already registered"]
    },
    email: {
      type: String,
      required: [true, "Please add the email address"],
      unique: [true, "Email address already exists"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    role: {
      type: String,
      enum: ["admin", "student"],
      required: [true, "Please specify the user role"],
    },
    isFirstLogin: {
      type: Boolean,
      default: true, // Default to true for new users
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
