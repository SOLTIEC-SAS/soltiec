import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class Nosotros implements OnInit {
  diasSinAccidentes: number = 0;
  constructor(private title: Title) {
    this.title.setTitle('NOSOTROS | SOLTIEC SAS');
  }
  ngOnInit(): void {
    const fechaInicio = new Date(2023, 6, 4); 
    const hoy = new Date();
    const diferencia = hoy.getTime() - fechaInicio.getTime();
    this.diasSinAccidentes = Math.floor(
      diferencia / (1000 * 60 * 60 * 24)
    );
  }
}
