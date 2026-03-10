import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LotService } from '../../services/lot.service';
import { RaceService } from '../../services/race.service';
import { Lot } from '../../model/lot.model';
import { Race } from '../../model/race.model';

@Component({
  selector: 'app-ajouter-lot',
  imports: [FormsModule, RouterModule],
  templateUrl: './ajouter-lot.html',
  styleUrl: './ajouter-lot.scss'
})
export class AjouterLotComponent implements OnInit {

  lot: Lot = { idRace: 0, quantite: 0, date_enregistrement: '', age: 0, PA: 0 };
  races: Race[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private lotService: LotService,
    private raceService: RaceService
  ) {}

  ngOnInit(): void {
    this.loadRaces();
  }

  loadRaces(): void {
    this.raceService.getAll().subscribe({
      next: (data) => this.races = data,
      error: () => this.errorMessage = 'Impossible de charger les races'
    });
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.lotService.create(this.lot).subscribe({
      next: () => {
        this.successMessage = 'Lot ajouté avec succès !';
        this.lot = { idRace: 0, quantite: 0, date_enregistrement: '', age: 0, PA: 0 };
      },
      error: () => this.errorMessage = 'Erreur lors de l\'ajout du lot'
    });
  }
}
