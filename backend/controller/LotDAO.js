const poolPromise = require('./db').poolPromise;
const lot = require('./models/Lot');

class LotDAO {
    static async findAll() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM lot');
            return result.recordset.map(row => new lot(row.idRace, row.quantite, row.date_enregistrement, row.age, row.PA));
        } catch (err) {
            console.error('erreur de recuperation de tous les lots', err);
            throw err;
        }
    }

    static async getById(l) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, l.getId())
                .query('SELECT * FROM lot WHERE id = @id');
            return result.recordset[0];
        } catch (err) {
            console.error('erreur de recuperation de lot par id', err);
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
                .input('PA', sql.Decimal(10, 2), l.getPA())
                .query('INSERT INTO lot (idRace, quantite, date_enregistrement, age, PA) VALUES (@idRace, @quantite, @date_enregistrement, @age, @PA)');
            return result;
        } catch (err) {
            console.error('erreur de creation de lot', err);
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
                .input('PA', sql.Decimal(10, 2), l.getPA())
                .query('UPDATE lot SET idRace = @idRace, quantite = @quantite, date_enregistrement = @date_enregistrement, age = @age, PA = @PA WHERE id = @id');
            return result;
        } catch (err) {
            console.error('erreur de mise a jour de lot', err);
            throw err;
        }
    }

    static async delete(l) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', sql.Int, l.getId())
                .query('DELETE FROM lot WHERE id = @id');
            return result;
        } catch (err) {
            console.error('erreur de suppression de lot', err);
            throw err;
        }
    }

    static async getOeufsByLot(l) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('idLot', sql.Int, l.getId())
                .query('SELECT * FROM oeuf WHERE idLot = @idLot');
            return result.recordset;
        } catch (err) {
            console.error('erreur de recuperation des oeufs par lot', err);
            throw err;
        }
    }

    static async getMortsByLot(l) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('idLot', sql.Int, l.getId())
                .query('SELECT * FROM lot_mort WHERE idLot = @idLot');
            return result.recordset;
        } catch (err) {
            console.error('erreur de recuperation des morts par lot', err);
            throw err;
        }   
    }
}

module.exports = LotDAO;