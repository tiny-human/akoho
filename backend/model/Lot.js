class Lot{
    #id
    #idRace
    #quantite
    #date_enregistrement
    #age
    #PA

    constructor(idRace, quantite, date_enregistrement, age, PA){
        this.#idRace = idRace;
        this.#quantite = quantite;
        this.#date_enregistrement = date_enregistrement;
        this.#age = age;
        this.#PA = PA;
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
}

module.exports = Lot;