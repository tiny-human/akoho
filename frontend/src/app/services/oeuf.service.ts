import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Oeuf } from '../model/oeuf.model';

@Injectable({ providedIn: 'root' })
export class OeufService {
  private apiUrl = 'http://localhost:3000/api/oeufs';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Oeuf[]> {
    return this.http.get<Oeuf[]>(this.apiUrl);
  }

  getById(id: number): Observable<Oeuf> {
    return this.http.get<Oeuf>(`${this.apiUrl}/${id}`);
  }

  create(oeuf: Oeuf): Observable<any> {
    return this.http.post(this.apiUrl, oeuf);
  }

  update(id: number, oeuf: Oeuf): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, oeuf);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}0