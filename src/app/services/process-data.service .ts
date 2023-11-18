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
  posicoes: Position[] = [
    {
      id: 25,
      placa: 'TESTE001',
      data: '2018-12-12T02:04:03.000+00:00',
      velocidade: 100,
      latitude: -25.3649141,
      longitude: -51.469891,
      ignicao: true,
    },
    {
      id: 26,
      placa: 'TESTE001',
      data: '2018-12-12T02:34:06.000+00:00',
      velocidade: 100,
      latitude: -25.3649175,
      longitude: -51.4699098,
      ignicao: true,
    },
    {
      id: 27,
      placa: 'TESTE001',
      data: '2018-12-12T03:04:09.000+00:00',
      velocidade: 100,
      latitude: -25.3649551,
      longitude: -51.4699588,
      ignicao: true,
    },
    {
      id: 28,
      placa: 'TESTE001',
      data: '2018-12-12T03:34:12.000+00:00',
      velocidade: 100,
      latitude: -25.3649138,
      longitude: -51.4698871,
      ignicao: true,
    },
    {
      id: 29,
      placa: 'TESTE001',
      data: '2018-12-12T04:04:15.000+00:00',
      velocidade: 100,
      latitude: -25.56742701740896,
      longitude: -51.47653363645077,
      ignicao: true,
    },
    {
      id: 30,
      placa: 'TESTE001',
      data: '2018-12-12T04:34:18.000+00:00',
      velocidade: 100,
      latitude: -25.56742701740896,
      longitude: -51.47653363645077,
      ignicao: true,
    },
    {
      id: 31,
      placa: 'TESTE001',
      data: '2018-12-12T05:04:22.000+00:00',
      velocidade: 100,
      latitude: -25.56742701740896,
      longitude: -51.47653363645077,
      ignicao: true,
    },
  ];

  pois: Poi[] = [
    {
      id: 1,
      nome: 'PONTO 1',
      raio: 300,
      latitude: -25.56742701740896,
      longitude: -51.47653363645077,
    },
    {
      id: 2,
      nome: 'PONTO 2',
      raio: 300,
      latitude: -25.568056,
      longitude: -51.480278,
    },
    {
      id: 3,
      nome: 'PONTO 3',
      raio: 250,
      latitude: -25.414167,
      longitude: -51.566944,
    },
    {
      id: 4,
      nome: 'PONTO 4',
      raio: 250,
      latitude: -25.718611,
      longitude: -51.831111,
    },
    {
      id: 5,
      nome: 'PONTO 5',
      raio: 163,
      latitude: -25.37240459807051,
      longitude: -51.497342622606084,
    },
    {
      id: 6,
      nome: 'PONTO 6',
      raio: 170,
      latitude: -22.718252406214955,
      longitude: -46.78627558343578,
    },
    {
      id: 7,
      nome: 'PONTO 7',
      raio: 250,
      latitude: -25.336667,
      longitude: -51.5125,
    },
    {
      id: 8,
      nome: 'PONTO 8',
      raio: 250,
      latitude: -24.558056,
      longitude: -54.036944,
    },
  ];

  calculateTimeInPois(): Observable<PoiVehicles> {
    return forkJoin({
      posicoes: this.posicoes, //this.dataService.getPositions(),
      pois: this.pois, //this.dataService.getPois()
    }).pipe(map((data) => this.processData(this.posicoes, this.pois)));
  }

  private processData(posicoes: Position[], pois: Poi[]): PoiVehicles {
    let result: PoiVehicles = {};

    pois.forEach((poi) => {
      posicoes.forEach((posicao) => {
        if (this.isInsidePoi(posicao, poi)) {
          if (!result[poi.nome]) {
            result[poi.nome] = {};
          }
          if (!result[poi.nome][posicao.placa]) {
            result[poi.nome][posicao.placa] = {
              totalTime: 0,
              lastTimeInside: new Date(posicao.data),
            };
          } else {
            const currentTime = new Date(posicao.data);
            const lastTime = result[poi.nome][posicao.placa].lastTimeInside;
            const timeDiff =
              (currentTime.getTime() - lastTime.getTime()) / 1000;
            result[poi.nome][posicao.placa].totalTime += timeDiff;
            result[poi.nome][posicao.placa].lastTimeInside = currentTime;
          }
        }
      });
    });
    console.log('aki ->', result);
    return result;
  }

  private isInsidePoi(posicao: any, poi: any): boolean {
    const earthRadiusKm = 6371;
    const dLat = this.degreesToRadians(poi.latitude - posicao.latitude);
    const dLon = this.degreesToRadians(poi.longitude - posicao.longitude);
    const lat1 = this.degreesToRadians(posicao.latitude);
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
0;
