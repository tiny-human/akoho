const express = require('express');
const RaceController = require('../controller/RaceController');
const OeufController = require('../controller/OeufController');
const LotController = require('../controller/LotController');
const LotOeufController = require('../controller/LotOeufController');

const router = express.Router();

router.get('/races', RaceController.list);
router.get('/lots', LotController.list);
router.get('/oeufs', OeufController.list);

router.get('/lot-oeufs/lots/:id', LotOeufController.getOeufsByLotId);