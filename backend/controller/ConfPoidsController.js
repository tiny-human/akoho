const ConfPoidsDAO = require('../dao/ConfPoidsDAO');
const ConfPoidsModel = require('../model/ConfPoids');

class ConfPoidsController {
  static async list(req, res) {
    try {
      const items = await ConfPoidsDAO.findAll();
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur récupération conf_poids' });
    }
  }

  static async get(req, res) {
    try {
      const id = parseInt(req.params.id);
      const item = await ConfPoidsDAO.getById(id);
      if (!item) return res.status(404).json({ error: 'ConfPoids non trouvé' });
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur récupération conf_poids' });
    }
  }

  static async findByRace(req, res) {
    try {
      const idRace = parseInt(req.params.idRace);
      const items = await ConfPoidsDAO.findByRace(idRace);
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur récupération conf_poids par race' });
    }
  }

  static async create(req, res) {
    try {
      const { idRace, semaine, VarPoids, sakafo } = req.body;
      const cp = new ConfPoidsModel(idRace, semaine, VarPoids, sakafo);
      const result = await ConfPoidsDAO.create(cp);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur création conf_poids' });
    }
  }

  static async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const { idRace, semaine, VarPoids, sakafo } = req.body;
      const cp = new ConfPoidsModel(idRace, semaine, VarPoids, sakafo);
      cp.setId(id);
      await ConfPoidsDAO.update(cp);
      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur mise à jour conf_poids' });
    }
  }

  static async delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      await ConfPoidsDAO.delete(id);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur suppression conf_poids' });
    }
  }
}

module.exports = ConfPoidsController;
