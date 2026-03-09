import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LotOeuf } from '../model/lotOeuf.model';

@Injectable({ providedIn: 'root' })
export class LotOeufService {
  private apiUrl = 'http://localhost:3000/api/lot-oeufs';

  constructor(private http: HttpClient) {}

  create(lotOeuf: LotOeuf): Observable<any> {
    return this.http.post(this.apiUrl, lotOeuf);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  findOeufByLotId(idLot: number): Observable<LotOeuf[]> {
    return this.http.get<LotOeuf[]>(`${this.apiUrl}/lot/${idLot}`);
  }
}