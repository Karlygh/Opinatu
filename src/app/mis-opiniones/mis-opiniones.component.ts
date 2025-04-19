import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpinionesService } from '../servicios/opiniones.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-mis-opiniones',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './mis-opiniones.component.html',
  styleUrls: ['./mis-opiniones.component.css']
})
export class MisOpinionesComponent implements OnInit {
  opiniones: any[] = [];

  constructor(private opinionesService: OpinionesService) {
    console.log('MisOpinionesComponent construido');
  }

  ngOnInit(): void {
    console.log('MisOpinionesComponent ngOnInit ejecutado');
    this.cargarOpiniones();
  }

  cargarOpiniones() {
    this.opiniones = this.opinionesService.obtenerOpiniones();
    console.log('Opiniones cargadas en MisOpiniones:', this.opiniones);
  }
}