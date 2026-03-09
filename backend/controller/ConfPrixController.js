// ConfPrix has no DAO implemented yet; use simple in-memory store as placeholder
const ConfPrixModel = require('../model/ConfPrix');

const store = [];
let nextId = 1;

class ConfPrixController {
  static async list(req, res) {
    res.json(store);
  }

  static async get(req, res) {
    const id = parseInt(req.params.id);
    const item = store.find(i => i.id === id);
    if (!item) return res.status(404).json({ error: 'ConfPrix non trouvé' });
    res.json(item);
  }

  static async create(req, res) {
    const { idRace, PvSakafo, PvAkoho, PvOeuf } = req.body;
    const obj = { id: nextId++, idRace, PvSakafo, PvAkoho, PvOeuf };
    store.push(obj);
    res.status(201).json(obj);
  }

  static async update(req, res) {
    const id = parseInt(req.params.id);
    const idx = store.findIndex(i => i.id === id);
    if (idx === -1) return res.status(404).json({ error: 'ConfPrix non trouvé' });
    const { idRace, PvSakafo, PvAkoho, PvOeuf } = req.body;
    store[idx] = { id, idRace, PvSakafo, PvAkoho, PvOeuf };
    res.json(store[idx]);
  }

  static async delete(req, res) {
    const id = parseInt(req.params.id);
    const idx = store.findIndex(i => i.id === id);
    if (idx === -1) return res.status(404).json({ error: 'ConfPrix non trouvé' });
    store.splice(idx, 1);
    res.status(204).end();
  }
}

module.exports = ConfPrixController;
