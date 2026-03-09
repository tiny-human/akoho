const OeufDAO = require('../dao/OeufDAO');
const OeufClass = require('../model/Oeuf');

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
            const o = new OeufClass(idLot, date_ponte, quantite);
            const result = await OeufDAO.create(o);
            res.status(201).json({ ok: true, result });
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
}

module.exports = OeufController;
