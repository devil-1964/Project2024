const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placementYearSchema = new Schema({
  year: {
    type: Number,
    required: true,
    unique: true
  },
  branches: [{
    branchName: {
      type: String,
      required: true
    },
    sanctionedIntake: {
      type: Number,
      required: true
    },
    eligibleInterestedStudents: {
      type: Number,
      required: true
    },
    totalPlacementIncludingHigherEducation: {
      type: Number,
      required: true
    },
    doubleOffers: {
      type: Number,
      required: true
    },
    noOfCompaniesVisited: {
      type: Number,
      required: true
    },
    placementPercentage: {
      type: Number,
      required: true
    },
    minimumPackageLPA: {
      type: Number,
      required: true
    },
    maximumPackageLPA: {
      type: Number,
      required: true
    },
    averagePackageLPA: {
      type: Number,
      required: true
    }
  }]
});

const PlacementYear = mongoose.model('PlacementYear', placementYearSchema);
module.exports = PlacementYear;
