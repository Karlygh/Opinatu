import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpinionesService {
  private opiniones: any[] = [];

  agregarOpinion(opinion: any) {
    this.opiniones.push(opinion);
  }

  obtenerOpiniones(): any[] {
    return [...this.opiniones]; // Devuelve copia del array
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