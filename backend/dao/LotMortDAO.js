const poolPromise = require('../db').poolPromise;
const LotMort = require('../models/LotMort');
const lot = require('../models/Lot');

class LotMortDAO {
    static async findAll() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM lot_mort');
            return result.recordset.map(row => new LotMort(row.idLot, row.dateMort, row.quantite));
        } catch (err) {
            console.error('erreur de recuperation de tous les lot_morts', err);
            throw err;
        }
    }

    static async getById(lm) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, lm.getId())
                .query('SELECT * FROM lot_mort WHERE id = @id');
            return result.recordset[0];
        } catch (err) {
            console.error('erreur de recuperation de lot_mort par id', err);        
            throw err;
        }
    }

    static async create(lm) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('idLot', sql.Int, lm.getIdLot())
                .input('dateMort', sql.DateTime, lm.getDateMort())
                .input('quantite', sql.Int, lm.getQuantite())
                .query('INSERT INTO lot_mort (idLot, dateMort, quantite) VALUES (@idLot, @dateMort, @quantite)');
            return result;
        } catch (err) {
            console.error('erreur de creation de lot_mort', err);
            throw err;
        }
    }

    static async update(lm) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, lm.getId())
                .input('idLot', sql.Int, lm.getIdLot())
                .input('dateMort', sql.DateTime, lm.getDateMort())
                .input('quantite', sql.Int, lm.getQuantite())
                .query('UPDATE lot_mort SET idLot = @idLot, dateMort = @dateMort, quantite = @quantite WHERE id = @id');
            return result;
        } catch (err) {
            console.error('erreur de mise a jour de lot_mort', err);
            throw err;
        }
    }

    static async delete(lm) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, lm.getId())
                .query('DELETE FROM lot_mort WHERE id = @id');
            return result;
        } catch (err) {
            console.error('erreur de suppression de lot_mort', err);
            throw err;
        }
    }

    static async findByLot(l) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('idLot', sql.Int, l.getId())
                .query('SELECT * FROM lot_mort WHERE idLot = @idLot');
            return result.recordset.map(row => new LotMort(row.idLot, row.dateMort, row.quantite));
        } catch (err) {
            console.error('erreur de recuperation de lot_morts par lot', err);
            throw err;
        }
    }
}

module.exports = LotMortDAO;