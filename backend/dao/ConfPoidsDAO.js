const { poolPromise, sql } = require('../db');
const ConfPoids = require('../model/ConfPoids');

class ConfPoidsDAO {
  static async findAll() {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .query('SELECT * FROM conf_poids ORDER BY idRace, semaine');
      return result.recordset;
    } catch (err) {
      console.error('Erreur récupération conf_poids:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM conf_poids WHERE id = @id');
      return result.recordset[0] || null;
    } catch (err) {
      console.error('Erreur récupération conf_poids par id:', err);
      throw err;
    }
  }

  static async findByRace(idRace) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idRace', sql.Int, idRace)
        .query('SELECT * FROM conf_poids WHERE idRace = @idRace ORDER BY semaine');
      return result.recordset;
    } catch (err) {
      console.error('Erreur récupération conf_poids par race:', err);
      throw err;
    }
  }

  /**
   * Retourne conf_poids indexé par race puis semaine (pour le dashboard)
   * @returns {Object} { raceId: { semaine: { VarPoids, sakafo } } }
   */
  static async findAllGroupedByRace() {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .query('SELECT idRace, semaine, poids, sakafo FROM conf_poids ORDER BY idRace, semaine');
      const map = {};
      for (const row of result.recordset) {
        if (!map[row.idRace]) map[row.idRace] = {};
        map[row.idRace][row.semaine] = {
          poids: row.poids,
          sakafo: row.sakafo
        };
      }
      return map;
    } catch (err) {
      console.error('Erreur agrégation conf_poids par race:', err);
      throw err;
    }
  }

  static async create(cp) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idRace', sql.Int, cp.getIdRace())
        .input('semaine', sql.Int, cp.getSemaine())
        .input('poids', sql.Decimal(10, 2), cp.getVarPoids())
        .input('sakafo', sql.Decimal(10, 2), cp.getSakafo())
        .query('INSERT INTO conf_poids (idRace, semaine, poids, sakafo) OUTPUT INSERTED.* VALUES (@idRace, @semaine, @poids, @sakafo)');
      return result.recordset[0];
    } catch (err) {
      console.error('Erreur création conf_poids:', err);
      throw err;
    }
  }

  static async update(cp) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, cp.getId())
        .input('idRace', sql.Int, cp.getIdRace())
        .input('semaine', sql.Int, cp.getSemaine())
        .input('poids', sql.Decimal(10, 2), cp.getVarPoids())
        .input('sakafo', sql.Decimal(10, 2), cp.getSakafo())
        .query('UPDATE conf_poids SET idRace = @idRace, semaine = @semaine, poids = @poids, sakafo = @sakafo WHERE id = @id');
      return result;
    } catch (err) {
      console.error('Erreur mise à jour conf_poids:', err);
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM conf_poids WHERE id = @id');
    } catch (err) {
      console.error('Erreur suppression conf_poids:', err);
      throw err;
    }
  }
}

module.exports = ConfPoidsDAO;
