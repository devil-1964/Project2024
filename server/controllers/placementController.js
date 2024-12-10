
const PlacementYear = require('../models/PlacementDetails');

const createPlacementYear = async (req, res) => {
  try {
    const { year, branches } = req.body;
    
    const placementYear = new PlacementYear({
      year,
      branches
    });

    await placementYear.save();
    res.status(201).json({ message: 'Placement Year data created successfully!', placementYear });
  } catch (err) {
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

    const updatedPlacementYear = await PlacementYear.findOneAndUpdate(
      { year },
      { $set: { branches } },
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
