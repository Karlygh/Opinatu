import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PeliculaService {
  private apiUrl = 'http://localhost:3000/peliculas'; // Aquí pones la URL de tu Mockoon

  constructor(private http: HttpClient) {}

  getPeliculas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getTitulos(): Observable<string[]> {
    return this.http.get<{ titulos: string[] }>(this.apiUrl)  // Se asume que tu Mockoon devuelve { titulos: [...] }
      .pipe(map(data => data.titulos));
  }
}
