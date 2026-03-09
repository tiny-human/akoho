class LotOeuf{
    #id;
    #idOeuf;
    #date_enregistrement;
    #quantite;

    constructor(idOeuf, date_enregistrement, quantite) {
        this.#idOeuf = idOeuf;
        this.#date_enregistrement = date_enregistrement;
        this.#quantite = quantite;
    }

    getId() {
        return this.#id;
    }

    setId(id) {
        this.#id = id;
    }

    getIdOeuf() {
        return this.#idOeuf;
    }

    setIdOeuf(idOeuf) {
        this.#idOeuf = idOeuf;
    }

    getDateEnregistrement() {
        return this.#date_enregistrement;
    }

    setDateEnregistrement(date_enregistrement) {
        this.#date_enregistrement = date_enregistrement;
    }

    getQuantite() {
        return this.#quantite;
    }

    setQuantite(quantite) {
        this.#quantite = quantite;
    }
}

module.exports = LotOeuf;