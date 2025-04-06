import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeliculaService } from '../servicios/pelicula.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  peliculas: any[] = [];
  nombre: string = '';
  opinion: string = '';
  peliSeleccionada: any = null;
  nota : number = 0;

  constructor(private peliculaService: PeliculaService) {}

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

      this.peliSeleccionada.opinions.push({
        name: this.nombre,
        opinion: this.opinion,
        nota: this.nota
      });
  
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

