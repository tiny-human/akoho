class Lot{
    #id
    #idRace
    #quantite
    #date_enregistrement
    #age
    #PA
    #nbFemelles
    #nbMales
    #potentielOeufsTotal
    #perteEclosion

    constructor(
        idRace,
        quantite,
        date_enregistrement,
        age,
        PA,
        nbFemelles = null,
        nbMales = null,
        potentielOeufsTotal = null,
        perteEclosion = null
    ){
        this.#idRace = idRace;
        this.#quantite = quantite;
        this.#date_enregistrement = date_enregistrement;
        this.#age = age;
        this.#PA = PA;
        this.#nbFemelles = nbFemelles;
        this.#nbMales = nbMales;
        this.#potentielOeufsTotal = potentielOeufsTotal;
        this.#perteEclosion = perteEclosion;
    }

    getId() {
        return this.#id;
    }

    setId(id) {
        this.#id = id;
    }

    getIdRace() {
        return this.#idRace;
    }

    getQuantite() {
        return this.#quantite;
    }

    getDateEnregistrement() {
        return this.#date_enregistrement;
    }

    getAge() {
        return this.#age;
    }

    getPA() {
        return this.#PA;
    }

    getNbFemelles() {
        return this.#nbFemelles;
    }

    getNbMales() {
        return this.#nbMales;
    }

    getPotentielOeufsTotal() {
        return this.#potentielOeufsTotal;
    }

    getPerteEclosion() {
        return this.#perteEclosion;
    }

    setIdRace(idRace) {
        this.#idRace = idRace;
    }

    setQuantite(quantite) {
        this.#quantite = quantite;
    }

    setDateEnregistrement(date_enregistrement) {
        this.#date_enregistrement = date_enregistrement;
    }

    setAge(age) {
        this.#age = age;
    }

    setPA(PA) {
        this.#PA = PA;
    }

    setNbFemelles(nbFemelles) {
        this.#nbFemelles = nbFemelles;
    }

    setNbMales(nbMales) {
        this.#nbMales = nbMales;
    }

    setPotentielOeufsTotal(v) {
        this.#potentielOeufsTotal = v;
    }

    setPerteEclosion(v) {
        this.#perteEclosion = v;
    }
}

module.exports = Lot;