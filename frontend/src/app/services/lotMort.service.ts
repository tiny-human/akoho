import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lot } from '../model/lot.model';
import {LotMort} from '../model/lotMort.model';

@Injectable({ providedIn: 'root' })
export class LotMortService {

  private apiUrl = 'http://localhost:3000/api/lot-morts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LotMort[]> {
    return this.http.get<LotMort[]>(this.apiUrl);
  }

  getById(id: number): Observable<LotMort> {
    return this.http.get<LotMort>(`${this.apiUrl}/${id}`);
  }

  create(lotMort: LotMort): Observable<any> {
    return this.http.post(this.apiUrl, lotMort);
  }

  update(id: number, lotMort: LotMort): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, lotMort);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}