const AdminDetails = require("../models/AdminDetails");
const User = require("../models/User");

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminDetails.find().populate("jobPosted");
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create or update admin profile
const createAdmin = async (req, res) => {
  const { _id, name } = req.body;
  if (!_id || !name) return res.status(400).json({ message: "All fields required" });
  try {
    let admin = await AdminDetails.findById(_id);
    if (admin) {
      admin.name = name;
      await admin.save();
      return res.status(200).json({ message: "Admin updated", admin });
    }
    admin = new AdminDetails({ _id, name, jobPosted: [] });
    await admin.save();
    res.status(201).json({ message: "Admin created", admin });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Legacy getAdminProfile removed; use current admin routes

// Get current admin profile
const getCurrentAdminProfile = async (req, res) => {
  try {
    const adminId = req.user._id;
    const admin = await AdminDetails.findById(adminId).populate("jobPosted");
    if (!admin)
      return res.status(404).json({ message: "Admin profile not found" });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Legacy updateAdmin removed; use updateCurrentAdminProfile

// Update current admin profile
const updateCurrentAdminProfile = async (req, res) => {
  try {
    const adminId = req.user._id;
    const { name } = req.body;
    const admin = await AdminDetails.findByIdAndUpdate(
      adminId,
      { name },
      { new: true, runValidators: true }
    );
    if (!admin) return res.status(404).json({ message: "Admin profile not found" });
    res.status(200).json({ message: "Profile updated", admin });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getCurrentAdminProfile,
  updateCurrentAdminProfile,
};
