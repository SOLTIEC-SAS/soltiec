import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ingenieria',
  imports: [],
  templateUrl: './ingenieria.html',
  styleUrl: './ingenieria.css',
})
export class Ingenieria {
    constructor(private title: Title) {
    this.title.setTitle('INGENIERÍA | SOLTIEC SAS');
  }
}
