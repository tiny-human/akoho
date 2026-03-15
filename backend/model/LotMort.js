class LotMort{
    #id;
    #idLot;
    #quantite;
    #nbFemelles;
    #nbMales;
    #date_enregistrement;

    constructor(idLot, quantite, date_enregistrement, nbFemelles = null, nbMales = null) {
        this.#idLot = idLot;
        this.#quantite = quantite;
        this.#nbFemelles = nbFemelles;
        this.#nbMales = nbMales;
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

    getNbFemelles() {
        return this.#nbFemelles;
    }

    getNbMales() {
        return this.#nbMales;
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

    setNbFemelles(v) {
        this.#nbFemelles = v;
    }

    setNbMales(v) {
        this.#nbMales = v;
    }
}

module.exports = LotMort;