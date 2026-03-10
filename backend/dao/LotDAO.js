const { poolPromise, sql } = require('../db');
const Lot = require('../model/Lot');

class LotDAO {
  static async findAll() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM lot');
      return result.recordset.map(row => {
        const l = new Lot(row.idRace, row.quantite, row.date_enregistrement, row.age, row.prix_achat);
        l.setId(row.id);
        return l;
      });
    } catch (err) {
      console.error('Erreur récupération lots:', err);
      throw err;
    }
  }

  /**
   * Tous les lots avec le nom de la race (pour le dashboard)
   * Retourne des objets plain (pas des modèles)
   */
  static async findAllWithRace() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(`
        SELECT l.id, l.idRace, l.quantite, l.date_enregistrement, l.age, l.prix_achat,
               r.name AS raceName
        FROM lot l
        JOIN race r ON l.idRace = r.id
      `);
      return result.recordset;
    } catch (err) {
      console.error('Erreur récupération lots avec race:', err);
      throw err;
    }
  }

  static async getById(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM lot WHERE id = @id');
      return result.recordset[0] || null;
    } catch (err) {
      console.error('Erreur récupération lot par id:', err);
      throw err;
    }
  }

  static async create(l) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idRace', sql.Int, l.getIdRace())
        .input('quantite', sql.Int, l.getQuantite())
        .input('date_enregistrement', sql.DateTime, l.getDateEnregistrement())
        .input('age', sql.Int, l.getAge())
        .input('prix_achat', sql.Decimal(10, 2), l.getPA())
        .query('INSERT INTO lot (idRace, quantite, date_enregistrement, age, prix_achat) OUTPUT INSERTED.* VALUES (@idRace, @quantite, @date_enregistrement, @age, @prix_achat)');
      return result.recordset[0];
    } catch (err) {
      console.error('Erreur création lot:', err);
      throw err;
    }
  }

  static async update(l) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, l.getId())
        .input('idRace', sql.Int, l.getIdRace())
        .input('quantite', sql.Int, l.getQuantite())
        .input('date_enregistrement', sql.DateTime, l.getDateEnregistrement())
        .input('age', sql.Int, l.getAge())
        .input('prix_achat', sql.Decimal(10, 2), l.getPA())
        .query('UPDATE lot SET idRace = @idRace, quantite = @quantite, date_enregistrement = @date_enregistrement, age = @age, prix_achat = @prix_achat WHERE id = @id');
      return result;
    } catch (err) {
      console.error('Erreur mise à jour lot:', err);
      throw err;
    }
  }

  static async delete(id) {
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM lot WHERE id = @id');
    } catch (err) {
      console.error('Erreur suppression lot:', err);
      throw err;
    }
  }

  /**
   * Retourne le nombre de poulets vivants dans un lot
   * vivants = quantite_initiale - total_morts
   */
  static async getRemainingAlive(idLot) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idLot', sql.Int, idLot)
        .query(`
          SELECT l.quantite - ISNULL((SELECT SUM(m.quantite) FROM mort m WHERE m.idLot = l.id), 0) AS vivants
          FROM lot l
          WHERE l.id = @idLot
        `);
      if (result.recordset.length === 0) return 0;
      return result.recordset[0].vivants;
    } catch (err) {
      console.error('Erreur calcul vivants lot:', err);
      throw err;
    }
  }

  /**
   * Retourne tous les lots qui ont encore des poulets vivants (quantite - morts > 0)
   */
  static async findAllAlive() {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .query(`
          SELECT l.*
          FROM lot l
          WHERE l.quantite - ISNULL((SELECT SUM(m.quantite) FROM mort m WHERE m.idLot = l.id), 0) > 0
        `);
      return result.recordset.map(row => {
        const l = new Lot(row.idRace, row.quantite, row.date_enregistrement, row.age, row.prix_achat);
        l.setId(row.id);
        return l;
      });
    } catch (err) {
      console.error('Erreur récupération lots vivants:', err);
      throw err;
    }
  }
}

module.exports = LotDAO;
