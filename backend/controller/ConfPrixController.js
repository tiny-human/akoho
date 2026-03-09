const ConfPrixDAO = require('../dao/ConfPrixDAO');
const ConfPrixModel = require('../model/ConfPrix');

class ConfPrixController {
  static async list(req, res) {
    try {
      const items = await ConfPrixDAO.findAll();
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur récupération conf_prix' });
    }
  }

  static async get(req, res) {
    try {
      const id = parseInt(req.params.id);
      const item = await ConfPrixDAO.getById(id);
      if (!item) return res.status(404).json({ error: 'ConfPrix non trouvé' });
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur récupération conf_prix' });
    }
  }

  static async findByRace(req, res) {
    try {
      const idRace = parseInt(req.params.idRace);
      const item = await ConfPrixDAO.findByRace(idRace);
      if (!item) return res.status(404).json({ error: 'ConfPrix non trouvé pour cette race' });
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur récupération conf_prix par race' });
    }
  }

  static async create(req, res) {
    try {
      const { idRace, PvSakafo, PvAkoho, PvOeuf } = req.body;
      const cp = new ConfPrixModel(idRace, PvSakafo, PvAkoho, PvOeuf);
      const result = await ConfPrixDAO.create(cp);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur création conf_prix' });
    }
  }

  static async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { idRace, PvSakafo, PvAkoho, PvOeuf } = req.body;
      const cp = new ConfPrixModel(idRace, PvSakafo, PvAkoho, PvOeuf);
      cp.setId(id);
      await ConfPrixDAO.update(cp);
      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur mise à jour conf_prix' });
    }
  }

  static async delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      await ConfPrixDAO.delete(id);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur suppression conf_prix' });
    }
  }
}

module.exports = ConfPrixController;
