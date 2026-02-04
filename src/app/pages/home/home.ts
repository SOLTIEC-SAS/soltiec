import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    constructor(private title: Title) {
    this.title.setTitle('INICIO | SOLTIEC SAS');
  }
}
