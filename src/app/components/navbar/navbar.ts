import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  serviciosAbierto = false;
  menuAbierto = false;

  toggleServicios() {
    this.serviciosAbierto = !this.serviciosAbierto;
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
}
