class Race{
    #id;
    #nom;
    #joursIncubation;
    #tauxEclosion;
    #tauxFemelle;
    #tauxMortFemelle;
    #tauxMortMale;
    #capacitePonte;

    constructor(
        id,
        nom,
        joursIncubation = null,
        tauxEclosion = null,
        tauxFemelle = null,
        tauxMortFemelle = null,
        tauxMortMale = null,
        capacitePonte = null
    ) {
        this.#id = id;
        this.#nom = nom;
        this.#joursIncubation = joursIncubation;
        this.#tauxEclosion = tauxEclosion;
        this.#tauxFemelle = tauxFemelle;
        this.#tauxMortFemelle = tauxMortFemelle;
        this.#tauxMortMale = tauxMortMale;
        this.#capacitePonte = capacitePonte;
    }

    getId() { return this.#id; }
    getNom() { return this.#nom; }
    getJoursIncubation() { return this.#joursIncubation; }
    getTauxEclosion() { return this.#tauxEclosion; }
    getTauxFemelle() { return this.#tauxFemelle; }
    getTauxMortFemelle() { return this.#tauxMortFemelle; }
    getTauxMortMale() { return this.#tauxMortMale; }
    getCapacitePonte() { return this.#capacitePonte; }

    setId(id) { this.#id = id; }
    setNom(nom) { this.#nom = nom; }
    setJoursIncubation(v) { this.#joursIncubation = v; }
    setTauxEclosion(v) { this.#tauxEclosion = v; }
    setTauxFemelle(v) { this.#tauxFemelle = v; }
    setTauxMortFemelle(v) { this.#tauxMortFemelle = v; }
    setTauxMortMale(v) { this.#tauxMortMale = v; }
    setCapacitePonte(v) { this.#capacitePonte = v; }
}

module.exports = Race;