const LotDAO = require('../dao/LotDAO');
const LotClass = require('../model/Lot');

function modelToPlain(l) {
    if (!l) return null;
    return {
        id: l.getId ? l.getId() : undefined,
        idRace: l.getIdRace ? l.getIdRace() : undefined,
        quantite: l.getQuantite ? l.getQuantite() : undefined,
        date_enregistrement: l.getDateEnregistrement ? l.getDateEnregistrement() : undefined,
        age: l.getAge ? l.getAge() : undefined,
        PA: l.getPA ? l.getPA() : undefined,
        nb_femelles: l.getNbFemelles ? l.getNbFemelles() : undefined,
        nb_males: l.getNbMales ? l.getNbMales() : undefined,
        potentiel_oeufs_total: l.getPotentielOeufsTotal ? l.getPotentielOeufsTotal() : undefined,
        perte_eclosion: l.getPerteEclosion ? l.getPerteEclosion() : undefined,
    };
}

class LotController {
    static async list(req, res) {
        try {
            const lots = await LotDAO.findAll();
            res.json(lots.map(modelToPlain));
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la récupération des lots' });
        }
    }

    static async get(req, res) {
        try {
            const id = parseInt(req.params.id);
            const lot = await LotDAO.getById(id);
            if (!lot) return res.status(404).json({ error: 'Lot non trouvé' });
            res.json(lot);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la récupération du lot' });
        }
    }

    static async create(req, res) {
        try {
                        const { idRace, quantite, date_enregistrement, age, PA, nb_femelles, nb_males, potentiel_oeufs_total, perte_eclosion } = req.body;
                        const l = new LotClass(
                            idRace,
                            quantite,
                            date_enregistrement,
                            age,
                            PA,
                            nb_femelles ?? null,
                            nb_males ?? null,
                            potentiel_oeufs_total ?? null,
                            perte_eclosion ?? null
                        );
            const result = await LotDAO.create(l);
            res.status(201).json({ ok: true, result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la création du lot' });
        }
    }

    static async update(req, res) {
        try {
            const id = parseInt(req.params.id);
                        const { idRace, quantite, date_enregistrement, age, PA, nb_femelles, nb_males, potentiel_oeufs_total, perte_eclosion } = req.body;
                        const l = new LotClass(
                            idRace,
                            quantite,
                            date_enregistrement,
                            age,
                            PA,
                            nb_femelles ?? null,
                            nb_males ?? null,
                            potentiel_oeufs_total ?? null,
                            perte_eclosion ?? null
                        );
            l.setId(id);
            const result = await LotDAO.update(l);
            res.json({ ok: true, result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la mise à jour du lot' });
        }
    }

    static async delete(req, res) {
        try {
            const id = parseInt(req.params.id);
            await LotDAO.delete(id);
            res.status(204).end();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la suppression du lot' });
        }
    }

    /**
     * GET /api/lots/alive — lots ayant encore des poulets vivants
     */
    static async listAlive(req, res) {
        try {
            const lots = await LotDAO.findAllAlive();
            res.json(lots.map(modelToPlain));
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la récupération des lots vivants' });
        }
    }

}
module.exports = LotController;
