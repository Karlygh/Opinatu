import { Component, OnInit } from '@angular/core';
import { OpinionesService } from '../servicios/opiniones.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-mis-opiniones',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './mis-opiniones.component.html',
  styleUrl: './mis-opiniones.component.css'
})
export class MisOpinionesComponent implements OnInit {
  opiniones: any[] = [];
  constructor(private opinionesService: OpinionesService) { }
  ngOnInit(): void {
    this.opiniones = this.opinionesService.getOpiniones();
  }
}
