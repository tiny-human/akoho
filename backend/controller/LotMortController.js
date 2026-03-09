const LotMortDAO = require('../dao/LotMortDAO');
const LotMortClass = require('../model/LotMort');

function modelToPlain(lm) {
  if (!lm) return null;
  return {
    id: lm.getId ? lm.getId() : undefined,
    idLot: lm.getIdLot ? lm.getIdLot() : undefined,
    date_enregistrement: lm.getDateEnregistrement ? lm.getDateEnregistrement() : undefined,
    quantite: lm.getQuantite ? lm.getQuantite() : undefined
  };
}

class LotMortController {
  static async list(req, res) {
    try {
      const items = await LotMortDAO.findAll();
      res.json(items.map(modelToPlain));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération des lot_morts' });
    }
  }

  static async get(req, res) {
    try {
      const id = parseInt(req.params.id);
      const item = await LotMortDAO.getById(id);
      if (!item) return res.status(404).json({ error: 'lot_mort non trouvé' });
      res.json(modelToPlain(item));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération du lot_mort' });
    }
  }

  static async create(req, res) {
    try {
      const { idLot, date_enregistrement, quantite } = req.body;
      const lm = new LotMortClass(idLot, quantite, date_enregistrement);
      const result = await LotMortDAO.create(lm);
      res.status(201).json({ ok: true, result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la création du lot_mort' });
    }
  }

  static async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { idLot, date_enregistrement, quantite } = req.body;
      const lm = new LotMortClass(idLot, quantite, date_enregistrement);
      lm.setId(id);
      const result = await LotMortDAO.update(lm);
      res.json({ ok: true, result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la mise à jour du lot_mort' });
    }
  }

  static async delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      await LotMortDAO.delete(id);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la suppression du lot_mort' });
    }
  }

  static async findByLot(req, res) {
    try {
      const idLot = parseInt(req.params.idLot);
      const items = await LotMortDAO.findByLot(idLot);
      res.json(items.map(modelToPlain));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération des lot_morts par lot' });
    }
  }
}

module.exports = LotMortController;
