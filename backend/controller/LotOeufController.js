const LotOeufDAO = require('../dao/LotOeufDAO');
const LotOeufClass = require('../model/LotOeuf');

class LotOeufController {
  static async list(req, res) {
    try {
      const items = await LotOeufDAO.findAll();
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération des lot_oeufs' });
    }
  }

  static async get(req, res) {
    try {
      const id = parseInt(req.params.id);
      const tmp = { getId: () => id };
      const item = await LotOeufDAO.getById(tmp);
      if (!item) return res.status(404).json({ error: 'lot_oeuf non trouvé' });
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération du lot_oeuf' });
    }
  }

  static async create(req, res) {
    try {
      const { idOeuf } = req.body;
      const lo = new LotOeufClass(idOeuf);
      const result = await LotOeufDAO.create(lo);
      res.status(201).json({ ok: true, result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la création du lot_oeuf' });
    }
  }

  static async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { idOeuf } = req.body;
      const lo = new LotOeufClass(idOeuf);
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
      const lo = new LotOeufClass();
      lo.setId(id);
      await LotOeufDAO.delete(lo);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la suppression du lot_oeuf' });
    }
  }

  static async getOeufsByLotId(req, res) {
    try {
      const id = parseInt(req.params.id);
      const tmp = { getId: () => id };
      const oeufs = await LotOeufDAO.findOeufByLotId(tmp);
      res.json(oeufs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération des oeufs du lot' });
    }
}
}

module.exports = LotOeufController;
