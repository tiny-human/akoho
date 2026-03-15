const OeufDAO = require('../dao/OeufDAO');
const OeufClass = require('../model/Oeuf');
const LotDAO = require('../dao/LotDAO');
const LotOeufDAO = require('../dao/LotOeufDAO');
const LotOeufClass = require('../model/LotOeuf');
const OeufDechetDAO = require('../dao/OeufDechetDAO');
const ConfPrixDAO = require('../dao/ConfPrixDAO');
const LotClass = require('../model/Lot');

function modelToPlain(o) {
    if (!o) return null;
    return {
        id: o.getId ? o.getId() : undefined,
        idLot: o.getIdLot ? o.getIdLot() : undefined,
        date_ponte: o.getDatePonte ? o.getDatePonte() : undefined,
        quantite: o.getQuantite ? o.getQuantite() : undefined
    };
}

class OeufController {
    static async list(req, res) {
        try {
            const items = await OeufDAO.findAll();
            res.json(items.map(modelToPlain));
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la récupération des oeufs' });
        }
    }

    static async get(req, res) {
        try {
            const id = parseInt(req.params.id);
            const item = await OeufDAO.getById(id);
            if (!item) return res.status(404).json({ error: 'Oeuf non trouvé' });
            res.json(item);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la récupération de l oeuf' });
        }
    }

    static async create(req, res) {
        try {
            const { idLot, date_ponte, quantite } = req.body;

            if (!idLot || !date_ponte || !quantite || quantite <= 0) {
                return res.status(400).json({ error: 'Paramètres invalides pour la création d\'oeuf' });
            }

            const lot = await LotDAO.getByIdWithRace(idLot);
            if (!lot) {
                return res.status(404).json({ error: 'Lot introuvable' });
            }

            // Contrôle capacité de ponte dynamique : les mortes femelles réduisent la capacité restante
            const dejaPondus = await OeufDAO.getTotalPondusByLot(idLot);
            const capacity = await LotDAO.getCurrentEggCapacity(idLot);
            if (capacity && capacity.maxTotal != null) {
                const restant = Math.max(0, Number(capacity.maxTotal) - Number(dejaPondus));
                if (quantite > restant) {
                    return res.status(400).json({
                        error: `Quantité trop élevée : il ne reste que ${restant} oeuf(s) possible(s) pour ce lot (femelles vivantes: ${capacity.femellesVivantes ?? 'N/A'})`
                    });
                }
            }

            const o = new OeufClass(idLot, date_ponte, quantite);
            const result = await OeufDAO.create(o);

            // Éclosion planifiée automatiquement selon la config race
            const joursIncubation = Number(lot.jours_incubation ?? 0);
            const tauxEclosion = Number(lot.taux_eclosion ?? 100);
            const tauxFemelle = Number(lot.taux_femelle ?? 50);
            const capacitePonte = Number(lot.capacite_ponte ?? 0);

            const datePonte = new Date(date_ponte);
            const dateEclosion = new Date(datePonte.getTime() + joursIncubation * 86400000);

            const vraiEclos = Math.max(0, Math.round(quantite * (tauxEclosion / 100)));
            const dechets = Math.max(0, quantite - vraiEclos);

            const femelles = Math.max(0, Math.round(vraiEclos * (tauxFemelle / 100)));
            const males = Math.max(0, vraiEclos - femelles);

            // lot_oeuf = oeufs éclos réels à la date d'éclosion
            let eclosion = null;
            if (vraiEclos > 0) {
                const lo = new LotOeufClass(result.id, dateEclosion, vraiEclos);
                eclosion = await LotOeufDAO.create(lo);
            }

            // Déchets automatiquement enregistrés à la date d'éclosion
            let dechet = null;
            if (dechets > 0) {
                dechet = await OeufDechetDAO.create(result.id, dechets, dateEclosion);
            }

            // Perte = dechets * PV_oeuf (info dashboard, sans impact bénéfice)
            const confPrixMap = await ConfPrixDAO.findAllAsMap();
            const pvOeuf = Number(confPrixMap[lot.idRace]?.PV_oeuf || 0);
            const perteEclosion = dechets * pvOeuf;

            let lotFille = null;
            if (vraiEclos > 0) {
                const potentiel = capacitePonte > 0 ? femelles * capacitePonte : null;
                const nouveauLot = new LotClass(
                    lot.idRace,
                    vraiEclos,
                    dateEclosion,
                    0,
                    0,
                    femelles,
                    males,
                    potentiel,
                    perteEclosion
                );
                lotFille = await LotDAO.create(nouveauLot);
            }

            res.status(201).json({
                ok: true,
                result,
                eclosion,
                dechet,
                lotFille,
                simulation: {
                    dateEclosion,
                    vraiEclos,
                    dechets,
                    perte: perteEclosion,
                    femelles,
                    males
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la création de l oeuf' });
        }
    }

    static async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            const { idLot, date_ponte, quantite } = req.body;
            const o = new OeufClass(idLot, date_ponte, quantite);
            o.setId(id);
            const result = await OeufDAO.update(o);
            res.json({ ok: true, result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l oeuf' });
        }
    }

    static async delete(req, res) {
        try {
            const id = parseInt(req.params.id);
            await OeufDAO.delete(id);
            res.status(204).end();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la suppression de l oeuf' });
        }
    }

    static async findByLotId(req, res) {
        try {
            const idLot = parseInt(req.params.idLot);
            const items = await OeufDAO.findByLotId(idLot);
            res.json(items.map(modelToPlain));
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la récupération des oeufs par id lot' });
        }
    }

    /**
     * Oeufs d'un lot avec quantité restante (après éclosions)
     * Seuls ceux ayant encore des oeufs sont retournés
     */
    static async findByLotIdWithRemaining(req, res) {
        try {
            const idLot = parseInt(req.params.idLot);
            const items = await OeufDAO.findByLotIdWithRemaining(idLot);
            res.json(items.map(modelToPlain));
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la récupération des oeufs restants par lot' });
        }
    }

    /**
     * Retourne les IDs des lots qui ont encore des oeufs non éclos
     */
    static async findLotsWithRemainingOeufs(req, res) {
        try {
            const lotIds = await OeufDAO.findLotsWithRemainingOeufs();
            res.json(lotIds);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la récupération des lots avec oeufs restants' });
        }
    }
}

module.exports = OeufController;
