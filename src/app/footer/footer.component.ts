import { Component, ViewChild } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = '';
  @ViewChild('emailInput') emailInputModel: NgModel | undefined;

  constructor(private router: Router) {
    // Escuchar eventos de navegación para hacer scroll al inicio
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }

  enviarCorreo(isValid: boolean) {
    if (isValid && this.email.trim()) {
      alert('Gracias por suscribirte! A partir de ahora recibirás nuestras novedades en tu correo.');
      this.email = '';
      this.emailInputModel?.reset();
    } else if (!isValid && this.email.trim()) {
      // El mensaje de error ya se muestra en el template
    } else {
      alert('Por favor, ingrese un correo electrónico.');
    }
  }

  // Función para hacer scroll al inicio
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Opcional: añade un desplazamiento suave
    });
  }
}