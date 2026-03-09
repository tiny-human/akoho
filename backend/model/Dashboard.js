class Dashboard {
  #idLot
  #quantite
  #PA
  #sakafo
  #Mort
  #PMU
  #PML
  #PV
  #quantite_oeuf
  #PV_oeuf
  #benef

  constructor(idLot, quantite, PA, sakafo, Mort, PMU, PML, PV, quantite_oeuf, PV_oeuf, benef) {
    this.#idLot = idLot
    this.#quantite = quantite
    this.#PA = PA
    this.#sakafo = sakafo
    this.#Mort = Mort
    this.#PMU = PMU
    this.#PML = PML
    this.#PV = PV
    this.#quantite_oeuf = quantite_oeuf
    this.#PV_oeuf = PV_oeuf
    this.#benef = benef
  }

  getIdLot() { return this.#idLot }
  getQuantite() { return this.#quantite }
  getPA() { return this.#PA }
  getSakafo() { return this.#sakafo }
  getMort() { return this.#Mort }
  getPMU() { return this.#PMU }
  getPML() { return this.#PML }
  getPV() { return this.#PV }
  getQuantiteOeuf() { return this.#quantite_oeuf }
  getPVOeuf() { return this.#PV_oeuf }
  getBenef() { return this.#benef }

  setIdLot(idLot) { this.#idLot = idLot }
  setQuantite(quantite) { this.#quantite = quantite }
  setPA(PA) { this.#PA = PA }
  setSakafo(sakafo) { this.#sakafo = sakafo }
  setMort(Mort) { this.#Mort = Mort }
  setPMU(PMU) { this.#PMU = PMU }
  setPML(PML) { this.#PML = PML }
  setPV(PV) { this.#PV = PV }
  setQuantiteOeuf(quantite_oeuf) { this.#quantite_oeuf = quantite_oeuf }
  setPVOeuf(PV_oeuf) { this.#PV_oeuf = PV_oeuf }
  setBenef(benef) { this.#benef = benef }
}

module.exports = Dashboard;