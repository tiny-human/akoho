const LotDAO = require('./LotDAO');
const LotMortDAO = require('./LotMortDAO');
const OeufDAO = require('./OeufDAO');
const LotOeufDAO = require('./LotOeufDAO');
const ConfPoidsDAO = require('./ConfPoidsDAO');
const ConfPrixDAO = require('./ConfPrixDAO');
const OeufDechetDAO = require('./OeufDechetDAO');


class DashboardDAO {

  static async akohoPoids(dateDebut, dateFin, idRace) {
    const confPoidsMap = await ConfPoidsDAO.findAllGroupedByRace();
    const confPoids    = confPoidsMap[idRace] || {};

    const elapsedMs   = dateFin.getTime() - dateDebut.getTime();
    const elapsedDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
    const currentWeek = elapsedDays === 0 ? 0 : Math.floor((elapsedDays - 1) / 7) + 1;
    let poids = confPoids[0]?.poids ?? 0; // poids de base à S0

    for (let w = 1; w <= currentWeek; w++) {
      const wConf = confPoids[w];
      if (!wConf || wConf.poids == null) continue;

      // S1 commence au jour 1, S2 au jour 8, Sw au jour 1+(w-1)*7
      const startDayOff  = (w - 1) * 7;
      const weekStartDate = new Date(dateDebut.getTime() + startDayOff * 86400000);
      const weekEndDate   = new Date(dateDebut.getTime() + (startDayOff + 7) * 86400000);

      const actualEnd  = weekEndDate > dateFin ? dateFin : weekEndDate;
      const daysInWeek = Math.max(0, Math.ceil((actualEnd - weekStartDate) / 86400000));

      poids += wConf.poids * (daysInWeek / 7);
    }

    return poids;
  }

  static async getDashboard(dateFin = null) {
    const filterDate = dateFin ? new Date(dateFin) : new Date();

    const [lots, confPoidsMap, confPrixMap, mortsByLot, oeufsByLot, eclosByLot, dechetsByLot] =
      await Promise.all([
        LotDAO.findAllWithRace(),
        ConfPoidsDAO.findAllGroupedByRace(),
        ConfPrixDAO.findAllAsMap(),
        LotMortDAO.sumGroupedByLot(filterDate),
        OeufDAO.sumGroupedByLot(filterDate),
        LotOeufDAO.sumEclosGroupedByLot(filterDate),
        OeufDechetDAO.sumGroupedByLot(filterDate),
      ]);

    const dashboard = [];

    for (const lot of lots) {
      const dateEnreg = new Date(lot.date_enregistrement);
      if (dateEnreg > filterDate) continue;

      const mortTotal = mortsByLot[lot.id] || 0;
      if (lot.quantite - mortTotal <= 0) continue;

      const raceId    = lot.idRace;
      const confPoids = confPoidsMap[raceId] || {};
      const confPrix  = confPrixMap[raceId]  || { PU_sakafo: 0, PV: 0, PV_oeuf: 0 };

      // ── Semaine actuelle ─────────────────────────────────────────
      const startWeek   = lot.age || 0;
      const elapsedMs   = filterDate.getTime() - dateEnreg.getTime();
      const elapsedDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
    const currentWeek = startWeek + (elapsedDays === 0 ? 0 : Math.floor((elapsedDays - 1) / 7) + 1);

      //  Coût nourriture (sakafo) depuis l'enregistrement 
      let totalSakafoWeight = 0;
      for (let w = startWeek; w <= currentWeek; w++) {
        const wConf = confPoids[w];
        if (!wConf || !wConf.sakafo) continue;

        const dailyRation   = wConf.sakafo / 7;
        const weekOffset     = w - startWeek;
        // S0 = jour d'entrée seulement ; S1 = jours 1-7 ; Sk = jours (k-1)*7+1 à k*7+1
        const startDay       = weekOffset === 0 ? 0 : (weekOffset - 1) * 7;
        const endDay         = weekOffset === 0 ? 1 : startDay + 7;
        const weekStartDate  = new Date(dateEnreg.getTime() + startDay * 86400000);
        const weekEndDate    = new Date(dateEnreg.getTime() + endDay   * 86400000);

        const actualStart = weekStartDate < dateEnreg  ? dateEnreg  : weekStartDate;
        const actualEnd   = weekEndDate   > filterDate ? filterDate : weekEndDate;
        const daysInWeek  = Math.max(0, Math.ceil((actualEnd - actualStart) / 86400000));

        totalSakafoWeight += dailyRation * daysInWeek;
      }
      const sakafo = totalSakafoWeight * (confPrix.PU_sakafo || 0) * lot.quantite;

      // PMU : poids moyen d'un poulet
      const dateNaissance = new Date(dateEnreg.getTime() - startWeek * 7 * 86400000);
      const PMU = await DashboardDAO.akohoPoids(dateNaissance, filterDate, raceId);

      const mort            = mortsByLot[lot.id] || 0;
      const quantiteVivante = Math.max(0, lot.quantite - mort);
      const PML             = PMU * quantiteVivante;
      const PV              = PML * (confPrix.PV || 0);

      const totalPondus  = oeufsByLot[lot.id]  || 0;
      const totalEclos   = eclosByLot[lot.id]  || 0;
      const totalDechets = dechetsByLot[lot.id] || 0;
      const quantiteOeuf = Math.max(0, totalPondus - totalEclos - totalDechets);
      const PV_oeuf      = quantiteOeuf * (confPrix.PV_oeuf || 0);

      const benef = PV + PV_oeuf - lot.prix_achat - sakafo;

      dashboard.push({
        idLot:           lot.id,
        raceName:        lot.raceName,
        quantite:        lot.quantite,
        quantiteVivante,
        semaineActuelle: currentWeek,
        PA:              round2(lot.prix_achat || 0),
        sakafo:          round2(sakafo),
        mort,
        PMU:             round2(PMU),
        PML:             round2(PML),
        PV:              round2(PV),
        quantite_oeuf:   quantiteOeuf,
        oeufs_eclos:     totalEclos,
        perte_eclosion:  round2(lot.perte_eclosion || 0),
        PV_oeuf:         round2(PV_oeuf),
        benef:           round2(benef),
      });
    }

    return dashboard;
  }
}

function round2(v) { return Math.round(v * 100) / 100; }

module.exports = DashboardDAO;