import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Poi, Position } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  private positionsUrl = 'https://challenge-backend.mobi7.io/posicao';
  private poisUrl = 'https://challenge-backend.mobi7.io/pois';

  getPositions(plate?: string, date?: string): Observable<Position[]> {
    let params = new HttpParams();
    if (plate) {
      params = params.append('placa', plate);
    }
    if (date) {
      params = params.append('data', date);
    }
    return this.http.get<Position[]>(this.positionsUrl, { params });
  }

  getPois(): Observable<Poi[]> {
    return this.http.get<Poi[]>(this.poisUrl);
  }
}
