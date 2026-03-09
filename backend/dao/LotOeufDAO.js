const { poolPromise, sql } = require('../db');
const LotOeuf = require('../model/LotOeuf');

class LotOeufDAO {
  static async findAll() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM lot_oeuf');
      return result.recordset.map(row => {
        const lo = new LotOeuf(row.idOeuf, row.date_enregistrement, row.quantite);
        lo.setId(row.id);
        return lo;
      });
    } catch (err) {
      console.error('Erreur récupération lot_oeufs:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM lot_oeuf WHERE id = @id');
      return result.recordset[0] || null;
    } catch (err) {
      console.error('Erreur récupération lot_oeuf par id:', err);
      throw err;
    }
  }

  static async create(lo) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idOeuf', sql.Int, lo.getIdOeuf())
        .input('date_enregistrement', sql.Date, lo.getDateEnregistrement())
        .input('quantite', sql.Int, lo.getQuantite())
        .query('INSERT INTO lot_oeuf (idOeuf, date_enregistrement, quantite) OUTPUT INSERTED.* VALUES (@idOeuf, @date_enregistrement, @quantite)');
      return result.recordset[0];
    } catch (err) {
      console.error('Erreur création lot_oeuf:', err);
      throw err;
    }
  }

  static async update(lo) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, lo.getId())
        .input('idOeuf', sql.Int, lo.getIdOeuf())
        .input('date_enregistrement', sql.Date, lo.getDateEnregistrement())
        .input('quantite', sql.Int, lo.getQuantite())
        .query('UPDATE lot_oeuf SET idOeuf = @idOeuf, date_enregistrement = @date_enregistrement, quantite = @quantite WHERE id = @id');
      return result;
    } catch (err) {
      console.error('Erreur mise à jour lot_oeuf:', err);
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM lot_oeuf WHERE id = @id');
    } catch (err) {
      console.error('Erreur suppression lot_oeuf:', err);
      throw err;
    }
  }

  /**
   * Œufs éclos pour un lot donné
   */
  static async findByLotId(idLot) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idLot', sql.Int, idLot)
        .query(`
          SELECT lo.* FROM lot_oeuf lo
          JOIN oeuf o ON lo.idOeuf = o.id
          WHERE o.idLot = @idLot
        `);
      return result.recordset.map(row => {
        const lo = new LotOeuf(row.idOeuf, row.date_enregistrement, row.quantite);
        lo.setId(row.id);
        return lo;
      });
    } catch (err) {
      console.error('Erreur récupération lot_oeufs par lot:', err);
      throw err;
    }
  }

  /**
   * Total oeufs éclos par lot parent (≤ dateFin), groupé par idLot du parent
   * Un oeuf éclos appartient à un oeuf (lot_oeuf.idOeuf → oeuf.id),
   * et cet oeuf appartient à un lot (oeuf.idLot).
   * @returns {Object} { idLot: totalEclos, ... }
   */
  static async sumEclosGroupedByLot(dateFin) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('dateFin', sql.DateTime, dateFin)
        .query(`
          SELECT o.idLot, SUM(lo.quantite) AS total
          FROM lot_oeuf lo
          JOIN oeuf o ON lo.idOeuf = o.id
          WHERE lo.date_enregistrement <= @dateFin
          GROUP BY o.idLot
        `);
      const map = {};
      for (const row of result.recordset) {
        map[row.idLot] = row.total;
      }
      return map;
    } catch (err) {
      console.error('Erreur agrégation oeufs éclos par lot:', err);
      throw err;
    }
  }
}

module.exports = LotOeufDAO;
