import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { PeliculaService } from '../servicios/pelicula.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-details-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.css']
})
export class DetailsListComponent implements OnInit {
  pelicula: any;
  peliculasAleatorias: any[] = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private peliculaService: PeliculaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido en DetailsListComponent:', id);  // Agrega un log para verificar el ID
    
    if (!isNaN(id)) {
      this.peliculaService.getPeliculas().subscribe({
        next: (data) => {
          this.pelicula = data.movies.find((p: any) => p.id === id);
          if (!this.pelicula) {
            console.warn('Película no encontrada, redirigiendo al home');
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.error('Error al obtener las películas', err);
          this.router.navigate(['/home']);
        }
      });
    } else {
      console.warn('ID inválido, redirigiendo al home');
      this.router.navigate(['/home']);
    }
  }
  
  cargarPeliculasAleatorias(todasLasPeliculas: any[]) {
    this.peliculasAleatorias = todasLasPeliculas
      .filter((p: any) => p.title !== this.pelicula.title)
      .sort(() => 0.5 - Math.random())
      .slice(0, 12);
  }

  dividirEnGrupos(array: any[], tamanoGrupo: number): any[][] {
    const grupos = [];
    for (let i = 0; i < array.length; i += tamanoGrupo) {
      grupos.push(array.slice(i, i + tamanoGrupo));
    }
    return grupos;
  }

  verDetalles(id: number): void {
    this.router.navigate([`/details-list/${id}`]);
  }
}
