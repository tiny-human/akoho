class Oeuf {
    #id;
    #idLot;
    #datePonte;
    #quantite;

    constructor(idLot, datePonte, quantite) {
        this.#idLot = idLot;
        this.#datePonte = datePonte;
        this.#quantite = quantite;
    }

    getId() {
        return this.#id;
    }

    setId(id) {
        this.#id = id;
    }

    getIdLot() {
        return this.#idLot;
    }

    getDatePonte() {
        return this.#datePonte;
    }

    getQuantite() {
        return this.#quantite;
    }

    setIdLot(idLot) {
        this.#idLot = idLot;
    }

    setDatePonte(datePonte) {
        this.#datePonte = datePonte;
    }

    setQuantite(quantite) {
        this.#quantite = quantite;
    }
}

module.exports = Oeuf;