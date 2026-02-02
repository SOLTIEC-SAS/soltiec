import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css',
})
export class Proyectos {

  tabs = ['Todos', 'Tecnología', 'Ingeniería', 'Energía', 'Construcción'];

  tabActiva = 'Todos';

  proyectos = [
    { titulo: 'SSFV híbrido 8,05 kWp', categoria: 'Energía', ubicacion: 'Cali, Valle del Cauca', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Energia1.jpg', alt: 'SSFV híbrido 8,05 kWp' },
    { titulo: 'Construcción parque infantil', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Construccion1.JPEG', alt: 'Adecuación parque infantil' },
    { titulo: 'SSFV on-grid 20,34 kWp', categoria: 'Energía', ubicacion: 'Istmina, Chocó', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Energia2.png', alt: 'SSFV on-grid 20,34 kWp' },
    { titulo: 'Adecuación cancha sintética', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Construccion2.JPEG', atl: 'Adecuación cancha sintética' },
    { titulo: 'SSFV on-grid 44 kWp', categoria: 'Energía', ubicacion: 'Quibdó, Chocó', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Energia3.JPG', alt: 'SSFV on-grid 44 kWp' },
    { titulo: 'Adecuación cancha arenilla', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Construccion3.jpg', atl: 'Adecuación cancha arenilla' },
    { titulo: '', categoria: 'Energía', ubicacion: '', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Energia4.jpg', alt: '' },
    { titulo: 'Adecuación parque infantil', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Construccion4.JPEG', atl: 'Adecuación parque infantil' },
    { titulo: 'SSFV on-grid 29,33 kWp', categoria: 'Energía', ubicacion: 'Cali, Valle del Cauca', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Energia5.jpg', alt: 'SSFV on-grid 29,33 kWp' },
    { titulo: 'Cambio de fachada', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Construccion5.JPEG', atl: 'Cambio de fachada' },
  ];
  get proyectosFiltrados() {

    if (this.tabActiva === 'Todos') {
      return this.proyectos;
    }
    return this.proyectos.filter(
      p => p.categoria === this.tabActiva
    );
  }

  seleccionarTab(tab: string) {
    this.tabActiva = tab;
  }

}
