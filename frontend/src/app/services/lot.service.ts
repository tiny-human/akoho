// Service = classe qui fait les appels HTTP vers le backend
// Injectable = Angular peut l'injecter automatiquement dans les composants

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lot } from '../model/lot.model';
import { Oeuf } from '../model/oeuf.model';

@Injectable({ providedIn: 'root' })   // disponible partout dans l'app
export class LotService {

  // URL de base de l'API backend
  private apiUrl = 'http://localhost:3000/api/lots';

  // HttpClient est injecté automatiquement par Angular
  constructor(private http: HttpClient) {}

  // GET /api/lots → récupérer tous les lots
  getAll(): Observable<Lot[]> {
    return this.http.get<Lot[]>(this.apiUrl);
  }

  // GET /api/lots/:id → récupérer un lot par son id
  getById(id: number): Observable<Lot> {
    return this.http.get<Lot>(`${this.apiUrl}/${id}`);
  }

  // POST /api/lots → créer un nouveau lot
  create(lot: Lot): Observable<any> {
    return this.http.post(this.apiUrl, lot);
  }

  // PUT /api/lots/:id → modifier un lot
  update(id: number, lot: Lot): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, lot);
  }

  // DELETE /api/lots/:id → supprimer un lot
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

    // GET /api/lots/:id/oeufs → récupérer les oeufs d'un lot
  getOeufsByLotId(id: number): Observable<Oeuf[]> {
    return this.http.get<Oeuf[]>(`${this.apiUrl}/${id}/oeufs`);
  }

  getMortByLotId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/mort`);
  }
}
