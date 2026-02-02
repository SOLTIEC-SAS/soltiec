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
    { titulo: 'Construcción parque infantil', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Construccion1.JPEG', alt: "Adecuación parque infantil" },
    { titulo: 'Adecuación cancha sintética', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Construccion2.JPEG', atl: "Adecuación cancha sintética" },
    { titulo: 'Adecuación cancha arenilla', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Construccion3.jpg', atl: "Adecuación cancha arenilla" },
    { titulo: 'Adecuación parque infantil', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Construccion4.JPEG', atl: "Adecuación parque infantil" },
    { titulo: 'Cambio de fachada', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Construccion5.JPEG', atl: "Cambio de fachada" },


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
