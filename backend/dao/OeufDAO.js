const poolPromise = require('./db').poolPromise;
const oeuf = require('./models/Oeuf');
const lot = require('./models/Lot');

class OeufDAO {
    static async findAll() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM oeuf');
            return result.recordset.map(row => new oeuf(row.idLot, row.datePonte, row.quantite));
        } catch (err) {
            console.error('erreur de recuperation de tous les oeufs', err);
            throw err;
        }
    }

    static async getById(o) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, o.getId())
                .query('SELECT * FROM oeuf WHERE id = @id');
            return result.recordset[0];
        } catch (err) {
            console.error('erreur de recuperation de oeuf par id', err);
            throw err;
        }
    }

    static async create(o) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('idLot', sql.Int, o.getIdLot())
                .input('datePonte', sql.DateTime, o.getDatePonte())
                .input('quantite', sql.Int, o.getQuantite())
                .query('INSERT INTO oeuf (idLot, datePonte, quantite) VALUES (@idLot, @datePonte, @quantite)');
            return result;
        } catch (err) {
            console.error('erreur de creation de oeuf', err);
            throw err;
        }
    }

    static async update(o) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, o.getId())
                .input('idLot', sql.Int, o.getIdLot())
                .input('datePonte', sql.DateTime, o.getDatePonte())
                .input('quantite', sql.Int, o.getQuantite())
                .query('UPDATE oeuf SET idLot = @idLot, datePonte = @datePonte, quantite = @quantite WHERE id = @id');
            return result;
        } catch (err) {
            console.error('erreur de mise a jour de oeuf', err);
            throw err;
        }
    }

    static async delete(o) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, o.getId())
                .query('DELETE FROM oeuf WHERE id = @id');
            return result;
        } catch (err) {
            console.error('erreur de suppression de oeuf', err);
            throw err;
        }
    }

    static async findByLotId(l) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('idLot', sql.Int, l.getId())
                .query('SELECT * FROM oeuf WHERE idLot = @idLot');
            return result.recordset.map(row => new oeuf(row.idLot, row.datePonte, row.quantite));
        } catch (err) {
            console.error('erreur de recuperation de oeufs par id lot', err);
            throw err;
        }
    }
}

module.exports = OeufDAO;