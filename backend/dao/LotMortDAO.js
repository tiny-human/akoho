const { poolPromise, sql } = require('../db');
const LotMort = require('../model/LotMort');

class LotMortDAO {
  static async findAll() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM mort');
      return result.recordset.map(row => {
        const lm = new LotMort(row.idLot, row.quantite, row.date_enregistrement);
        lm.setId(row.id);
        return lm;
      });
    } catch (err) {
      console.error('Erreur récupération lot_morts:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM mort WHERE id = @id');
      return result.recordset[0] || null;
    } catch (err) {
      console.error('Erreur récupération lot_mort par id:', err);
      throw err;
    }
  }

  static async create(lm) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idLot', sql.Int, lm.getIdLot())
        .input('quantite', sql.Int, lm.getQuantite())
        .input('date_enregistrement', sql.DateTime, lm.getDateEnregistrement())
        .query('INSERT INTO mort (idLot, quantite, date_enregistrement) OUTPUT INSERTED.* VALUES (@idLot, @quantite, @date_enregistrement)');
      return result.recordset[0];
    } catch (err) {
      console.error('Erreur création lot_mort:', err);
      throw err;
    }
  }

  static async update(lm) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, lm.getId())
        .input('idLot', sql.Int, lm.getIdLot())
        .input('quantite', sql.Int, lm.getQuantite())
        .input('date_enregistrement', sql.DateTime, lm.getDateEnregistrement())
        .query('UPDATE mort SET idLot = @idLot, quantite = @quantite, date_enregistrement = @date_enregistrement WHERE id = @id');
      return result;
    } catch (err) {
      console.error('Erreur mise à jour lot_mort:', err);
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM mort WHERE id = @id');
    } catch (err) {
      console.error('Erreur suppression lot_mort:', err);
      throw err;
    }
  }

  static async findByLot(idLot) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idLot', sql.Int, idLot)
        .query('SELECT * FROM mort WHERE idLot = @idLot');
      return result.recordset.map(row => {
        const lm = new LotMort(row.idLot, row.quantite, row.date_enregistrement);
        lm.setId(row.id);
        return lm;
      });
    } catch (err) {
      console.error('Erreur récupération morts par lot:', err);
      throw err;
    }
  }

  /**
   * Total morts par lot (≤ dateFin), groupé par idLot
   * @returns {Object} { idLot: totalMort, ... }
   */
  static async sumGroupedByLot(dateFin) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('dateFin', sql.DateTime, dateFin)
        .query('SELECT idLot, SUM(quantite) AS total FROM mort WHERE date_enregistrement <= @dateFin GROUP BY idLot');
      const map = {};
      for (const row of result.recordset) {
        map[row.idLot] = row.total;
      }
      return map;
    } catch (err) {
      console.error('Erreur agrégation morts par lot:', err);
      throw err;
    }
  }
}

module.exports = LotMortDAO;
