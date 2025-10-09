const express = require('express');
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
    createPlacementYear,
    getPlacementYear,
    editPlacementYear,
    deletePlacementYear,
    getAllPlacementYears,
} = require("../controllers/placementController");

// Public routes (for viewing placement data)
router.get('/placement-year/:year', getPlacementYear);
router.get('/placement-years', getAllPlacementYears);

// Protected routes (admin only)
router.post('/placement-year', protect, authorize(["admin"]), createPlacementYear);
router.put('/placement-year/:year', protect, authorize(["admin"]), editPlacementYear);
router.delete('/placement-year/:year', protect, authorize(["admin"]), deletePlacementYear);

module.exports = router;
