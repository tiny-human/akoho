import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lot } from '../model/lot.model';

@Injectable({ providedIn: 'root' })
export class LotService {

  private apiUrl = 'http://localhost:3000/api/lots';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Lot[]> {
    return this.http.get<Lot[]>(this.apiUrl);
  }

  getById(id: number): Observable<Lot> {
    return this.http.get<Lot>(`${this.apiUrl}/${id}`);
  }

  create(lot: Lot): Observable<any> {
    return this.http.post(this.apiUrl, lot);
  }

  update(id: number, lot: Lot): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, lot);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
