import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {

  constructor(private title: Title) {
    this.title.setTitle('CONTACTO | SOLTIEC SAS');
  }

  loading = false;
  enviado = false;
  error = false;

  // Auto resize del textarea
  autoResize(event: any) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.overflow = 'hidden';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  enviarFormulario(form: any) {

    if (form.invalid) return;

    this.loading = true;
    this.enviado = false;
    this.error = false;

    emailjs.send(
      'service_pz6g3sy',
      'template_p6aodjy',
      {
        from_name: form.value.nombre,
        phone: form.value.telefono,
        from_email: form.value.email || 'No proporcionado',
        message: form.value.mensaje || 'Sin mensaje'
      },
      'GtSDHnH74g9kOpuYS'
    )
    .then(() => {
      this.loading = false;
      this.enviado = true;
      form.resetForm();

      setTimeout(() => {
        this.enviado = false;
      }, 4000);
    })
    .catch((err) => {
      console.error('Error EmailJS:', err);
      this.loading = false;
      this.error = true;

      setTimeout(() => {
        this.error = false;
      }, 4000);
    });
  }
}
