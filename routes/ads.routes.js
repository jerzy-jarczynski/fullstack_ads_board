const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

const ads = require('../controllers/ads.controller');

router.get('/ads', ads.getAll);
router.get('/ads/:id', ads.getById);
router.get('/ads/search/:searchPhrase', ads.getBySearchPhrase);
router.post('/ads', authMiddleware, imageUpload.single('image'), ads.addNew);
router.put('/ads/:id', authMiddleware, imageUpload.single('image'), ads.modifyById);
router.delete('/ads/:id', authMiddleware, ads.removeById);

module.exports = router;