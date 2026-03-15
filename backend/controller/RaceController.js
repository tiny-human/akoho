const RaceDAO = require('../dao/RaceDAO');
const RaceClass = require('../model/Race');

function modelToPlain(r) {
  if (!r) return null;
  return {
    id:               r.getId ? r.getId() : undefined,
    nom:              r.getNom ? r.getNom() : undefined,
    jours_incubation: r.getJoursIncubation ? r.getJoursIncubation() : undefined,
    taux_eclosion:    r.getTauxEclosion ? r.getTauxEclosion() : undefined,
    taux_femelle:     r.getTauxFemelle ? r.getTauxFemelle() : undefined,
    taux_mort_femelle:r.getTauxMortFemelle ? r.getTauxMortFemelle() : undefined,
    taux_mort_male:   r.getTauxMortMale ? r.getTauxMortMale() : undefined,
    capacite_ponte:   r.getCapacitePonte ? r.getCapacitePonte() : undefined,
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
      const {
        nom,
        jours_incubation,
        taux_eclosion,
        taux_femelle,
        taux_mort_femelle,
        taux_mort_male,
        capacite_ponte
      } = req.body;
      const r = new RaceClass(
        null,
        nom,
        jours_incubation ?? null,
        taux_eclosion ?? null,
        taux_femelle ?? null,
        taux_mort_femelle ?? null,
        taux_mort_male ?? null,
        capacite_ponte ?? null
      );
      const created = await RaceDAO.create(r);
      res.status(201).json(created);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la création de la race' });
    }
  }

  static async update(req, res) {
    try {
      const id = parseInt(req.params.id);
      const payload = {
        nom: req.body.nom,
        jours_incubation: req.body.jours_incubation ?? null,
        taux_eclosion: req.body.taux_eclosion ?? null,
        taux_femelle: req.body.taux_femelle ?? null,
        taux_mort_femelle: req.body.taux_mort_femelle ?? null,
        taux_mort_male: req.body.taux_mort_male ?? null,
        capacite_ponte: req.body.capacite_ponte ?? null,
      };
      const updated = await RaceDAO.update(id, payload);
      if (!updated) return res.status(404).json({ error: 'Race non trouvée' });
      res.json({ id, ...payload });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la mise à jour de la race' });
    }
  }
}

module.exports = RaceController;
