const DashboardDAO = require('../dao/DashboardDAO');

class DashboardController {

  static async getDashboard(req, res) {
    try {
      const { dateFin } = req.query;
      const data = await DashboardDAO.getDashboard(dateFin || null);
      res.json(data);
    } catch (err) {
      console.error('Erreur dashboard:', err);
      res.status(500).json({ error: 'Erreur lors du calcul du dashboard' });
    }
  }
}

module.exports = DashboardController;
