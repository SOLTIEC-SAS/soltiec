import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-calculadora',
  imports: [],
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.css',
})
export class Calculadora {
        constructor(private title: Title) {
    this.title.setTitle('CALCULADORA SSFV | SOLTIEC SAS');
  }
}
