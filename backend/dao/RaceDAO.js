const { poolPromise, sql } = require('../db');
const Race = require('../model/Race');

class RaceDao {
  static async findAll() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM race');
      return result.recordset.map(row => new Race(row.id, row.name));
    } catch (err) {
      console.error('erreur de recuperation de toutes les races', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM race WHERE id = @id');
      return result.recordset[0] || null;
    } catch (err) {
      console.error('erreur de recuperation de race par id', err);
      throw err;
    }
  }

  static async create(r) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('name', sql.NVarChar, r.getNom())
        .query('INSERT INTO race (name) OUTPUT INSERTED.* VALUES (@name)');
      return result.recordset[0];
    } catch (err) {
      console.error('erreur de creation de race', err);
      throw err;
    }
  }
}

module.exports = RaceDao;