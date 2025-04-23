import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpinionesService } from '../servicios/opiniones.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { PeliculaService } from '../servicios/pelicula.service';

@Component({
  selector: 'app-mis-opiniones',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './mis-opiniones.component.html',
  styleUrls: ['./mis-opiniones.component.css']
})
export class MisOpinionesComponent implements OnInit {
  opiniones: any[] = [];
  editandoIndex: number | null = null;
  opinionEditada: any = {};
  nuevaOpinion = {
    titulo: '',
    name: '',
    opinion: '',
    nota: null
  };
  peliculas: string[] = [];

  constructor(
    private opinionesService: OpinionesService,
    private peliculaService: PeliculaService
  ) {}

  ngOnInit(): void {
    this.cargarOpiniones();
    this.peliculaService.getTitulos().subscribe((data) => {
      this.peliculas = data;
    });
  }

  cargarOpiniones() {
    this.opiniones = this.opinionesService.obtenerOpiniones();
  }

  editarOpinion(index: number) {
    this.editandoIndex = index;
    this.opinionEditada = { ...this.opiniones[index] };
  }

  guardarEdicion() {
    if (this.editandoIndex !== null) {
      this.opinionesService.actualizarOpinion(this.editandoIndex, this.opinionEditada);
      this.cargarOpiniones();
      this.cancelarEdicion();
    }
  }

  cancelarEdicion() {
    this.editandoIndex = null;
    this.opinionEditada = {};
  }

  eliminarOpinion(index: number) {
    // Confirmar antes de eliminar
    if (confirm('¿Estás seguro de eliminar esta opinión?')) {
      this.opinionesService.eliminarOpinion(index);
      // Actualizar la vista correctamente
      this.opiniones = this.opinionesService.obtenerOpiniones();
    }
  }

  obtenerTop3() {
    return [...this.opiniones]
      .sort((a, b) => b.nota - a.nota)
      .slice(0, 3);
  }

  agregarNuevaOpinion() {
    const { titulo, name, opinion, nota } = this.nuevaOpinion;

    if (titulo.trim() && name.trim() && opinion.trim() && nota !== null && nota >= 1 && nota <= 10) {
      this.opinionesService.agregarOpinion({ ...this.nuevaOpinion });
      this.nuevaOpinion = { titulo: '', name: '', opinion: '', nota: null };
      this.cargarOpiniones();
    } else {
      alert('Por favor completa todos los campos correctamente');
    }
  }
}