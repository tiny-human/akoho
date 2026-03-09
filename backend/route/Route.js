const express = require('express');
const RaceController = require('../controller/RaceController');
const OeufController = require('../controller/OeufController');
const LotController = require('../controller/LotController');
const LotOeufController = require('../controller/LotOeufController');
const LotMortController = require('../controller/LotMortController');
const ConfPoidsController = require('../controller/ConfPoidsController');
const ConfPrixController = require('../controller/ConfPrixController');
const DashboardController = require('../controller/DashboardController');

const router = express.Router();

// ── Races ────────────────────────────────────────────────
router.get('/races', RaceController.list);
router.get('/races/:id', RaceController.get);
router.post('/races', RaceController.create);

// ── Lots ─────────────────────────────────────────────────
router.get('/lots', LotController.list);
router.get('/lots/:id', LotController.get);
router.post('/lots', LotController.create);
router.put('/lots/:id', LotController.update);
router.delete('/lots/:id', LotController.delete);

// ── Oeufs ────────────────────────────────────────────────
router.get('/oeufs', OeufController.list);
router.get('/oeufs/lot/:idLot', OeufController.findByLotId);
router.get('/oeufs/:id', OeufController.get);
router.post('/oeufs', OeufController.create);
router.put('/oeufs/:id', OeufController.update);
router.delete('/oeufs/:id', OeufController.delete);

// ── Lot-Oeufs (éclosion) ────────────────────────────────
router.get('/lot-oeufs', LotOeufController.list);
router.get('/lot-oeufs/lot/:id', LotOeufController.getOeufsByLotId);
router.get('/lot-oeufs/:id', LotOeufController.get);
router.post('/lot-oeufs', LotOeufController.create);
router.put('/lot-oeufs/:id', LotOeufController.update);
router.delete('/lot-oeufs/:id', LotOeufController.delete);

// ── Lot-Mort ─────────────────────────────────────────────
router.get('/lot-morts', LotMortController.list);
router.get('/lot-morts/lot/:idLot', LotMortController.findByLot);
router.get('/lot-morts/:id', LotMortController.get);
router.post('/lot-morts', LotMortController.create);
router.put('/lot-morts/:id', LotMortController.update);
router.delete('/lot-morts/:id', LotMortController.delete);

// ── Conf Poids ───────────────────────────────────────────
router.get('/conf-poids', ConfPoidsController.list);
router.get('/conf-poids/race/:idRace', ConfPoidsController.findByRace);
router.get('/conf-poids/:id', ConfPoidsController.get);
router.post('/conf-poids', ConfPoidsController.create);
router.put('/conf-poids/:id', ConfPoidsController.update);
router.delete('/conf-poids/:id', ConfPoidsController.delete);

// ── Conf Prix ────────────────────────────────────────────
router.get('/conf-prix', ConfPrixController.list);
router.get('/conf-prix/race/:idRace', ConfPrixController.findByRace);
router.get('/conf-prix/:id', ConfPrixController.get);
router.post('/conf-prix', ConfPrixController.create);
router.put('/conf-prix/:id', ConfPrixController.update);
router.delete('/conf-prix/:id', ConfPrixController.delete);

// ── Dashboard ────────────────────────────────────────────
router.get('/dashboard', DashboardController.getDashboard);

module.exports = router;