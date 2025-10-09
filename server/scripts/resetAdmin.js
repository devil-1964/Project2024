const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Import models
const User = require("../models/User");
const AdminDetails = require("../models/AdminDetails");

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected for admin reset");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

// Function to reset admins
const resetAdmins = async () => {
  try {
    console.log("🔄 Starting admin reset process...\n");

    // Step 1: Get all admin users before deletion
    const adminUsers = await User.find({ role: "admin" });
    console.log(`📊 Found ${adminUsers.length} admin user(s) to remove`);

    // Step 2: Delete all AdminDetails
    const deletedAdminDetails = await AdminDetails.deleteMany({});
    console.log(
      `🗑️  Deleted ${deletedAdminDetails.deletedCount} admin detail record(s)`
    );

    // Step 3: Delete all admin users
    const deletedUsers = await User.deleteMany({ role: "admin" });
    console.log(`🗑️  Deleted ${deletedUsers.deletedCount} admin user(s)`);

    // Step 4: Create new admin user
    const newAdminData = {
      username: "admin",
      email: "admin@example.com",
      password: "admin123@example", // You should change this
      role: "admin",
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(newAdminData.password, 10);

    // Create new admin user
    const newAdminUser = await User.create({
      username: newAdminData.username,
      email: newAdminData.email,
      password: hashedPassword,
      role: newAdminData.role,
      isFirstLogin: false,
    });

    console.log(`✅ Created new admin user with ID: ${newAdminUser._id}`);

    // Step 5: Create corresponding AdminDetails
    const newAdminDetails = await AdminDetails.create({
      _id: newAdminUser._id,
      name: newAdminData.username,
      phone: "9999999999", // Default phone number
      jobPosted: [],
    });

    console.log(`✅ Created admin details for: ${newAdminDetails.name}`);

    // Summary
    console.log("\n🎉 Admin reset completed successfully!");
    console.log("📋 New Admin Credentials:");
    console.log(`   Email: ${newAdminData.email}`);
    console.log(`   Password: ${newAdminData.password}`);
    console.log(`   Username: ${newAdminData.username}`);
    console.log(`   User ID: ${newAdminUser._id}`);
    console.log(
      "\n⚠️  IMPORTANT: Please change the default password after first login!"
    );
  } catch (error) {
    console.error("❌ Error during admin reset:", error.message);
    throw error;
  }
};

// Function to create additional admin (without removing existing ones)
const createAdditionalAdmin = async (
  username,
  email,
  password,
  name,
  phone
) => {
  try {
    console.log(`🔄 Creating additional admin: ${email}\n`);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error(`User with email ${email} already exists`);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user
    const newAdminUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "admin",
      isFirstLogin: false,
    });

    console.log(`✅ Created admin user with ID: ${newAdminUser._id}`);

    // Create corresponding AdminDetails
    const newAdminDetails = await AdminDetails.create({
      _id: newAdminUser._id,
      name: name || username,
      phone: phone || "0000000000",
      jobPosted: [],
    });

    console.log(`✅ Created admin details for: ${newAdminDetails.name}`);

    console.log("\n🎉 Additional admin created successfully!");
    console.log("📋 Admin Credentials:");
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Username: ${username}`);
    console.log(`   User ID: ${newAdminUser._id}`);

    return newAdminUser;
  } catch (error) {
    console.error("❌ Error creating additional admin:", error.message);
    throw error;
  }
};

// Main execution function
const main = async () => {
  await connectDB();

  // Get command line arguments
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    if (command === "reset") {
      // Reset all admins and create a default one
      await resetAdmins();
    } else if (command === "create") {
      // Create additional admin
      const [, username, email, password, name, phone] = args;

      if (!username || !email || !password) {
        console.log(
          "❌ Usage: node resetAdmin.js create <username> <email> <password> [name] [phone]"
        );
        console.log(
          '📝 Example: node resetAdmin.js create john john@admin.com password123 "John Doe" "1234567890"'
        );
        process.exit(1);
      }

      await createAdditionalAdmin(username, email, password, name, phone);
    } else {
      console.log("📖 Usage:");
      console.log("  Reset all admins:     node resetAdmin.js reset");
      console.log(
        "  Create new admin:     node resetAdmin.js create <username> <email> <password> [name] [phone]"
      );
      console.log("\n📝 Examples:");
      console.log("  node resetAdmin.js reset");
      console.log(
        '  node resetAdmin.js create john john@admin.com password123 "John Doe" "1234567890"'
      );
    }
  } catch (error) {
    console.error("💥 Script failed:", error.message);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
    process.exit(0);
  }
};

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  resetAdmins,
  createAdditionalAdmin,
  connectDB,
};
