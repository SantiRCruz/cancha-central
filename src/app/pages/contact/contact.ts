import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  template: `
    <section class="page-space container contact-layout">
      <div>
        <p class="eyebrow">Hablemos de fútbol</p>
        <h1 class="page-title">Contáctanos</h1>
        <p class="lead">¿Tienes una noticia, sugerencia o propuesta?</p>
        <div class="contact-data">
          <h2>Correo editorial</h2>
          <a href="mailto:redaccion@canchacentral.co">redaccion&#64;canchacentral.co</a>
          <h2>Redes sociales</h2>
          <p>Instagram · X · YouTube</p>
        </div>
      </div>
      <div class="form-card">
        <h2>Envíanos un mensaje</h2>
        <p class="form-help">* Campos obligatorios. El correo se valida antes de enviar.</p>
        <form #contactForm="ngForm" (ngSubmit)="submit(contactForm)" novalidate>
          <label
            >Nombre completo *<input
              name="name"
              [(ngModel)]="model.name"
              required
              minlength="3"
              #name="ngModel"
            /><span class="error">{{
              submitted() && name.invalid ? 'Ingresa tu nombre completo.' : ''
            }}</span></label
          >
          <label
            >Correo electrónico *<input
              type="email"
              name="email"
              [(ngModel)]="model.email"
              required
              email
              #email="ngModel"
            /><span class="error">{{
              submitted() && email.invalid ? 'Ingresa un correo válido.' : ''
            }}</span></label
          >
          <label
            >Asunto *<input
              name="subject"
              [(ngModel)]="model.subject"
              required
              #subject="ngModel"
            /><span class="error">{{
              submitted() && subject.invalid ? 'Escribe un asunto.' : ''
            }}</span></label
          >
          <label
            >Mensaje *<textarea
              name="message"
              [(ngModel)]="model.message"
              required
              minlength="10"
              rows="5"
              #message="ngModel"
            ></textarea
            ><span class="error">{{
              submitted() && message.invalid ? 'Escribe al menos 10 caracteres.' : ''
            }}</span></label
          >
          <button class="button" type="submit">Enviar mensaje</button>
          @if (success()) {
            <p class="success-message" role="status">✓ Mensaje enviado correctamente.</p>
          }
        </form>
      </div>
    </section>
  `,
})
export class Contact {
  readonly submitted = signal(false);
  readonly success = signal(false);
  model = { name: '', email: '', subject: '', message: '' };

  submit(form: NgForm): void {
    this.submitted.set(true);
    this.success.set(false);
    if (form.invalid) return;
    this.success.set(true);
    form.resetForm();
    this.submitted.set(false);
  }
}
