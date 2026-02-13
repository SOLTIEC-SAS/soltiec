import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css',
})
export class Proyectos {

  constructor(private title: Title) {
    this.title.setTitle('PROYECTOS | SOLTIEC SAS');
  }
  tabs = ['Todos', 'Tecnología', 'Ingeniería', 'Energía', 'Construcción'];

  tabActiva = 'Todos';

  proyectos = [
    { titulo: 'SSFV híbrido 8,05 kWp', categoria: 'Energía', ubicacion: 'Cali, Valle del Cauca', imagen: 'assets/images/Energia1.jpg', alt: 'SSFV híbrido 8,05 kWp' },
    { titulo: 'Construcción parque infantil', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'assets/images/Construccion1.JPEG', alt: 'Adecuación parque infantil' },
    { titulo: 'SSFV on-grid 20,34 kWp', categoria: 'Energía', ubicacion: 'Istmina, Chocó', imagen: 'assets/images/Energia2.png', alt: 'SSFV on-grid 20,34 kWp' },
    { titulo: 'Adecuación cancha sintética', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'assets/images/Construccion2.JPEG', atl: 'Adecuación cancha sintética' },
    { titulo: 'SSFV on-grid 44 kWp', categoria: 'Energía', ubicacion: 'Quibdó, Chocó', imagen: 'assets/images/Energia3.JPG', alt: 'SSFV on-grid 44 kWp' },
    { titulo: 'Adecuación cancha arenilla', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'assets/images/Construccion3.jpg', atl: 'Adecuación cancha arenilla' },
    { titulo: 'SSFV híbrido 15 kWp', categoria: 'Energía', ubicacion: 'Cali, Valle del Cauca', imagen: 'assets/images/Energia4.jpg', alt: 'SSFV on-grid 15 kWp' },
    { titulo: 'Adecuación parque infantil', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'assets/images/Construccion4.JPEG', atl: 'Adecuación parque infantil' },
    { titulo: 'SSFV on-grid 29,33 kWp', categoria: 'Energía', ubicacion: 'Cali, Valle del Cauca', imagen: 'assets/images/Energia5.jpg', alt: 'SSFV on-grid 29,33 kWp' },
    { titulo: 'Cambio de fachada', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'assets/images/Construccion5.JPEG', atl: 'Cambio de fachada' },
    

    
    { titulo: 'SSFV on-grid 4,7 kWp', categoria: 'Energía', ubicacion: 'Cali, Valle del Cauca', imagen: 'assets/images/Energia6.jpeg', alt: 'SSFV on-grid 4,7 kWp' },
    { titulo: 'SSFV para Radioenlaces', categoria: 'Energía', ubicacion: 'Montelíbano, Córdoba', imagen: 'assets/images/Energia7.jpg', alt: 'SSFV para Radioenlaces' },

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
