import { Routes } from '@angular/router';
import { LoginComponent } from '../app/auth/login.component';
import { HomeComponent } from '../app/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { MisOpinionesComponent } from './mis-opiniones/mis-opiniones.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redirige a login
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent }, // Añadir la ruta de registro
  { path: 'mis-opiniones', component: MisOpinionesComponent },
];
