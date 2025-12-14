const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Import models
const User = require("../models/User");
const StudentDetails = require("../models/StudentDetails");

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected for student management");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

// Sample student data
const sampleStudents = [
  {
    username: "john2021",
    email: "john.doe@student.com",
    password: "student123",
    name: "John Doe",
    branch: "Computer Science Engineering",
    batchYear: 2025,
    phone: "9876543210",
    linkedinURL: "https://linkedin.com/in/johndoe",
    githubURL: "https://github.com/johndoe",
    semCgpa: [8.5, 8.7, 8.9, 9.1, 8.8, 9.0, 9.2, 8.9],
    activeBacklogs: 0,
  },
  {
    username: "jane2021",
    email: "jane.smith@student.com",
    password: "student123",
    name: "Jane Smith",
    branch: "Electronics and Communication Engineering",
    batchYear: 2025,
    phone: "9876543211",
    linkedinURL: "https://linkedin.com/in/janesmith",
    githubURL: "https://github.com/janesmith",
    semCgpa: [9.0, 9.2, 9.1, 9.3, 9.0, 9.4, 9.2, 9.1],
    activeBacklogs: 0,
  },
  {
    username: "mike2022",
    email: "mike.johnson@student.com",
    password: "student123",
    name: "Mike Johnson",
    branch: "Mechanical Engineering",
    batchYear: 2026,
    phone: "9876543212",
    linkedinURL: "https://linkedin.com/in/mikejohnson",
    githubURL: "https://github.com/mikejohnson",
    semCgpa: [7.8, 8.0, 8.2, 8.1, 8.3, 8.0],
    activeBacklogs: 1,
  },
  {
    username: "sarah2022",
    email: "sarah.wilson@student.com",
    password: "student123",
    name: "Sarah Wilson",
    branch: "Information Technology",
    batchYear: 2026,
    phone: "9876543213",
    linkedinURL: "https://linkedin.com/in/sarahwilson",
    githubURL: "https://github.com/sarahwilson",
    semCgpa: [8.7, 8.9, 9.0, 8.8, 9.1, 8.9],
    activeBacklogs: 0,
  },
  {
    username: "alex2023",
    email: "alex.brown@student.com",
    password: "student123",
    name: "Alex Brown",
    branch: "Civil Engineering",
    batchYear: 2027,
    phone: "9876543214",
    linkedinURL: "https://linkedin.com/in/alexbrown",
    githubURL: "https://github.com/alexbrown",
    semCgpa: [8.0, 8.2, 8.4, 8.1],
    activeBacklogs: 0,
  },
];

// Function to reset students
const resetStudents = async () => {
  try {
    console.log("🔄 Starting student reset process...\n");

    // Step 1: Get all student users before deletion
    const studentUsers = await User.find({ role: "student" });
    console.log(`📊 Found ${studentUsers.length} student user(s) to remove`);

    // Step 2: Delete all StudentDetails
    const deletedStudentDetails = await StudentDetails.deleteMany({});
    console.log(
      `🗑️  Deleted ${deletedStudentDetails.deletedCount} student detail record(s)`
    );

    // Step 3: Delete all student users
    const deletedUsers = await User.deleteMany({ role: "student" });
    console.log(`🗑️  Deleted ${deletedUsers.deletedCount} student user(s)`);

    // Step 4: Create sample students
    console.log("\n🔄 Creating sample students...\n");

    for (let i = 0; i < sampleStudents.length; i++) {
      const studentData = sampleStudents[i];

      // Hash the password
      const hashedPassword = await bcrypt.hash(studentData.password, 10);

      // Create new student user
      const newStudentUser = await User.create({
        username: studentData.username,
        email: studentData.email,
        password: hashedPassword,
        role: "student",
        phone: studentData.phone,
        isFirstLogin: false,
      });

      console.log(
        `✅ Created student user: ${studentData.name} (ID: ${newStudentUser._id})`
      );

      // Create corresponding StudentDetails
      const newStudentDetails = await StudentDetails.create({
        _id: newStudentUser._id,
        name: studentData.name,
        branch: studentData.branch,
        batchYear: studentData.batchYear,
        linkedinURL: studentData.linkedinURL,
        githubURL: studentData.githubURL,
        resumeURL: "", // Empty initially
        semCgpa: studentData.semCgpa,
        activeBacklogs: studentData.activeBacklogs,
        jobApplied: [],
      });

      console.log(`✅ Created student details for: ${newStudentDetails.name}`);
    }

    // Summary
    console.log("\n🎉 Student reset completed successfully!");
    console.log(`📋 Created ${sampleStudents.length} sample students:`);
    sampleStudents.forEach((student, index) => {
      console.log(
        `   ${index + 1}. ${student.name} (${student.email}) - ${
          student.branch
        } - Batch ${student.batchYear}`
      );
    });
    console.log("\n📝 Default password for all students: student123");
    console.log(
      "\n⚠️  IMPORTANT: Students should change their passwords after first login!"
    );
  } catch (error) {
    console.error("❌ Error during student reset:", error.message);
    throw error;
  }
};

// Function to create additional student (without removing existing ones)
const createStudent = async (
  username,
  email,
  password,
  name,
  branch,
  batchYear,
  phone,
  semCgpa,
  activeBacklogs = 0
) => {
  try {
    console.log(`🔄 Creating student: ${name} (${email})\n`);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error(`User with email ${email} already exists`);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student user
    const newStudentUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "student",
      phone,
      isFirstLogin: false,
    });

    console.log(`✅ Created student user with ID: ${newStudentUser._id}`);

    // Parse semCgpa if it's a string
    let cgpaArray;
    if (typeof semCgpa === "string") {
      cgpaArray = semCgpa.split(",").map((cgpa) => parseFloat(cgpa.trim()));
    } else if (Array.isArray(semCgpa)) {
      cgpaArray = semCgpa;
    } else {
      cgpaArray = [8.0]; // Default CGPA
    }

    // Create corresponding StudentDetails
    const newStudentDetails = await StudentDetails.create({
      _id: newStudentUser._id,
      name,
      branch,
      batchYear: parseInt(batchYear),
      linkedinURL: "",
      githubURL: "",
      resumeURL: "",
      semCgpa: cgpaArray,
      activeBacklogs: parseInt(activeBacklogs),
      jobApplied: [],
    });

    console.log(`✅ Created student details for: ${newStudentDetails.name}`);

    console.log("\n🎉 Student created successfully!");
    console.log("📋 Student Details:");
    console.log(`   Name: ${name}`);
    console.log(`   Email: ${email}`);
    console.log(`   Username: ${username}`);
    console.log(`   Branch: ${branch}`);
    console.log(`   Batch Year: ${batchYear}`);
    console.log(`   Phone: ${phone}`);
    console.log(`   Semester CGPAs: ${cgpaArray.join(", ")}`);
    console.log(`   Active Backlogs: ${activeBacklogs}`);
    console.log(`   User ID: ${newStudentUser._id}`);

    return newStudentUser;
  } catch (error) {
    console.error("❌ Error creating student:", error.message);
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
      // Reset all students and create sample ones
      await resetStudents();
    } else if (command === "create") {
      // Create individual student
      const [
        ,
        username,
        email,
        password,
        name,
        branch,
        batchYear,
        phone,
        semCgpa,
        activeBacklogs,
      ] = args;

      if (
        !username ||
        !email ||
        !password ||
        !name ||
        !branch ||
        !batchYear ||
        !phone
      ) {
        console.log(
          "❌ Usage: node resetStudent.js create <username> <email> <password> <name> <branch> <batchYear> <phone> [semCgpa] [activeBacklogs]"
        );
        console.log(
          '📝 Example: node resetStudent.js create john2025 john@student.com pass123 "John Doe" "Computer Science" 2025 9876543210 "8.5,8.7,8.9" 0'
        );
        process.exit(1);
      }

      await createStudent(
        username,
        email,
        password,
        name,
        branch,
        batchYear,
        phone,
        semCgpa,
        activeBacklogs
      );
    } else {
      console.log("📖 Usage:");
      console.log("  Reset all students:   node resetStudent.js reset");
      console.log(
        "  Create new student:   node resetStudent.js create <username> <email> <password> <name> <branch> <batchYear> <phone> [semCgpa] [activeBacklogs]"
      );
      console.log("\n📝 Examples:");
      console.log("  node resetStudent.js reset");
      console.log(
        '  node resetStudent.js create john2025 john@student.com pass123 "John Doe" "Computer Science" 2025 9876543210 "8.5,8.7,8.9" 0'
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
  resetStudents,
  createStudent,
  connectDB,
};
