import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';           // pour [(ngModel)]
import { LotService } from '../../services/lot.service';
import { LotMortService } from '../../services/lotMort.service';
import { LotMort } from '../../model/lotMort.model';
import { Lot } from '../../model/lot.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ajouter-mort',
  // "standalone" est le mode par défaut dans Angular 21
  // "imports" = les modules dont ce composant a besoin
  imports: [FormsModule,RouterModule],
  templateUrl: './ajouter-mort.html',
  styleUrl: './ajouter-mort.scss'
})
export class AjouterMortComponent implements OnInit {

  // Objet lotMort lié au formulaire (les champs du form remplissent cet objet)
  lotMort: LotMort = {
    idLot: 0,
    quantite: 0,
    date_enregistrement: ''
  };

  // Liste des lots (pour le <select>)
  lots: Lot[] = [];

  // Messages affichés à l'utilisateur
  successMessage = '';
  errorMessage = '';

  // Les services sont injectés via le constructeur
  constructor(
    private lotService: LotService,
    private lotMortService: LotMortService
  ) {}

  // ngOnInit() est appelé automatiquement quand le composant s'affiche
  ngOnInit(): void {
    this.loadLots();
  }

  // Charger la liste des lots depuis le backend
  loadLots(): void {
    this.lotService.getAll().subscribe({
      next: (data) => {
        this.lots = data;
      },
      error: (err) => {
        console.error('Erreur chargement lots', err);
        this.errorMessage = 'Impossible de charger les lots';
      }
    });
  }

  // Appelé quand on clique sur "Ajouter"
  onSubmit(): void {
    this.lotMortService.create(this.lotMort).subscribe({
      next: () => {
        this.successMessage = 'Morts enregistrés avec succès';
        this.errorMessage = '';
        // Réinitialiser le formulaire
        this.lotMort = {
          idLot: 0,
          quantite: 0,
          date_enregistrement: ''
        };
      },
      error: (err) => {
        console.error('Erreur enregistrement mort', err);
        this.errorMessage = 'Impossible d\'enregistrer les morts';
        this.successMessage = '';
      }
    });
  }

}