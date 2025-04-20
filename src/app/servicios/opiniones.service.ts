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
  actualizarOpinion(index: number, opinion: any) {
    if (index >= 0 && index < this.opiniones.length) {
      this.opiniones[index] = opinion;
    }
  }

  eliminarOpinion(index: number) {
    if (index >= 0 && index < this.opiniones.length) {
      this.opiniones.splice(index, 1);
    }
  }
}