import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class LoginComponent {
  email = '';
  password = '';
  loginError = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit() {
    // Verificación simple contra Mockoon
    if (this.email === 'admin' && this.password === 'admin') {
      this.http.post('http://localhost:3000/login', {
        username: this.email,
        password: this.password
      }).subscribe({
        next: (response: any) => {
          console.log('Login exitoso:', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loginError = 'Error en el servidor';
          console.error('Error:', error);
        }
      });
    } else {
      this.loginError = 'Credenciales incorrectas (usa admin/admin)';
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}