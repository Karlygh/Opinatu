import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeliculaService } from '../servicios/pelicula.service';
import { OpinionesService } from '../servicios/opiniones.service'; // ✅ Paso 1: importar el servicio nuevo
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  peliculas: any[] = [];
  nombre: string = '';
  opinion: string = '';
  peliSeleccionada: any = null;
  nota: number = 0;

  constructor(
    private peliculaService: PeliculaService,
    private opinionesService: OpinionesService // ✅ Paso 2: inyectar el servicio
  ) {}

  ngOnInit() {
    this.peliculaService.getPeliculas().subscribe({
      next: (data) => this.peliculas = data.movies,
      error: (err) => console.error(err)
    });
  }

  seleccionarPeli(peli: any) {
    this.peliSeleccionada = peli;
    this.nombre = '';
    this.opinion = '';
  }

  enviar() {
    if (this.nombre && this.opinion && this.peliSeleccionada && this.nota != null) {
      const nuevaOpinion = {
        name: this.nombre,
        opinion: this.opinion,
        nota: this.nota,
        titulo: this.peliSeleccionada.title // ✅ Paso 3: guardar también el título de la peli
      };

      this.peliSeleccionada.opinions.push(nuevaOpinion);

      this.opinionesService.agregarOpinion(nuevaOpinion); // ✅ Paso 4: guardar la opinión en el servicio

      // Limpiar el formulario
      this.nombre = '';
      this.opinion = '';
      this.nota = 0;
      this.peliSeleccionada = null;
    } else {
      alert('Por favor, completa todos los campos, incluyendo la nota.');
    }
  }
}
