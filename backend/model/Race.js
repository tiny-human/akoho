class Race{
    #id;
    #nom;

    constructor(id, nom) {
        this.#id = id;
        this.#nom = nom;
    }

    getId() {
        return this.#id;
    }

    getNom() {
        return this.#nom;
    }

    setId(id) {
        this.#id = id;
    }

    setNom(nom) {
        this.#nom = nom;
    }

}

module.exports = Race;