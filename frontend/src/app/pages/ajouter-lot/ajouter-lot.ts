// Composant Angular = une "page" ou "morceau" de l'interface
// Chaque composant a : une classe TypeScript (.ts) + un template HTML (.html) + un style (.scss)

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';           // pour [(ngModel)]
import { LotService } from '../../services/lot.service';
import { RaceService } from '../../services/race.service';
import { Lot } from '../../model/lot.model';
import { Race } from '../../model/race.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajouter-lot',
  // "standalone" est le mode par défaut dans Angular 21
  // "imports" = les modules dont ce composant a besoin
  imports: [FormsModule,RouterModule],
  templateUrl: './ajouter-lot.html',
  styleUrl: './ajouter-lot.scss'
})
export class AjouterLotComponent implements OnInit {

  // Objet lot lié au formulaire (les champs du form remplissent cet objet)
  lot: Lot = {
    idRace: 0,
    quantite: 0,
    date_enregistrement: '',
    age: 0,
    PA: 0
  };

  // Liste des races (pour le <select>)
  races: Race[] = [];

  // Messages affichés à l'utilisateur
  successMessage = '';
  errorMessage = '';

  // Les services sont injectés via le constructeur
  constructor(
    private lotService: LotService,
    private raceService: RaceService
  ) {}

  // ngOnInit() est appelé automatiquement quand le composant s'affiche
  ngOnInit(): void {
    this.loadRaces();
  }

  // Charger la liste des races depuis le backend
  loadRaces(): void {
    this.raceService.getAll().subscribe({
      next: (data) => {
        this.races = data;
      },
      error: (err) => {
        console.error('Erreur chargement races', err);
        this.errorMessage = 'Impossible de charger les races';
      }
    });
  }

  // Appelé quand on clique sur "Ajouter"
  onSubmit(): void {
    // Réinitialiser les messages
    this.successMessage = '';
    this.errorMessage = '';

    // Appel HTTP POST vers le backend
    this.lotService.create(this.lot).subscribe({
      next: () => {
        this.successMessage = 'Lot ajouté avec succès !';
        // Réinitialiser le formulaire
        this.lot = {
          idRace: 0,
          quantite: 0,
          date_enregistrement: '',
          age: 0,
          PA: 0
        };
      },
      error: (err) => {
        console.error('Erreur ajout lot', err);
        this.errorMessage = 'Erreur lors de l\'ajout du lot';
      }
    });
  }
}
