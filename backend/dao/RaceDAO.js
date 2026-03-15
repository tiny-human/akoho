const { poolPromise, sql } = require('../db');
const Race = require('../model/Race');

class RaceDao {
  static async findAll() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT id, name, jours_incubation, taux_eclosion, taux_femelle, taux_mort_femelle, taux_mort_male, capacite_ponte FROM race');
      return result.recordset.map(row => new Race(
        row.id,
        row.name,
        row.jours_incubation,
        row.taux_eclosion,
        row.taux_femelle,
        row.taux_mort_femelle,
        row.taux_mort_male,
        row.capacite_ponte
      ));
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
        .query('SELECT id, name, jours_incubation, taux_eclosion, taux_femelle, taux_mort_femelle, taux_mort_male, capacite_ponte FROM race WHERE id = @id');
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
        .input('jours_incubation', sql.Int, r.getJoursIncubation())
        .input('taux_eclosion', sql.Decimal(5, 2), r.getTauxEclosion())
        .input('taux_femelle', sql.Decimal(5, 2), r.getTauxFemelle())
        .input('taux_mort_femelle', sql.Decimal(5, 2), r.getTauxMortFemelle())
        .input('taux_mort_male', sql.Decimal(5, 2), r.getTauxMortMale())
        .input('capacite_ponte', sql.Int, r.getCapacitePonte())
        .query(`INSERT INTO race (name, jours_incubation, taux_eclosion, taux_femelle, taux_mort_femelle, taux_mort_male, capacite_ponte)
                OUTPUT INSERTED.*
                VALUES (@name, @jours_incubation, @taux_eclosion, @taux_femelle, @taux_mort_femelle, @taux_mort_male, @capacite_ponte)`);
      return result.recordset[0];
    } catch (err) {
      console.error('erreur de creation de race', err);
      throw err;
    }
  }

  static async update(id, payload) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('name', sql.NVarChar, payload.nom)
        .input('jours_incubation', sql.Int, payload.jours_incubation)
        .input('taux_eclosion', sql.Decimal(5, 2), payload.taux_eclosion)
        .input('taux_femelle', sql.Decimal(5, 2), payload.taux_femelle)
        .input('taux_mort_femelle', sql.Decimal(5, 2), payload.taux_mort_femelle)
        .input('taux_mort_male', sql.Decimal(5, 2), payload.taux_mort_male)
        .input('capacite_ponte', sql.Int, payload.capacite_ponte)
        .query(`UPDATE race
                SET name = @name,
                    jours_incubation = @jours_incubation,
                    taux_eclosion = @taux_eclosion,
                    taux_femelle = @taux_femelle,
                    taux_mort_femelle = @taux_mort_femelle,
                    taux_mort_male = @taux_mort_male,
                    capacite_ponte = @capacite_ponte
                WHERE id = @id`);
      return result.rowsAffected[0] > 0;
    } catch (err) {
      console.error('erreur de mise à jour de race', err);
      throw err;
    }
  }
}

module.exports = RaceDao;