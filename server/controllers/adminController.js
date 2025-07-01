const AdminDetails = require("../models/AdminDetails");
const User = require("../models/User");

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    // Fetch all admins and populate the jobPosted array with job details
    const admins = await AdminDetails.find().populate("jobPosted");
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Create a new admin
const createAdmin = async (req, res) => {
  const { _id, name, phone } = req.body;

  // Basic validation
  if (!_id || !name || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user exists and has admin role
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(400).json({ message: "User must have admin role" });
    }

    // Check if the admin details already exist
    const existingAdmin = await AdminDetails.findById(_id);
    if (existingAdmin) {
      // Update existing admin details
      existingAdmin.name = name;
      existingAdmin.phone = phone;
      await existingAdmin.save();
      
      return res.status(200).json({
        message: "Admin details updated successfully",
        admin: existingAdmin,
      });
    }

    // Create new admin details
    const newAdmin = new AdminDetails({
      _id, // Use _id as the identifier, linked to the User model
      name,
      phone,
      jobPosted: [], // This will be populated later with jobs
    });

    await newAdmin.save();
    res.status(201).json({
      message: "Admin created successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
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

// Get current admin's own profile
const getCurrentAdminProfile = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    const adminId = req.user._id;
    
    // Find admin details by ID
    const admin = await AdminDetails.findById(adminId).populate("jobPosted");
    if (!admin) {
      return res.status(404).json({ message: "Admin profile not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
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

// Update current admin's own profile
const updateCurrentAdminProfile = async (req, res) => {
  try {
    const adminId = req.user._id;
    const { name, phone } = req.body;

    // Find and update admin details
    const admin = await AdminDetails.findByIdAndUpdate(
      adminId,
      { name, phone },
      { new: true, runValidators: true }
    );

    if (!admin) {
      return res.status(404).json({ message: "Admin profile not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminProfile,
  getCurrentAdminProfile,
  updateAdmin,
  updateCurrentAdminProfile,
};
