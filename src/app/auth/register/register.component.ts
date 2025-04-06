import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], // ✅ Correcto
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  constructor(private router:Router) {}
  onSubmit() {
    console.log('Registro con:', {nombre:this.name, email:this.email});
    this.router.navigate(['/home']);
  }
  onLogin() {
    this.router.navigate(['/login']);
}
}
