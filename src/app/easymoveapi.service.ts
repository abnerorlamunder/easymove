import { Injectable } from '@angular/core';
import { delay } from 'q';
import { RetornoBusca } from './retorno-busca';

@Injectable({
  providedIn: 'root'
})
export class EasymoveapiService {

  constructor() { }

  buscarUber(lat1, lat2, long1, long2, categoria): Promise<RetornoBusca> {
    return new Promise(res => setTimeout(res, this.randomIntFromInterval(3000, 9000))).then(res => {
      return Promise.resolve(new RetornoBusca('Uber', this.getValorRandom(3.2, lat1, lat2, long1, long2), this.getTempoEsperaRandom(categoria), this.getTempoViagem(lat1, lat2, long1, long2), categoria));
    });
  }

  buscar4Move(lat1, lat2, long1, long2, categoria): Promise<RetornoBusca> {
    return new Promise(res => setTimeout(res, this.randomIntFromInterval(3000, 9000))).then(res => {
      return Promise.resolve(new RetornoBusca('4Move', this.getValorRandom(3, lat1, lat2, long1, long2), this.getTempoEsperaRandom(categoria), this.getTempoViagem(lat1, lat2, long1, long2), categoria));
    });
  }

  buscar99Pop(lat1, lat2, long1, long2, categoria): Promise<RetornoBusca> {
    return new Promise(res => setTimeout(res, this.randomIntFromInterval(3000, 9000))).then(res => {
      return Promise.resolve(new RetornoBusca('99Pop', this.getValorRandom(2.5, lat1, lat2, long1, long2), this.getTempoEsperaRandom(categoria), this.getTempoViagem(lat1, lat2, long1, long2), categoria));
    });
  }

  getTempoViagem(lat1: number, lat2: number, long1: number, long2: number) {
    let distance = this.distanceBetweenPoints(lat1, lat2, long1, long2);
    return distance / this.randomIntFromInterval(30, 50) * 3600;
  }

  getValorRandom(valorPorKm, lat1: number, lat2: number, long1: number, long2: number) {
    let distance = this.distanceBetweenPoints(lat1, lat2, long1, long2);
    let valorMinimo = 6.5;
    let valorFixo = 0.75;
    let valorDistancia = distance * valorPorKm;
    let valorTotal = valorFixo + valorDistancia;
    if (valorTotal < valorMinimo) {
      valorTotal = valorMinimo;
    }
    return valorTotal;
  }

  getTempoEsperaRandom(categoria) {
    if(categoria == 1) {
      return this.randomIntFromInterval(40, 200);
    } else if(categoria == 2) {
      return this.randomIntFromInterval(60, 300);
    } else if(categoria == 3) {
      return this.randomIntFromInterval(80, 400);
    } else if(categoria == 4) {
      return this.randomIntFromInterval(100, 500);
    } else if(categoria == 5) {
      return this.randomIntFromInterval(120, 600);
    }
  }

  distanceBetweenPoints(lat1: number, lat2: number, long1: number, long2: number) {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((long1 - long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }

  randomIntFromInterval(min, max) // min and max included
  {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
