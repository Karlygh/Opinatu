import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { PeliculaService } from '../servicios/pelicula.service';


@Component({
  selector: 'app-details-list',
  standalone: true,
  imports: [CommonModule,   RouterModule],
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.css']
})
export class DetailsListComponent implements OnInit {
  pelicula: any;
  peliculasAleatorias: any[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private peliculaService: PeliculaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      
      if (!isNaN(id)) {
        this.loadPeliculaData(id);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  private loadPeliculaData(id: number): void {
    this.peliculaService.getPeliculas().subscribe({
      next: (data) => {
        this.pelicula = data.movies.find((p: any) => p.id === id);
        
        if (this.pelicula) {
          this.loadRandomMovies(data.movies);
        } else {
          this.router.navigate(['/home']);
        }
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading movies', err);
        this.router.navigate(['/home']);
        this.isLoading = false;
      }
    });
  }

  private loadRandomMovies(allMovies: any[]): void {
    this.peliculasAleatorias = allMovies
      .filter(p => p.id !== this.pelicula.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 12);
  }

  dividirEnGrupos(array: any[], tamanoGrupo: number): any[][] {
    return array.reduce((result, item, index) => {
      const groupIndex = Math.floor(index / tamanoGrupo);
      
      if (!result[groupIndex]) {
        result[groupIndex] = [];
      }
      
      result[groupIndex].push(item);
      return result;
    }, []);
  }

  verDetalles(id: number): void {
    this.router.navigate(['/details-list', id]);
  }
}