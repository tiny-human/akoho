import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardRow } from '../../model/dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  rows: DashboardRow[] = [];
  dateFin: string = '';       // Date du filtre (yyyy-MM-dd)
  loading = false;
  error = '';

  // Totaux
  totalPA = 0;
  totalSakafo = 0;
  totalMort = 0;
  totalPV = 0;
  totalOeufs = 0;
  totalOeufsEclos = 0;
  totalPVOeuf = 0;
  totalBenef = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // Par défaut : date du jour
    this.dateFin = new Date().toISOString().split('T')[0];
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.dashboardService.getDashboard(this.dateFin).subscribe({
      next: (data) => {
        this.rows = data;
        this.computeTotals();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors du chargement du dashboard';
        this.loading = false;
      }
    });
  }

  onFilterChange(): void {
    if (this.dateFin) {
      this.load();
    }
  }

  private computeTotals(): void {
    this.totalPA         = this.rows.reduce((s, r) => s + r.PA, 0);
    this.totalSakafo     = this.rows.reduce((s, r) => s + r.sakafo, 0);
    this.totalMort       = this.rows.reduce((s, r) => s + r.mort, 0);
    this.totalPV         = this.rows.reduce((s, r) => s + r.PV, 0);
    this.totalOeufs      = this.rows.reduce((s, r) => s + r.quantite_oeuf, 0);
    this.totalOeufsEclos = this.rows.reduce((s, r) => s + r.oeufs_eclos, 0);
    this.totalPVOeuf     = this.rows.reduce((s, r) => s + r.PV_oeuf, 0);
    this.totalBenef      = this.rows.reduce((s, r) => s + r.benef, 0);
  }

  /** Classe CSS selon le signe du bénéfice */
  benefClass(val: number): string {
    if (val > 0) return 'benef-positif';
    if (val < 0) return 'benef-negatif';
    return 'benef-zero';
  }

  /** Formater un nombre avec séparateur de milliers */
  fmt(val: number): string {
    return val.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
