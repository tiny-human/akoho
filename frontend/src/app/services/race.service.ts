import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Race } from '../model/race.model';

@Injectable({ providedIn: 'root' })
export class RaceService {
  private apiUrl = 'http://localhost:3000/api/races';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Race[]> {
    return this.http.get<Race[]>(this.apiUrl);
  }
}
