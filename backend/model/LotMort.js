class LotMort{
    #id;
    #idLot;
    #quantite;
    #date_enregistrement;

    constructor(idLot, quantite, date_enregistrement) {
        this.#idLot = idLot;
        this.#quantite = quantite;
        this.#date_enregistrement = date_enregistrement;
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

    getQuantite() {
        return this.#quantite;
    }

    getDateEnregistrement() {
        return this.#date_enregistrement;
    }

    setIdLot(idLot) {
        this.#idLot = idLot;
    }

    setQuantite(quantite) {
        this.#quantite = quantite;
    }

    setDateEnregistrement(date_enregistrement) {
        this.#date_enregistrement = date_enregistrement;
    }
}

module.exports = LotMort;