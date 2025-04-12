import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpinionesService {
  private opiniones: any[] = [];

  agregarOpinion(opinion: any) {
    this.opiniones.push(opinion);
  }

  getOpiniones() {
    return this.opiniones;
  }
}
