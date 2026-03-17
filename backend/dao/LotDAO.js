const { poolPromise, sql } = require('../db');
const Lot = require('../model/Lot');

class LotDAO {
  static async findAll() {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query('SELECT * FROM lot');
      return result.recordset.map(row => {
        const l = new Lot(
          row.idRace,
          row.quantite,
          row.date_enregistrement,
          row.age,
          row.prix_achat,
          row.nb_femelles,
          row.nb_males,
          row.potentiel_oeufs_total,
          row.perte_eclosion
        );
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
           l.nb_femelles, l.nb_males, l.potentiel_oeufs_total, l.perte_eclosion,
           r.name AS raceName,
           r.capacite_ponte
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
        .input('date_enregistrement', sql.Date, new Date(l.getDateEnregistrement()))
        .input('age', sql.Int, l.getAge())
        .input('prix_achat', sql.Decimal(10, 2), l.getPA())
        .input('nb_femelles', sql.Int, l.getNbFemelles())
        .input('nb_males', sql.Int, l.getNbMales())
        .input('potentiel_oeufs_total', sql.Int, l.getPotentielOeufsTotal())
        .input('perte_eclosion', sql.Decimal(12, 2), l.getPerteEclosion())
        .query(`INSERT INTO lot (
                  idRace, quantite, date_enregistrement, age, prix_achat,
                  nb_femelles, nb_males, potentiel_oeufs_total, perte_eclosion
                )
                OUTPUT INSERTED.*
                VALUES (
                  @idRace, @quantite, @date_enregistrement, @age, @prix_achat,
                  @nb_femelles, @nb_males, @potentiel_oeufs_total, @perte_eclosion
                )`);
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
        .input('date_enregistrement', sql.Date, new Date(l.getDateEnregistrement()))
        .input('age', sql.Int, l.getAge())
        .input('prix_achat', sql.Decimal(10, 2), l.getPA())
        .input('nb_femelles', sql.Int, l.getNbFemelles())
        .input('nb_males', sql.Int, l.getNbMales())
        .input('potentiel_oeufs_total', sql.Int, l.getPotentielOeufsTotal())
        .input('perte_eclosion', sql.Decimal(12, 2), l.getPerteEclosion())
        .query(`UPDATE lot
          SET idRace = @idRace,
              quantite = @quantite,
              date_enregistrement = @date_enregistrement,
              age = @age,
              prix_achat = @prix_achat,
              nb_femelles = @nb_femelles,
              nb_males = @nb_males,
              potentiel_oeufs_total = @potentiel_oeufs_total,
              perte_eclosion = @perte_eclosion
          WHERE id = @id`);
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
        const l = new Lot(
          row.idRace,
          row.quantite,
          row.date_enregistrement,
          row.age,
          row.prix_achat,
          row.nb_femelles,
          row.nb_males,
          row.potentiel_oeufs_total,
          row.perte_eclosion
        );
        l.setId(row.id);
        return l;
      });
    } catch (err) {
      console.error('Erreur récupération lots vivants:', err);
      throw err;
    }
  }

  static async getByIdWithRace(idLot) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idLot', sql.Int, idLot)
        .query(`
          SELECT l.*, r.name AS raceName,
                 r.jours_incubation, r.taux_eclosion, r.taux_femelle,
                 r.taux_mort_femelle, r.taux_mort_male, r.capacite_ponte
          FROM lot l
          JOIN race r ON r.id = l.idRace
          WHERE l.id = @idLot
        `);
      return result.recordset[0] || null;
    } catch (err) {
      console.error('Erreur récupération lot + race:', err);
      throw err;
    }
  }

  /**
   * Calcule la capacité totale théorique actuelle d'un lot en tenant compte des mortes femelles.
   * maxTotal = femellesVivantes * capacite_ponte (si nb_femelles + capacite_ponte connus)
   * fallback = potentiel_oeufs_total
   */
  static async getCurrentEggCapacity(idLot) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('idLot', sql.Int, idLot)
        .query(`
          SELECT
            l.id,
            l.nb_femelles,
            l.potentiel_oeufs_total,
            r.capacite_ponte,
            ISNULL(SUM(
              CASE
                WHEN m.nb_femelles IS NOT NULL THEN m.nb_femelles
                ELSE CAST(ROUND(m.quantite * (ISNULL(r.taux_mort_femelle, 50) / 100.0), 0) AS INT)
              END
            ), 0) AS mortes_femelles
          FROM lot l
          JOIN race r ON r.id = l.idRace
          LEFT JOIN mort m ON m.idLot = l.id
          WHERE l.id = @idLot
          GROUP BY l.id, l.nb_femelles, l.potentiel_oeufs_total, r.capacite_ponte
        `);

      if (result.recordset.length === 0) return null;

      const row = result.recordset[0];
      const nbFemelles = row.nb_femelles != null ? Number(row.nb_femelles) : null;
      const mortesFemelles = Number(row.mortes_femelles || 0);
      const capacitePonte = row.capacite_ponte != null ? Number(row.capacite_ponte) : null;
      const potentielInitial = row.potentiel_oeufs_total != null ? Number(row.potentiel_oeufs_total) : null;

      const femellesVivantes = nbFemelles == null ? null : Math.max(0, nbFemelles - mortesFemelles);
      const maxTotal = (femellesVivantes != null && capacitePonte != null)
        ? femellesVivantes * capacitePonte
        : potentielInitial;

      return {
        maxTotal,
        femellesVivantes,
        mortesFemelles,
        capacitePonte,
        potentielInitial,
      };
    } catch (err) {
      console.error('Erreur calcul capacité oeufs actuelle:', err);
      throw err;
    }
  }
}

module.exports = LotDAO;
