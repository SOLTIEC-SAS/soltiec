import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WhatsappButton } from './components/whatsapp-button/whatsapp-button';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    WhatsappButton, 
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('soltiec');
}
