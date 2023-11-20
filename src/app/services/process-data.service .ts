import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Poi, PoiVehicles, Position } from '../models/data.model';

@Injectable({
  providedIn: 'root',
})
export class ProcessDataService {
  constructor(private dataService: DataService) {}

  calculateTimeInPois(
    plate?: string,
    date?: string
  ): Observable<PoiVehicles[]> {
    let posicoes$ = this.dataService.getPositions();
    let pois$ = this.dataService.getPois();

    if (plate || date) {
      posicoes$ = this.dataService.getPositions(plate, date);
    }

    return forkJoin({
      posicoes: posicoes$,
      pois: pois$,
    }).pipe(map((data) => this.processData(data.posicoes, data.pois)));
  }

  private processData(positions: Position[], pois: Poi[]): PoiVehicles[] {
    let tableData: PoiVehicles[] = [];

    pois.forEach((poi) => {
      positions.forEach((position) => {
        if (this.isInsidePoi(position, poi)) {
          let poiEntry = tableData.find(
            (entry) =>
              entry.poiName === poi.nome && entry.plate === position.placa
          );
          if (!poiEntry) {
            poiEntry = {
              plate: position.placa,
              poiName: poi.nome,
              totalTime: 0,
              lastTimeInside: new Date(position.data),
            };
            tableData.push(poiEntry);
          }

          const currentTime = new Date(position.data);
          const lastTime = poiEntry.lastTimeInside;
          const timeDiff = (currentTime.getTime() - lastTime.getTime()) / 1000;
          poiEntry.totalTime += timeDiff;
          poiEntry.lastTimeInside = currentTime;
        }
      });
    });

    return tableData;
  }

  private isInsidePoi(position: Position, poi: Poi): boolean {
    const earthRadiusKm = 6371;
    const dLat = this.degreesToRadians(poi.latitude - position.latitude);
    const dLon = this.degreesToRadians(poi.longitude - position.longitude);
    const lat1 = this.degreesToRadians(position.latitude);
    const lat2 = this.degreesToRadians(poi.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance < poi.raio / 1000;
  }

  private degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
}
