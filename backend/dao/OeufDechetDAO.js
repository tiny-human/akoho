const { poolPromise, sql } = require('../db');

class OeufDechetDAO {
  static async create(idOeuf, quantite, date_enregistrement) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('idOeuf', sql.Int, idOeuf)
      .input('quantite', sql.Int, quantite)
      .input('date_enregistrement', sql.Date, date_enregistrement)
      .query('INSERT INTO oeuf_dechet (idOeuf, quantite, date_enregistrement) OUTPUT INSERTED.* VALUES (@idOeuf, @quantite, @date_enregistrement)');
    return result.recordset[0];
  }

 
  static async sumGroupedByLot(dateFin) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('dateFin', sql.DateTime, dateFin)
      .query(`
        SELECT o.idLot, SUM(od.quantite) AS total
        FROM oeuf_dechet od
        JOIN oeuf o ON od.idOeuf = o.id
        WHERE od.date_enregistrement <= @dateFin
        GROUP BY o.idLot
      `);
    const map = {};
    for (const row of result.recordset) {
      map[row.idLot] = row.total;
    }
    return map;
  }
}

module.exports = OeufDechetDAO;
