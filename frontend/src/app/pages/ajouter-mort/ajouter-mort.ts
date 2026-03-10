import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LotService } from '../../services/lot.service';
import { LotMortService } from '../../services/lotMort.service';
import { LotMort } from '../../model/lotMort.model';
import { Lot } from '../../model/lot.model';

@Component({
  selector: 'app-ajouter-mort',
  imports: [FormsModule, RouterModule],
  templateUrl: './ajouter-mort.html',
  styleUrl: './ajouter-mort.scss'
})
export class AjouterMortComponent implements OnInit {

  lotMort: LotMort = { idLot: 0, quantite: 0, date_enregistrement: '' };
  lots: Lot[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private lotService: LotService,
    private lotMortService: LotMortService
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

  onSubmit(): void {
    this.lotMortService.create(this.lotMort).subscribe({
      next: () => {
        this.successMessage = 'Morts enregistrés avec succès';
        this.errorMessage = '';
        this.lotMort = { idLot: 0, quantite: 0, date_enregistrement: '' };
      },
      error: () => {
        this.errorMessage = 'Impossible d\'enregistrer les morts';
        this.successMessage = '';
      }
    });
  }
}