
const PlacementYear = require('../models/PlacementDetails');

// Helper to normalize and validate branch entries
const normalizeBranches = (branches) => {
  if (!Array.isArray(branches)) return null;
  return branches.map((b) => ({
    branchName: String(b.branchName || '').trim(),
    sanctionedIntake: Number(b.sanctionedIntake),
    eligibleInterestedStudents: Number(b.eligibleInterestedStudents),
    totalPlacementIncludingHigherEducation: Number(b.totalPlacementIncludingHigherEducation),
    doubleOffers: Number(b.doubleOffers),
    noOfCompaniesVisited: Number(b.noOfCompaniesVisited),
    placementPercentage: Number(b.placementPercentage),
    minimumPackageLPA: Number(b.minimumPackageLPA),
    maximumPackageLPA: Number(b.maximumPackageLPA),
    averagePackageLPA: Number(b.averagePackageLPA),
  }));
};

const createPlacementYear = async (req, res) => {
  try {
    const { year, branches } = req.body;
    const parsedYear = Number(year);
    if (!parsedYear || !Array.isArray(branches)) {
      return res.status(400).json({ message: 'Invalid payload: year and branches are required' });
    }

    const normalizedBranches = normalizeBranches(branches);
    if (!normalizedBranches) {
      return res.status(400).json({ message: 'Invalid branches format' });
    }

    const placementYear = new PlacementYear({
      year: parsedYear,
      branches: normalizedBranches,
    });

    await placementYear.save();
    res.status(201).json({ message: 'Placement Year data created successfully!', placementYear });
  } catch (err) {
    // Handle duplicate year error gracefully
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Placement Year already exists' });
    }
    res.status(500).json({ message: 'Error creating Placement Year', error: err.message });
  }
};

const getPlacementYear = async (req, res) => {
  try {
    const { year } = req.params;
    const placementYear = await PlacementYear.findOne({ year });

    if (!placementYear) {
      return res.status(404).json({ message: 'Placement Year not found' });
    }

    res.status(200).json(placementYear);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Placement Year data', error: err.message });
  }
};

const editPlacementYear = async (req, res) => {
  try {
    const { year } = req.params;
    const { branches } = req.body;

    if (!Array.isArray(branches)) {
      return res.status(400).json({ message: 'Invalid branches format' });
    }
    const normalizedBranches = normalizeBranches(branches);

    const updatedPlacementYear = await PlacementYear.findOneAndUpdate(
      { year: Number(year) },
      { $set: { branches: normalizedBranches } },
      { new: true }
    );

    if (!updatedPlacementYear) {
      return res.status(404).json({ message: 'Placement Year not found' });
    }

    res.status(200).json({ message: 'Placement Year updated successfully!', updatedPlacementYear });
  } catch (err) {
    res.status(500).json({ message: 'Error updating Placement Year data', error: err.message });
  }
};

const deletePlacementYear = async (req, res) => {
  try {
    const { year } = req.params;

    const deletedPlacementYear = await PlacementYear.findOneAndDelete({ year });

    if (!deletedPlacementYear) {
      return res.status(404).json({ message: 'Placement Year not found' });
    }

    res.status(200).json({ message: 'Placement Year deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting Placement Year', error: err.message });
  }
};

const getAllPlacementYears = async (req, res) => {
  try {
    const years = await PlacementYear.find({}, { year: 1, _id: 0 });

    if (!years.length) {
      return res.status(404).json({ message: 'No Placement Years found' });
    }

    res.status(200).json({ years });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all Placement Years', error: err.message });
  }
};

module.exports = {
  createPlacementYear,
  getPlacementYear,
  editPlacementYear,
  deletePlacementYear,
  getAllPlacementYears
};
