const LotMortDAO = require('../dao/LotMortDAO');
const LotMortClass = require('../model/LotMort');

class LotMortController {
  static async list(req, res) {
    try {
      const items = await LotMortDAO.findAll();
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération des lot_morts' });
    }
  }

  static async get(req, res) {
    try {
      const id = parseInt(req.params.id);
      const tmp = { getId: () => id };
      const item = await LotMortDAO.getById(tmp);
      if (!item) return res.status(404).json({ error: 'lot_mort non trouvé' });
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération du lot_mort' });
    }
  }

  static async create(req, res) {
    try {
      const { idLot, dateMort, quantite } = req.body;
      const lm = new LotMortClass(idLot, quantite, dateMort);
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
      const { idLot, dateMort, quantite } = req.body;
      const lm = new LotMortClass(idLot, quantite, dateMort);
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
      const lm = new LotMortClass();
      lm.setId(id);
      await LotMortDAO.delete(lm);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la suppression du lot_mort' });
    }
  }

    static async findByLot(req, res) {
        try {
          const idLot = parseInt(req.params.idLot);
          const tmp = { getIdLot: () => idLot };
          const items = await LotMortDAO.findByLot(tmp);
          res.json(items);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Erreur lors de la récupération des lot_morts par lot' });
        }
    }
}

module.exports = LotMortController;
