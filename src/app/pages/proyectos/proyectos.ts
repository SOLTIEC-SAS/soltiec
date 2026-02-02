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

    { titulo: 'Proyecto Ingeniería 1', categoria: 'Tecnología', ubicacion: 'Medellín, Antioquia', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Servicio_Energia.png' },
    { titulo: 'Proyecto Ingeniería 1', categoria: 'Ingeniería', ubicacion: 'Medellín, Antioquia', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Servicio_Energia.png' },
    { titulo: 'Proyecto Energía 1', categoria: 'Energía', ubicacion: 'Medellín, Antioquia', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Servicio_Energia.png' },
    { titulo: 'Proyecto Construcción 1', categoria: 'Construcción', ubicacion: 'Medellín, Antioquia', imagen: 'https://raw.githubusercontent.com/SOLTIEC-SAS/banco-imagenes/main/Servicio_Energia.png' },
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
