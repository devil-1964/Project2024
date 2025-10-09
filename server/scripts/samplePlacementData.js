const mongoose = require("mongoose");
require("dotenv").config();

// Import models
const PlacementYear = require("../models/PlacementDetails");

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected for placement data setup");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

// Sample placement data for multiple years
const samplePlacementData = [
  {
    year: 2023,
    branches: [
      {
        branchName: "Computer Science",
        sanctionedIntake: 120,
        eligibleInterestedStudents: 115,
        totalPlacementIncludingHigherEducation: 108,
        doubleOffers: 12,
        noOfCompaniesVisited: 45,
        placementPercentage: 93.9,
        minimumPackageLPA: 3.5,
        maximumPackageLPA: 28.0,
        averagePackageLPA: 8.2,
      },
      {
        branchName: "Electrical Engineering",
        sanctionedIntake: 60,
        eligibleInterestedStudents: 58,
        totalPlacementIncludingHigherEducation: 52,
        doubleOffers: 3,
        noOfCompaniesVisited: 25,
        placementPercentage: 89.7,
        minimumPackageLPA: 3.2,
        maximumPackageLPA: 15.5,
        averagePackageLPA: 6.8,
      },
      {
        branchName: "Mechanical Engineering",
        sanctionedIntake: 60,
        eligibleInterestedStudents: 57,
        totalPlacementIncludingHigherEducation: 48,
        doubleOffers: 2,
        noOfCompaniesVisited: 22,
        placementPercentage: 84.2,
        minimumPackageLPA: 3.0,
        maximumPackageLPA: 12.0,
        averagePackageLPA: 5.9,
      },
      {
        branchName: "Civil Engineering",
        sanctionedIntake: 60,
        eligibleInterestedStudents: 55,
        totalPlacementIncludingHigherEducation: 45,
        doubleOffers: 1,
        noOfCompaniesVisited: 18,
        placementPercentage: 81.8,
        minimumPackageLPA: 2.8,
        maximumPackageLPA: 10.5,
        averagePackageLPA: 5.2,
      },
      {
        branchName: "Electronics",
        sanctionedIntake: 60,
        eligibleInterestedStudents: 56,
        totalPlacementIncludingHigherEducation: 50,
        doubleOffers: 4,
        noOfCompaniesVisited: 28,
        placementPercentage: 89.3,
        minimumPackageLPA: 3.2,
        maximumPackageLPA: 18.0,
        averagePackageLPA: 7.1,
      },
    ],
  },
  {
    year: 2022,
    branches: [
      {
        branchName: "Computer Science",
        sanctionedIntake: 120,
        eligibleInterestedStudents: 118,
        totalPlacementIncludingHigherEducation: 105,
        doubleOffers: 8,
        noOfCompaniesVisited: 42,
        placementPercentage: 89.0,
        minimumPackageLPA: 3.2,
        maximumPackageLPA: 25.0,
        averagePackageLPA: 7.8,
      },
      {
        branchName: "Electrical Engineering",
        sanctionedIntake: 60,
        eligibleInterestedStudents: 59,
        totalPlacementIncludingHigherEducation: 49,
        doubleOffers: 2,
        noOfCompaniesVisited: 23,
        placementPercentage: 83.1,
        minimumPackageLPA: 3.0,
        maximumPackageLPA: 14.0,
        averagePackageLPA: 6.2,
      },
      {
        branchName: "Mechanical Engineering",
        sanctionedIntake: 60,
        eligibleInterestedStudents: 58,
        totalPlacementIncludingHigherEducation: 44,
        doubleOffers: 1,
        noOfCompaniesVisited: 20,
        placementPercentage: 75.9,
        minimumPackageLPA: 2.8,
        maximumPackageLPA: 11.5,
        averagePackageLPA: 5.5,
      },
      {
        branchName: "Civil Engineering",
        sanctionedIntake: 60,
        eligibleInterestedStudents: 57,
        totalPlacementIncludingHigherEducation: 42,
        doubleOffers: 0,
        noOfCompaniesVisited: 16,
        placementPercentage: 73.7,
        minimumPackageLPA: 2.5,
        maximumPackageLPA: 9.5,
        averagePackageLPA: 4.8,
      },
      {
        branchName: "Electronics",
        sanctionedIntake: 60,
        eligibleInterestedStudents: 58,
        totalPlacementIncludingHigherEducation: 47,
        doubleOffers: 3,
        noOfCompaniesVisited: 26,
        placementPercentage: 81.0,
        minimumPackageLPA: 3.0,
        maximumPackageLPA: 16.5,
        averagePackageLPA: 6.7,
      },
    ],
  },
  {
    year: 2021,
    branches: [
      {
        branchName: "Computer Science",
        sanctionedIntake: 120,
        eligibleInterestedStudents: 116,
        totalPlacementIncludingHigherEducation: 98,
        doubleOffers: 6,
        noOfCompaniesVisited: 38,
        placementPercentage: 84.5,
        minimumPackageLPA: 3.0,
        maximumPackageLPA: 22.0,
        averagePackageLPA: 7.2,
      },
      {
        branchName: "Electrical Engineering",
        sanctionedIntake: 60,
        eligibleInterestedStudents: 57,
        totalPlacementIncludingHigherEducation: 45,
        doubleOffers: 1,
        noOfCompaniesVisited: 21,
        placementPercentage: 78.9,
        minimumPackageLPA: 2.8,
        maximumPackageLPA: 13.0,
        averagePackageLPA: 5.8,
      },
      {
        branchName: "Mechanical Engineering",
        sanctionedIntake: 60,
        eligibleInterestedStudents: 55,
        totalPlacementIncludingHigherEducation: 40,
        doubleOffers: 0,
        noOfCompaniesVisited: 18,
        placementPercentage: 72.7,
        minimumPackageLPA: 2.5,
        maximumPackageLPA: 10.0,
        averagePackageLPA: 5.1,
      },
      {
        branchName: "Civil Engineering",
        sanctionedIntake: 60,
        eligibleInterestedStudents: 54,
        totalPlacementIncludingHigherEducation: 38,
        doubleOffers: 0,
        noOfCompaniesVisited: 14,
        placementPercentage: 70.4,
        minimumPackageLPA: 2.4,
        maximumPackageLPA: 8.5,
        averagePackageLPA: 4.5,
      },
      {
        branchName: "Electronics",
        sanctionedIntake: 60,
        eligibleInterestedStudents: 56,
        totalPlacementIncludingHigherEducation: 43,
        doubleOffers: 2,
        noOfCompaniesVisited: 24,
        placementPercentage: 76.8,
        minimumPackageLPA: 2.8,
        maximumPackageLPA: 15.0,
        averagePackageLPA: 6.2,
      },
    ],
  },
];

// Function to reset and create sample placement data
const createSamplePlacementData = async () => {
  try {
    console.log("🔄 Starting sample placement data creation process...\n");

    // Step 1: Get all existing placement records
    const existingRecords = await PlacementYear.find({});
    console.log(
      `📊 Found ${existingRecords.length} existing placement record(s)`
    );

    // Step 2: Delete all existing placement records
    const deletedRecords = await PlacementYear.deleteMany({});
    console.log(
      `🗑️  Deleted ${deletedRecords.deletedCount} placement record(s)`
    );

    // Step 3: Create new sample placement data
    console.log("📝 Creating sample placement data...\n");

    const createdRecords = [];
    for (const yearData of samplePlacementData) {
      const placementRecord = await PlacementYear.create(yearData);
      createdRecords.push(placementRecord);
      console.log(
        `✅ Created placement record for year ${yearData.year} with ${yearData.branches.length} branches`
      );

      // Log some statistics for each year
      const totalStudents = yearData.branches.reduce(
        (sum, branch) => sum + branch.eligibleInterestedStudents,
        0
      );
      const totalPlacements = yearData.branches.reduce(
        (sum, branch) => sum + branch.totalPlacementIncludingHigherEducation,
        0
      );
      const overallPercentage = (
        (totalPlacements / totalStudents) *
        100
      ).toFixed(1);
      console.log(
        `   📈 Overall placement: ${totalPlacements}/${totalStudents} (${overallPercentage}%)`
      );
    }

    // Summary
    console.log("\n🎉 Sample placement data creation completed successfully!");
    console.log("📋 Summary:");
    console.log(
      `   📅 Years covered: ${samplePlacementData
        .map((y) => y.year)
        .join(", ")}`
    );
    console.log(
      `   📚 Branches: Computer Science, Electrical Engineering, Mechanical Engineering, Civil Engineering, Electronics`
    );
    console.log(`   📊 Total records created: ${createdRecords.length}`);

    // Calculate overall statistics
    let grandTotalStudents = 0;
    let grandTotalPlacements = 0;

    samplePlacementData.forEach((yearData) => {
      const yearStudents = yearData.branches.reduce(
        (sum, branch) => sum + branch.eligibleInterestedStudents,
        0
      );
      const yearPlacements = yearData.branches.reduce(
        (sum, branch) => sum + branch.totalPlacementIncludingHigherEducation,
        0
      );
      grandTotalStudents += yearStudents;
      grandTotalPlacements += yearPlacements;
    });

    const grandOverallPercentage = (
      (grandTotalPlacements / grandTotalStudents) *
      100
    ).toFixed(1);
    console.log(
      `   🎯 Grand total placement: ${grandTotalPlacements}/${grandTotalStudents} (${grandOverallPercentage}%)`
    );
  } catch (error) {
    console.error(
      "❌ Error during sample placement data creation:",
      error.message
    );
    throw error;
  }
};

// Function to add placement data for a specific year (without removing existing data)
const addPlacementYear = async (year, branchesData) => {
  try {
    console.log(`🔄 Adding placement data for year ${year}...\n`);

    // Check if year already exists
    const existingYear = await PlacementYear.findOne({ year });
    if (existingYear) {
      throw new Error(`Placement data for year ${year} already exists`);
    }

    // Create new placement year record
    const newPlacementYear = await PlacementYear.create({
      year,
      branches: branchesData,
    });

    console.log(`✅ Successfully added placement data for year ${year}`);
    console.log(`   📚 Branches added: ${branchesData.length}`);

    const totalStudents = branchesData.reduce(
      (sum, branch) => sum + branch.eligibleInterestedStudents,
      0
    );
    const totalPlacements = branchesData.reduce(
      (sum, branch) => sum + branch.totalPlacementIncludingHigherEducation,
      0
    );
    const overallPercentage = ((totalPlacements / totalStudents) * 100).toFixed(
      1
    );
    console.log(
      `   📈 Overall placement: ${totalPlacements}/${totalStudents} (${overallPercentage}%)`
    );

    return newPlacementYear;
  } catch (error) {
    console.error(
      `❌ Error adding placement data for year ${year}:`,
      error.message
    );
    throw error;
  }
};

// Main execution function
const main = async () => {
  try {
    await connectDB();

    // Check command line arguments
    const args = process.argv.slice(2);

    if (args.length === 0) {
      // Default: create sample data
      await createSamplePlacementData();
    } else if (args[0] === "--help" || args[0] === "-h") {
      console.log("📖 Usage:");
      console.log(
        "  node samplePlacementData.js              Create sample placement data (replaces existing)"
      );
      console.log(
        "  node samplePlacementData.js --help       Show this help message"
      );
      console.log("");
      console.log(
        "💡 This script creates sample placement data for years 2021, 2022, and 2023"
      );
      console.log("   with realistic placement statistics for 5 branches.");
    } else {
      console.log("❌ Unknown argument. Use --help for usage information.");
      process.exit(1);
    }
  } catch (error) {
    console.error("💥 Script execution failed:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("👋 Database connection closed");
    process.exit(0);
  }
};

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  createSamplePlacementData,
  addPlacementYear,
  connectDB,
};
