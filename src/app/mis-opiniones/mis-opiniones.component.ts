import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpinionesService } from '../servicios/opiniones.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from "../footer/footer.component";
import { PeliculaService } from '../servicios/pelicula.service';
import { map } from 'rxjs/operators'; // <-- IMPORTANTE para map

@Component({
  selector: 'app-mis-opiniones',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule, FooterComponent],
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
  peliculas: string[] = [];  // Array para almacenar los títulos de las películas

  constructor(
    private opinionesService: OpinionesService,
    private peliculaService: PeliculaService
  ) {}

  ngOnInit(): void {
    this.cargarOpiniones();
    // Llamada al servicio para obtener los títulos de las películas desde Mockoon
    this.peliculaService.getTitulos().subscribe((data) => {
      console.log(data); // Verifica en la consola si los datos se reciben correctamente
      this.peliculas = data;  // Asigna los títulos al array
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
    this.opinionesService.eliminarOpinion(index);
    this.cargarOpiniones();
  }

  obtenerTop3() {
    return [...this.opiniones]
      .sort((a, b) => b.nota - a.nota)
      .slice(0, 3);
  }

  agregarNuevaOpinion() {
    const { titulo, name, opinion, nota } = this.nuevaOpinion;

    if (titulo.trim() && name.trim() && opinion.trim() && nota !== null && nota >= 1 && nota <= 10) {
      this.opiniones.push({ ...this.nuevaOpinion });
      this.nuevaOpinion = { titulo: '', name: '', opinion: '', nota: null };
    } else {
      alert('Completa todos los campos correctamente');
    }
  }
}
