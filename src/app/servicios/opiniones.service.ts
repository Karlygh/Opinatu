import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpinionesService {
  private opiniones: any[] = [];

  agregarOpinion(opinion: any) {
    console.log('Intentando agregar opinión:', opinion);
    this.opiniones.push(opinion);
    console.log('Opinión agregada. Opiniones actuales:', this.opiniones);
  }

  obtenerOpiniones(): any[] {
    console.log('Obteniendo opiniones:', [...this.opiniones]);
    return [...this.opiniones];
  }
}