import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tecnologia',
  imports: [],
  templateUrl: './tecnologia.html',
  styleUrl: './tecnologia.css',
})
export class Tecnologia {
        constructor(private title: Title) {
    this.title.setTitle('TECNOLOGÍA | SOLTIEC SAS');
  }
}
