import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('../app/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('../app/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'mis-opiniones',
    loadComponent: () => import('./mis-opiniones/mis-opiniones.component').then(m => m.MisOpinionesComponent)
  },
  {
    path: 'details-list/:id',
    loadComponent: () => import('./details-list/details-list.component').then(m => m.DetailsListComponent)
  },
  {
    path: 'actores',
    loadComponent: () => import('./personajes/personajes.component').then(m => m.PersonajesComponent)
  }
];