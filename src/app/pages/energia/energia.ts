import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-energia',
  imports: [],
  templateUrl: './energia.html',
  styleUrl: './energia.css',
})
export class Energia {
      constructor(private title: Title) {
    this.title.setTitle('ENERGÍA | SOLTIEC SAS');
  }
}
