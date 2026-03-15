const LotMortDAO = require('../dao/LotMortDAO');
const LotMortClass = require('../model/LotMort');
const LotDAO = require('../dao/LotDAO');

function modelToPlain(lm) {
  if (!lm) return null;
  return {
    id: lm.getId ? lm.getId() : undefined,
    idLot: lm.getIdLot ? lm.getIdLot() : undefined,
    date_enregistrement: lm.getDateEnregistrement ? lm.getDateEnregistrement() : undefined,
    quantite: lm.getQuantite ? lm.getQuantite() : undefined,
    nb_femelles: lm.getNbFemelles ? lm.getNbFemelles() : undefined,
    nb_males: lm.getNbMales ? lm.getNbMales() : undefined,
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

      // Vérifier que la quantité ne dépasse pas les poulets vivants
      const vivants = await LotDAO.getRemainingAlive(idLot);
      if (quantite > vivants) {
        return res.status(400).json({
          error: `Quantité trop élevée : il ne reste que ${vivants} poulet(s) vivant(s) dans ce lot`
        });
      }

      const lot = await LotDAO.getByIdWithRace(idLot);
      const tauxFemelleMort = Number(lot?.taux_mort_femelle ?? 50);
      const nbFemelles = Math.max(0, Math.round(quantite * (tauxFemelleMort / 100)));
      const nbMales = Math.max(0, quantite - nbFemelles);

      const lm = new LotMortClass(idLot, quantite, date_enregistrement, nbFemelles, nbMales);
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
      const { idLot, date_enregistrement, quantite, nb_femelles, nb_males } = req.body;
      const lm = new LotMortClass(idLot, quantite, date_enregistrement, nb_femelles ?? null, nb_males ?? null);
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
