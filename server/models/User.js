const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "student"], required: true },
    phone: { type: String, trim: true },
    isFirstLogin: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

// Virtual relations to role-specific details
userSchema.virtual("studentDetails", {
  ref: "StudentDetails",
  localField: "_id",
  foreignField: "_id",
  justOne: true,
});

userSchema.virtual("adminDetails", {
  ref: "AdminDetails",
  localField: "_id",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("User", userSchema);
