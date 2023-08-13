const express = require('express');
const router = express.Router();

const ads = require('../controllers/ads.controller');

router.get('/ads', ads.getAll);
router.get('/ads/:id', ads.getById);
router.get('/ads/search/:searchPhrase', ads.getBySearchPhrase);
router.post('/ads', ads.addNew);
router.detele('/ads/:id', ads.removeById);
router.put('/ads/:id', ads.modifyById);

module.exports = router;