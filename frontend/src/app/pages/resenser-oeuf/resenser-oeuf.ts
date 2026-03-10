import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LotService } from '../../services/lot.service';
import { Lot } from '../../model/lot.model';
import { Oeuf } from '../../model/oeuf.model';
import { OeufService } from '../../services/oeuf.service';

@Component({
  selector: 'app-resenser-oeuf',
  imports: [FormsModule, RouterModule],
  templateUrl: './resenser-oeuf.html',
  styleUrl: './resenser-oeuf.scss'
})
export class ResenserOeufComponent implements OnInit {
  oeuf: Oeuf = { idLot: 0, date_ponte: '', quantite: 0 };
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
      next: (data) => this.lots = data,
      error: () => this.errorMessage = 'Impossible de charger les lots'
    });
  }

  onSubmit(): void {
    this.oeufService.create(this.oeuf).subscribe({
      next: () => {
        this.successMessage = 'Œufs enregistrés avec succès';
        this.errorMessage = '';
        this.oeuf = { idLot: 0, date_ponte: '', quantite: 0 };
      },
      error: () => {
        this.errorMessage = 'Impossible d\'enregistrer les œufs';
        this.successMessage = '';
      }
    });
  }
}