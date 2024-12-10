const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    createPlacementYear,
    getPlacementYear,
    editPlacementYear,
    deletePlacementYear,
    getAllPlacementYears,
  } = require("../controllers/placementController");

router.post('/placement-year',protect, createPlacementYear);

router.get('/placement-year/:year', getPlacementYear);

router.put('/placement-year/:year',protect, editPlacementYear);

router.delete('/placement-year/:year',protect, deletePlacementYear);

router.get('/placement-years', getAllPlacementYears);

module.exports = router;
