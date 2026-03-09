class ConfPoids {
    #id;
    #idRace;
    #semaine;
    #VarPoids;
    #sakafo;
    
    constructor(idRace, semaine, VarPoids, sakafo) {
        this.#idRace = idRace;
        this.#semaine = semaine;
        this.#VarPoids = VarPoids;
        this.#sakafo = sakafo;
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

    getSemaine() {
        return this.#semaine;
    }

    getVarPoids() {
        return this.#VarPoids;
    }

    getSakafo() {
        return this.#sakafo;
    }

    setIdRace(idRace) {
        this.#idRace = idRace;
    }

    setSemaine(semaine) {
        this.#semaine = semaine;
    }

    setVarPoids(VarPoids) {
        this.#VarPoids = VarPoids;
    }

    setSakafo(sakafo) {
        this.#sakafo = sakafo;
    }
}

module.exports = ConfPoids;