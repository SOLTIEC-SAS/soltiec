import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {

  currentSlide = 0;
  totalSlides = 4;
  interval: any;

  constructor(
    private title: Title,
    private cdr: ChangeDetectorRef
  ) {
    this.title.setTitle('INICIO | SOLTIEC SAS');
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      this.cdr.detectChanges();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
