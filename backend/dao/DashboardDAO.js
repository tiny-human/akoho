const LotDAO = require('./LotDAO');
const LotMortDAO = require('./LotMortDAO');
const OeufDAO = require('./OeufDAO');
const LotOeufDAO = require('./LotOeufDAO');
const ConfPoidsDAO = require('./ConfPoidsDAO');
const ConfPrixDAO = require('./ConfPrixDAO');
const OeufDechetDAO = require('./OeufDechetDAO');


class DashboardDAO {

  static async getDashboard(dateFin = null) {
    const filterDate = dateFin ? new Date(dateFin) : new Date();

    // ── Récupérer toutes les données nécessaires en parallèle ────────
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
      if (dateEnreg > filterDate) continue;      // lot pas encore créé à cette date

      // Ignorer les lots sans poulets vivants
      const mortTotal = mortsByLot[lot.id] || 0;
      if (lot.quantite - mortTotal <= 0) continue;

      const raceId    = lot.idRace;
      const confPoids = confPoidsMap[raceId] || {};
      const confPrix  = confPrixMap[raceId]  || { PU_sakafo: 0, PV: 0, PV_oeuf: 0 };

      // ─── Semaine actuelle du lot ───────────────────────────────────
      const elapsedMs    = filterDate.getTime() - dateEnreg.getTime();
      const elapsedDays  = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
      const startWeek    = lot.age || 0;           // âge initial en semaines
      const currentWeek  = startWeek + Math.floor(elapsedDays / 7);

      //   Pour chaque semaine : ration_hebdo / 7 × jours_effectifs
      //   Multiplié par PU_sakafo et quantité
      let totalSakafoWeight = 0;
      for (let w = startWeek; w <= currentWeek; w++) {
        const wConf = confPoids[w];
        if (!wConf || !wConf.sakafo) continue;

        const dailyRation = wConf.sakafo / 7;
        const weekOffset    = w - startWeek;
        const weekStartDate = new Date(dateEnreg.getTime() + weekOffset * 7 * 86400000);
        const weekEndDate   = new Date(weekStartDate.getTime() + 7 * 86400000);

        const actualStart = weekStartDate < dateEnreg  ? dateEnreg  : weekStartDate;
        const actualEnd   = weekEndDate   > filterDate ? filterDate : weekEndDate;
        const daysInWeek  = Math.max(0, Math.ceil((actualEnd - actualStart) / 86400000));

        totalSakafoWeight += dailyRation * daysInWeek;
      }
      const sakafo = totalSakafoWeight * (confPrix.PU_sakafo || 0) * lot.quantite;

      const mort = mortsByLot[lot.id] || 0;

      //   Somme des VarPoids de S0 à S(currentWeek) / nombre de semaines
      let sumVarPoids = 0;
      let countWeeks  = 0;
      for (let w = 0; w <= currentWeek; w++) {
        const wConf = confPoids[w];
        if (wConf && wConf.poids != null) {
          sumVarPoids += wConf.poids;
          countWeeks++;
        }
      }
      const PMU = countWeeks > 0 ? sumVarPoids / countWeeks : 0;

      const quantiteVivante = Math.max(0, lot.quantite - mort);
      const PML = PMU * quantiteVivante;
      const PV  = PML * (confPrix.PV || 0);

      const totalPondus  = oeufsByLot[lot.id]   || 0;
      const totalEclos   = eclosByLot[lot.id]   || 0;
      const totalDechets = dechetsByLot[lot.id]  || 0;
      const quantiteOeuf = Math.max(0, totalPondus - totalEclos - totalDechets);
      const PV_oeuf = quantiteOeuf * (confPrix.PV_oeuf || 0);

      const benef = PV + PV_oeuf - (lot.prix_achat || 0) - sakafo;

      dashboard.push({
        idLot:            lot.id,
        raceName:         lot.raceName,
        quantite:         lot.quantite,
        quantiteVivante,
        semaineActuelle:  currentWeek,
        PA:               round2(lot.prix_achat || 0),
        sakafo:           round2(sakafo),
        mort,
        PMU:              round2(PMU),
        PML:              round2(PML),
        PV:               round2(PV),
        quantite_oeuf:    quantiteOeuf,
        oeufs_eclos:      totalEclos,
        PV_oeuf:          round2(PV_oeuf),
        benef:            round2(benef),
      });
    }

    return dashboard;
  }
}

function round2(v) { return Math.round(v * 100) / 100; }

module.exports = DashboardDAO;
