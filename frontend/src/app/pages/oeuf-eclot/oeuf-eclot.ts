import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';           // pour [(ngModel)]
import { LotService } from '../../services/lot.service';
import { Lot } from '../../model/lot.model';
import { Oeuf } from '../../model/oeuf.model';
import { OeufService } from '../../services/oeuf.service';
import { LotOeuf } from '../../model/lotOeuf.model';
import { LotOeufService } from '../../services/lotOeuf.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-oeuf-eclot',
  imports: [FormsModule,RouterModule],
  templateUrl: './oeuf-eclot.html',
  styleUrl: './oeuf-eclot.scss'
})
export class OeufEclotComponent implements OnInit {
    lotOeuf: LotOeuf = {
        idOeuf: 0,
        date_enregistrement: '',
        quantite: 0
    };

    // Lot sélectionné (pour le select cascade)
    selectedLotId: number = 0;

    // Oeufs filtrés par lot sélectionné
    oeufs: Oeuf[] = [];
    lots: Lot[] = [];

    successMessage = '';
    errorMessage = '';

    constructor(
        private oeufService: OeufService,
        private lotService: LotService,
        private lotOeufService: LotOeufService
    ) {}

    ngOnInit(): void {
        this.loadLots();
        // On ne charge PAS tous les oeufs au démarrage,
        // on attend que l'utilisateur choisisse un lot
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

    // Appelé quand l'utilisateur change de lot dans le select
    onLotChange(): void {
        // Réinitialiser la sélection d'oeuf
        this.lotOeuf.idOeuf = 0;
        this.oeufs = [];

        if (!this.selectedLotId || this.selectedLotId === 0) {
            return;
        }

        // Charger les oeufs du lot sélectionné
        this.oeufService.findByLotId(this.selectedLotId).subscribe({
            next: (data) => {
                this.oeufs = data;
                if (data.length === 0) {
                    this.errorMessage = 'Aucune portée d\'oeufs pour ce lot';
                } else {
                    this.errorMessage = '';
                }
            },
            error: (err) => {
                console.error('Erreur chargement oeufs du lot', err);
                this.errorMessage = 'Impossible de charger les oeufs de ce lot';
            }
        });
    }

     onSubmit(): void {
        this.lotOeufService.create(this.lotOeuf).subscribe({
            next: () => {
                this.successMessage = 'Oeufs éclos enregistrés comme éclos avec succès';
                this.errorMessage = '';
                // Réinitialiser le formulaire
                this.lotOeuf = {
                    idOeuf: 0,
                    date_enregistrement: '',
                    quantite: 0
                };
            },
            error: (err) => {
                console.error('Erreur enregistrement oeuf éclos', err);
                this.errorMessage = 'Impossible d\'enregistrer les oeufs comme éclos';
                this.successMessage = '';
            }
        });
    }
}