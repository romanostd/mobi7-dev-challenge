export interface Poi {
    id: number;
    nome: string;
    raio: number;
    latitude: number;
    longitude: number;
}

export interface Position {
    id: number;
    placa: string;
    data: string;
    velocidade: number;
    latitude: number;
    longitude: number;
    ignicao: boolean;
  }
  
  
  
  export interface VehicleInPoi {
    totalTime: number;
    lastTimeInside: Date;
  }
  
  export interface PoiVehicles {
    [name: string]: {
      [plate: string]: VehicleInPoi;
    };
  }