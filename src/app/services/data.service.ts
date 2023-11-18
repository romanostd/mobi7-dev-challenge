import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  private positionsUrl = 'https://challenge-backend.mobi7.io/posicao';
  private poisUrl = 'https://challenge-backend.mobi7.io/pois';

  getPositions(): Observable<any[]> {
    return this.http.get<any[]>(this.positionsUrl);
  }

  getPois(): Observable<any[]> {
    return this.http.get<any[]>(this.poisUrl);
  }
}
