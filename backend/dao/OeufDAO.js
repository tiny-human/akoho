const { poolPromise, sql } = require('../db');
const Oeuf = require('../model/Oeuf');

class OeufDAO {
  static async findAll() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM oeuf');
      return result.recordset.map(row => {
        const o = new Oeuf(row.idLot, row.date_enregistrement, row.quantite);
        o.setId(row.id);
        return o;
      });
    } catch (err) {
      console.error('Erreur récupération oeufs:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM oeuf WHERE id = @id');
      return result.recordset[0] || null;
    } catch (err) {
      console.error('Erreur récupération oeuf par id:', err);
      throw err;
    }
  }

  static async create(o) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idLot', sql.Int, o.getIdLot())
        .input('date_enregistrement', sql.DateTime, o.getDatePonte())
        .input('quantite', sql.Int, o.getQuantite())
        .query('INSERT INTO oeuf (idLot, date_enregistrement, quantite) OUTPUT INSERTED.* VALUES (@idLot, @date_enregistrement, @quantite)');
      return result.recordset[0];
    } catch (err) {
      console.error('Erreur création oeuf:', err);
      throw err;
    }
  }

  static async update(o) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, o.getId())
        .input('idLot', sql.Int, o.getIdLot())
        .input('date_enregistrement', sql.DateTime, o.getDatePonte())
        .input('quantite', sql.Int, o.getQuantite())
        .query('UPDATE oeuf SET idLot = @idLot, date_enregistrement = @date_enregistrement, quantite = @quantite WHERE id = @id');
      return result;
    } catch (err) {
      console.error('Erreur mise à jour oeuf:', err);
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM oeuf WHERE id = @id');
    } catch (err) {
      console.error('Erreur suppression oeuf:', err);
      throw err;
    }
  }

  static async findByLotId(idLot) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idLot', sql.Int, idLot)
        .query('SELECT * FROM oeuf WHERE idLot = @idLot');
      return result.recordset.map(row => {
        const o = new Oeuf(row.idLot, row.date_enregistrement, row.quantite);
        o.setId(row.id);
        return o;
      });
    } catch (err) {
      console.error('Erreur récupération oeufs par lot:', err);
      throw err;
    }
  }

  /**
   * Total oeufs par lot (≤ dateFin), groupé par idLot
   * @returns {Object} { idLot: totalOeufs, ... }
   */
  static async sumGroupedByLot(dateFin) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('dateFin', sql.DateTime, dateFin)
        .query('SELECT idLot, SUM(quantite) AS total FROM oeuf WHERE date_enregistrement <= @dateFin GROUP BY idLot');
      const map = {};
      for (const row of result.recordset) {
        map[row.idLot] = row.total;
      }
      return map;
    } catch (err) {
      console.error('Erreur agrégation oeufs par lot:', err);
      throw err;
    }
  }
}

module.exports = OeufDAO;
