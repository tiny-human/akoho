import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LotService } from '../../services/lot.service';
import { Lot } from '../../model/lot.model';
import { Oeuf } from '../../model/oeuf.model';
import { OeufService } from '../../services/oeuf.service';
import { LotOeuf } from '../../model/lotOeuf.model';
import { LotOeufService } from '../../services/lotOeuf.service';

@Component({
  selector: 'app-oeuf-eclot',
  imports: [FormsModule, RouterModule],
  templateUrl: './oeuf-eclot.html',
  styleUrl: './oeuf-eclot.scss'
})
export class OeufEclotComponent implements OnInit {
  lotOeuf: LotOeuf = { idOeuf: 0, date_enregistrement: '', quantite: 0 };
  selectedLotId: number = 0;
  oeufs: Oeuf[] = [];
  lots: Lot[] = [];
  successMessage = '';
  errorMessage = '';

  showRestePopup = false;
  resteQuantite = 0;
  selectedOeufQuantite = 0;

  constructor(
    private oeufService: OeufService,
    private lotService: LotService,
    private lotOeufService: LotOeufService
  ) {}

  ngOnInit(): void {
    this.loadLots();
  }

  loadLots(): void {
    this.lotService.getAll().subscribe({
      next: (data) => this.lots = data,
      error: () => this.errorMessage = 'Impossible de charger les lots'
    });
  }

  onLotChange(): void {
    this.lotOeuf.idOeuf = 0;
    this.oeufs = [];
    this.selectedOeufQuantite = 0;
    if (!this.selectedLotId || this.selectedLotId === 0) return;

    this.oeufService.findByLotIdWithRemaining(this.selectedLotId).subscribe({
      next: (data) => {
        this.oeufs = data;
        this.errorMessage = data.length === 0 ? 'Aucun œuf restant pour ce lot' : '';
      },
      error: () => this.errorMessage = 'Impossible de charger les œufs de ce lot'
    });
  }

  onOeufChange(): void {
    const oeuf = this.oeufs.find(o => o.id == this.lotOeuf.idOeuf);
    this.selectedOeufQuantite = oeuf ? oeuf.quantite : 0;
  }

  onSubmit(): void {
    if (this.lotOeuf.quantite <= 0) {
      this.errorMessage = 'La quantité doit être supérieure à 0';
      return;
    }
    if (this.lotOeuf.quantite > this.selectedOeufQuantite) {
      this.errorMessage = `La quantité à éclore (${this.lotOeuf.quantite}) dépasse la quantité disponible (${this.selectedOeufQuantite})`;
      return;
    }

    const reste = this.selectedOeufQuantite - this.lotOeuf.quantite;
    if (reste > 0) {
      this.resteQuantite = reste;
      this.showRestePopup = true;
    } else {
      this.submitEclosion('aucun', 0);
    }
  }

  onResteChoice(action: 'vendre' | 'jeter'): void {
    this.showRestePopup = false;
    this.submitEclosion(action, this.resteQuantite);
  }

  private submitEclosion(resteAction: string, resteQuantite: number): void {
    const payload = { ...this.lotOeuf, resteAction, resteQuantite };

    this.lotOeufService.create(payload).subscribe({
      next: (res) => {
        let msg = `✓ ${this.lotOeuf.quantite} poussins éclos → nouveau lot créé`;
        if (res.nouveauLot?.id) msg = `✓ ${this.lotOeuf.quantite} poussins éclos → nouveau lot #${res.nouveauLot.id}`;
        if (resteAction === 'vendre') msg += ` · ${resteQuantite} œufs restants gardés pour la vente`;
        else if (resteAction === 'jeter') msg += ` · ${resteQuantite} œufs restants retirés (déchets)`;
        this.successMessage = msg;
        this.errorMessage = '';
        this.lotOeuf = { idOeuf: 0, date_enregistrement: '', quantite: 0 };
        this.selectedOeufQuantite = 0;
        this.onLotChange();
      },
      error: () => {
        this.errorMessage = 'Impossible d\'enregistrer l\'éclosion';
        this.successMessage = '';
      }
    });
  }
}
