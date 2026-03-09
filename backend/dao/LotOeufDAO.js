const poolPromise = require('./db').poolPromise;
const LotOeuf = require('./models/LotOeuf');
const lot = require('./models/Lot');
const oeuf = require('./models/Oeuf');

class LotOeufDAO {
    static async findAll() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM lot_oeuf');
            return result.recordset.map(row => new LotOeuf(row.idOeuf, row.date_enregistrement, row.quantite));
        } catch (err) {
            console.error('erreur de recuperation de tous les lot_oeufs', err);
            throw err;
        }
    }

    static async getById(lo) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, lo.getId())
                .query('SELECT * FROM lot_oeuf WHERE id = @id');
            return result.recordset[0];
        } catch (err) {
            console.error('erreur de recuperation de lot_oeuf par id', err);
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
                .query('INSERT INTO lot_oeuf (idOeuf, date_enregistrement, quantite) VALUES (@idOeuf, @date_enregistrement, @quantite)');
            return result;
        } catch (err) {
            console.error('erreur de creation de lot_oeuf', err);
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
            console.error('erreur de mise a jour de lot_oeuf', err);
            throw err;
        }
    }

    static async delete(lo) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, lo.getId())
                .query('DELETE FROM lot_oeuf WHERE id = @id');
            return result;
        } catch (err) {
            console.error('erreur de suppression de lot_oeuf', err);
            throw err;
        }
    }

    static async findOeufByLotId(l) {
        try{
            const pool = await poolPromise;
            const result = await pool.request()
                .input('idLot', sql.Int, l.getId())
                .query('SELECT o.* FROM oeuf o JOIN lot_oeuf lo ON o.id = lo.idOeuf WHERE lo.idLot = @idLot');
            return result.recordset.map(row => new Oeuf(row.id, row.idLot, row.datePonte, row.quantite));
        } catch (err) {
            console.error('erreur de recuperation d\'oeufs par lot', err);
            throw err;
        }
    }
}

module.exports = LotOeufDAO;