const RaceDAO = require('../dao/RaceDAO');
const RaceClass = require('../model/Race');

function modelToPlain(r) {
  if (!r) return null;
  return {
    id: r.getId ? r.getId() : undefined,
    nom: r.getNom ? r.getNom() : undefined
  };
}

class RaceController {
  static async list(req, res) {
    try {
      const races = await RaceDAO.findAll();
      res.json(races.map(modelToPlain));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération des races' });
    }
  }

  static async get(req, res) {
    try {
      const id = parseInt(req.params.id);
      const race = await RaceDAO.getById(id);
      if (!race) return res.status(404).json({ error: 'Race non trouvée' });
      res.json(race);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la récupération de la race' });
    }
  }

  static async create(req, res) {
    try {
      const { nom } = req.body;
      const r = new RaceClass(null, nom);
      const created = await RaceDAO.create(r);
      res.status(201).json(created);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la création de la race' });
    }
  }
}

module.exports = RaceController;
