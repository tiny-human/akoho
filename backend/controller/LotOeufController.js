const LotOeufDAO = require('../dao/LotOeufDAO');
const LotOeufClass = require('../model/LotOeuf');
const OeufDAO = require('../dao/OeufDAO');
const LotDAO = require('../dao/LotDAO');
const LotClass = require('../model/Lot');

function modelToPlain(lo) {
  if (!lo) return null;
  return {
    id: lo.getId ? lo.getId() : undefined,
    idOeuf: lo.getIdOeuf ? lo.getIdOeuf() : undefined,
    date_enregistrement: lo.getDateEnregistrement ? lo.getDateEnregistrement() : undefined,
    quantite: lo.getQuantite ? lo.getQuantite() : undefined
  };
}

class LotOeufController {
  static async list(req, res) {
    try {
      const items = await LotOeufDAO.findAll();
      res.json(items.map(modelToPlain));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération des lot_oeufs' });
    }
  }

  static async get(req, res) {
    try {
      const id = parseInt(req.params.id);
      const item = await LotOeufDAO.getById(id);
      if (!item) return res.status(404).json({ error: 'lot_oeuf non trouvé' });
      res.json(modelToPlain(item));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération du lot_oeuf' });
    }
  }

  static async create(req, res) {
    try {
      const { idOeuf, date_enregistrement, quantite } = req.body;

      // 1. Enregistrer l'éclosion dans lot_oeuf
      const lo = new LotOeufClass(idOeuf, date_enregistrement, quantite);
      const eclosion = await LotOeufDAO.create(lo);

      // 2. Récupérer l'œuf parent pour connaître le lot d'origine
      const oeuf = await OeufDAO.getById(idOeuf);
      if (!oeuf) throw new Error('Oeuf introuvable');

      // 3. Récupérer le lot parent pour connaître la race
      const lotParent = await LotDAO.getById(oeuf.idLot);
      if (!lotParent) throw new Error('Lot parent introuvable');

      // 4. Créer un nouveau lot de poussins (PA = 0, age = 0)
      const nouveauLot = new LotClass(
        lotParent.idRace,       // même race
        quantite,               // quantité = poussins éclos
        date_enregistrement,    // date d'éclosion
        0,                      // age = 0 semaine
        0                       // PA = 0
      );
      const lotCree = await LotDAO.create(nouveauLot);

      res.status(201).json({
        ok: true,
        eclosion,
        nouveauLot: lotCree
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la création du lot_oeuf' });
    }
  }

  static async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { idOeuf, date_enregistrement, quantite } = req.body;
      const lo = new LotOeufClass(idOeuf, date_enregistrement, quantite);
      lo.setId(id);
      const result = await LotOeufDAO.update(lo);
      res.json({ ok: true, result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la mise à jour du lot_oeuf' });
    }
  }

  static async delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      await LotOeufDAO.delete(id);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la suppression du lot_oeuf' });
    }
  }

  static async getOeufsByLotId(req, res) {
    try {
      const id = parseInt(req.params.id);
      const oeufs = await LotOeufDAO.findByLotId(id);
      res.json(oeufs.map(modelToPlain));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération des oeufs du lot' });
    }
  }
}

module.exports = LotOeufController;
