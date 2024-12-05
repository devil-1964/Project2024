const AdminDetails = require("../models/AdminDetails");

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
    // Check if the admin already exists
    const existingAdmin = await AdminDetails.findById(_id);
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this ID already exists" });
    }

    const newAdmin = new AdminDetails({
      _id, // Use _id as the identifier, linked to the User model
      user: _id, // Set user field to match _id
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

module.exports = {
  createAdmin,
  getAllAdmins,
};
