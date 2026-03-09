class ConfPrix {
    #id;
    #idRace;
    #PvSakafo;
    #PvAkoho;
    #PvOeuf;

    constructor(idRace, PvSakafo, PvAkoho, PvOeuf) {
        this.#idRace = idRace;
        this.#PvSakafo = PvSakafo;
        this.#PvAkoho = PvAkoho;
        this.#PvOeuf = PvOeuf;
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

    getPvSakafo() {
        return this.#PvSakafo;
    }

    getPvAkoho() {
        return this.#PvAkoho;
    }

    getPvOeuf() {
        return this.#PvOeuf;
    }

    setIdRace(idRace) {
        this.#idRace = idRace;
    }

    setPvSakafo(PvSakafo) {
        this.#PvSakafo = PvSakafo;
    }

    setPvAkoho(PvAkoho) {
        this.#PvAkoho = PvAkoho;
    }

    setPvOeuf(PvOeuf) {
        this.#PvOeuf = PvOeuf;
    }
}

module.exports = ConfPrix;
