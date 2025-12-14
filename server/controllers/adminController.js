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
  const { _id, name, phone } = req.body;
  if (!_id || !name || !phone)
    return res.status(400).json({ message: "All fields required" });
  try {
    const user = await User.findById(_id);
    if (!user || user.role !== "admin")
      return res.status(404).json({ message: "User not found or not admin" });
    let admin = await AdminDetails.findById(_id);
    if (admin) {
      admin.name = name;
      admin.phone = phone;
      await admin.save();
      return res.status(200).json({ message: "Admin updated", admin });
    }
    admin = new AdminDetails({ _id, name, phone, jobPosted: [] });
    await admin.save();
    res.status(201).json({ message: "Admin created", admin });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get admin profile by ID
const getAdminProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Find admin details by ID
    const admin = await AdminDetails.findById(id).populate("jobPosted");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

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

// Update admin details
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;

    // Find and update admin details
    const admin = await AdminDetails.findByIdAndUpdate(
      id,
      { name, phone },
      { new: true, runValidators: true }
    );

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({
      message: "Admin details updated successfully",
      admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Update current admin profile
const updateCurrentAdminProfile = async (req, res) => {
  try {
    const adminId = req.user._id;
    const { name, phone } = req.body;
    const admin = await AdminDetails.findByIdAndUpdate(
      adminId,
      { name, phone },
      { new: true, runValidators: true }
    );
    if (!admin)
      return res.status(404).json({ message: "Admin profile not found" });
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
