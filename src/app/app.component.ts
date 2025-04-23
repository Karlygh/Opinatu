import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  standalone: true
})
export class AppComponent {
  title = 'OpinasTu';
}
