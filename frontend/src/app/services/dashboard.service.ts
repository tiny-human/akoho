import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardRow } from '../model/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  private apiUrl = 'http://localhost:3000/api/dashboard';

  constructor(private http: HttpClient) {}

 
  getDashboard(dateFin?: string): Observable<DashboardRow[]> {
    let params = new HttpParams();
    if (dateFin) {
      params = params.set('dateFin', dateFin);
    }
    return this.http.get<DashboardRow[]>(this.apiUrl, { params });
  }
}
