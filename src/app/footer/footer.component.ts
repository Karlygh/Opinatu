import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, FormsModule,],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = '';

  enviarCorreo() {
    if (this.email.trim()) {
      alert('Gracias por suscribirte! A partir de ahora recibirás nuestras novedades en tu correo.');
    } else {
      alert('Por favor, ingrese un correo válido.');
    }
  }
}
