const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {
  getPlants,
  getPlantById,
  uploadPlantImage,
  createPlant,
  deletePlant
} = require('../controllers/plantController');

// GET all plants & POST create plant (support single image upload with fieldname 'image')
router.route('/')
  .get(getPlants)
  .post(upload.single('image'), createPlant);

// POST standalone image upload (fieldname 'image')
router.post('/upload', upload.single('image'), uploadPlantImage);

// GET single plant & DELETE plant by ID
router.route('/:id')
  .get(getPlantById)
  .delete(deletePlant);

module.exports = router;
