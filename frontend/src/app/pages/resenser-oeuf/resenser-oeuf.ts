import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';           // pour [(ngModel)]
import { LotService } from '../../services/lot.service';
import { Lot } from '../../model/lot.model';
import { Oeuf } from '../../model/oeuf.model';
import { OeufService } from '../../services/oeuf.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-resenser-oeuf',
  // "standalone" est le mode par défaut dans Angular 21
  // "imports" = les modules dont ce composant a besoin
  imports: [FormsModule,RouterModule],
  templateUrl: './resenser-oeuf.html',
  styleUrl: './resenser-oeuf.scss'
})
export class ResenserOeufComponent implements OnInit {
    oeuf : Oeuf = {
        idLot: 0,
        date_ponte: '',
        quantite: 0
    };

    lots: Lot[] = [];

    successMessage = '';
    errorMessage = '';

    constructor(
        private oeufService: OeufService,
        private lotService: LotService
    ) {}

    ngOnInit(): void {
        this.loadLots();
    }

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

     onSubmit(): void {
        this.oeufService.create(this.oeuf).subscribe({
            next: () => {
                this.successMessage = 'Oeufs enregistrés avec succès';
                this.errorMessage = '';
                // Réinitialiser le formulaire
                this.oeuf = {
                    idLot: 0,
                    date_ponte: '',
                    quantite: 0
                };
            },
            error: (err) => {
                console.error('Erreur enregistrement oeuf', err);
                this.errorMessage = 'Impossible d\'enregistrer l\'oeuf';
                this.successMessage = '';
            }
        });
    }
}