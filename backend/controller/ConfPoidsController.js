// ConfPoids has no DAO implemented yet; use simple in-memory store as placeholder
const ConfPoidsModel = require('../model/ConfPoids');

const store = [];
let nextId = 1;

class ConfPoidsController {
  static async list(req, res) {
    res.json(store);
  }

  static async get(req, res) {
    const id = parseInt(req.params.id);
    const item = store.find(i => i.id === id);
    if (!item) return res.status(404).json({ error: 'ConfPoids non trouvé' });
    res.json(item);
  }

  static async create(req, res) {
    const { idRace, semaine, VarPoids, sakafo } = req.body;
    const obj = { id: nextId++, idRace, semaine, VarPoids, sakafo };
    store.push(obj);
    res.status(201).json(obj);
  }

  static async update(req, res) {
    const id = parseInt(req.params.id);
    const idx = store.findIndex(i => i.id === id);
    if (idx === -1) return res.status(404).json({ error: 'ConfPoids non trouvé' });
    const { idRace, semaine, VarPoids, sakafo } = req.body;
    store[idx] = { id, idRace, semaine, VarPoids, sakafo };
    res.json(store[idx]);
  }

  static async delete(req, res) {
    const id = parseInt(req.params.id);
    const idx = store.findIndex(i => i.id === id);
    if (idx === -1) return res.status(404).json({ error: 'ConfPoids non trouvé' });
    store.splice(idx, 1);
    res.status(204).end();
  }
}

module.exports = ConfPoidsController;
