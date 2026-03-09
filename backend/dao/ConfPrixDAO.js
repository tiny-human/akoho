const { poolPromise, sql } = require('../db');
const ConfPrix = require('../model/ConfPrix');

class ConfPrixDAO {
  static async findAll() {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .query('SELECT * FROM conf_prix');
      return result.recordset;
    } catch (err) {
      console.error('Erreur récupération conf_prix:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM conf_prix WHERE id = @id');
      return result.recordset[0] || null;
    } catch (err) {
      console.error('Erreur récupération conf_prix par id:', err);
      throw err;
    }
  }

  static async findByRace(idRace) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idRace', sql.Int, idRace)
        .query('SELECT * FROM conf_prix WHERE idRace = @idRace');
      return result.recordset[0] || null;
    } catch (err) {
      console.error('Erreur récupération conf_prix par race:', err);
      throw err;
    }
  }

  /**
   * Retourne conf_prix indexé par race (pour le dashboard)
   * @returns {Object} { raceId: { PvSakafo, PvAkoho, PvOeuf } }
   */
  static async findAllAsMap() {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .query('SELECT idRace, PU_sakafo, PV, PV_oeuf FROM conf_prix');
      const map = {};
      for (const row of result.recordset) {
        map[row.idRace] = {
          PU_sakafo: row.PU_sakafo,
          PV: row.PV,
          PV_oeuf: row.PV_oeuf
        };
      }
      return map;
    } catch (err) {
      console.error('Erreur agrégation conf_prix par race:', err);
      throw err;
    }
  }

  static async create(cp) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idRace', sql.Int, cp.getIdRace())
        .input('PU_sakafo', sql.Decimal(10, 2), cp.getPvSakafo())
        .input('PV', sql.Decimal(10, 2), cp.getPvAkoho())
        .input('PV_oeuf', sql.Decimal(10, 2), cp.getPvOeuf())
        .query('INSERT INTO conf_prix (idRace, PU_sakafo, PV, PV_oeuf) OUTPUT INSERTED.* VALUES (@idRace, @PU_sakafo, @PV, @PV_oeuf)');
      return result.recordset[0];
    } catch (err) {
      console.error('Erreur création conf_prix:', err);
      throw err;
    }
  }

  static async update(cp) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, cp.getId())
        .input('idRace', sql.Int, cp.getIdRace())
        .input('PU_sakafo', sql.Decimal(10, 2), cp.getPvSakafo())
        .input('PV', sql.Decimal(10, 2), cp.getPvAkoho())
        .input('PV_oeuf', sql.Decimal(10, 2), cp.getPvOeuf())
        .query('UPDATE conf_prix SET idRace = @idRace, PU_sakafo = @PU_sakafo, PV = @PV, PV_oeuf = @PV_oeuf WHERE id = @id');
      return result;
    } catch (err) {
      console.error('Erreur mise à jour conf_prix:', err);
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM conf_prix WHERE id = @id');
    } catch (err) {
      console.error('Erreur suppression conf_prix:', err);
      throw err;
    }
  }
}

module.exports = ConfPrixDAO;
