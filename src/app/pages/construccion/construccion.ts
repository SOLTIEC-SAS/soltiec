import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-construccion',
  imports: [],
  templateUrl: './construccion.html',
  styleUrl: './construccion.css',
})
export class Construccion {
    constructor(private title: Title) {
    this.title.setTitle('CONSTRUCCIÓN | SOLTIEC SAS');
  }
}
