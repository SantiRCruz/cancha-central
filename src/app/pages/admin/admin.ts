import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NewsService } from '../../core/news.service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  template: `
    <section class="page-space container">
      <div class="title-row">
        <div>
          <p class="eyebrow">Panel editorial</p>
          <h1 class="page-title">Administrar noticias</h1>
        </div>
        <button class="button" type="button" (click)="formVisible.update((value) => !value)">
          {{ formVisible() ? 'Cerrar formulario' : '+ Nueva noticia' }}
        </button>
      </div>
      <p class="lead">Crea y elimina publicaciones almacenadas localmente en este navegador.</p>
      @if (message()) {
        <p class="success-message admin-message" role="status">{{ message() }}</p>
      }
      @if (formVisible()) {
        <div class="form-card admin-form">
          <h2>Crear noticia</h2>
          <p class="form-help">* Todos los campos son obligatorios.</p>
          <form #articleForm="ngForm" (ngSubmit)="create(articleForm)" novalidate>
            <label
              >Título *<input
                name="title"
                [(ngModel)]="model.title"
                required
                minlength="5"
                #title="ngModel"
                [class.invalid]="submitted() && title.invalid"
                [attr.aria-invalid]="submitted() && title.invalid"
              /><span class="error">{{
                submitted() && title.invalid ? 'Escribe un título de al menos 5 caracteres.' : ''
              }}</span></label
            >
            <label
              >Categoría *<select
                name="category"
                [(ngModel)]="model.category"
                required
                #category="ngModel"
                [class.invalid]="submitted() && category.invalid"
                [attr.aria-invalid]="submitted() && category.invalid"
              >
                <option>Fútbol colombiano</option>
                <option>Internacional</option>
                <option>Champions</option>
                <option>Opinión</option>
              </select><span class="error">{{
                submitted() && category.invalid ? 'Selecciona una categoría.' : ''
              }}</span></label
            >
            <label
              >Descripción breve *<textarea
                name="description"
                [(ngModel)]="model.description"
                required
                minlength="10"
                rows="3"
                #description="ngModel"
                [class.invalid]="submitted() && description.invalid"
                [attr.aria-invalid]="submitted() && description.invalid"
              ></textarea><span class="error">{{
                submitted() && description.invalid
                  ? 'Escribe una descripción de al menos 10 caracteres.'
                  : ''
              }}</span>
            </label>
            <label
              >Contenido *<textarea
                name="content"
                [(ngModel)]="model.content"
                required
                minlength="20"
                rows="5"
                #content="ngModel"
                [class.invalid]="submitted() && content.invalid"
                [attr.aria-invalid]="submitted() && content.invalid"
              ></textarea><span class="error">{{
                submitted() && content.invalid
                  ? 'Escribe un contenido de al menos 20 caracteres.'
                  : ''
              }}</span>
            </label>
            <button class="button" type="submit">Publicar noticia</button>
            @if (formError()) {
              <p class="form-error" role="alert">{{ formError() }}</p>
            }
          </form>
        </div>
      }
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoría</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            @for (item of news.created(); track item.id) {
              <tr>
                <td>
                  <strong>{{ item.title }}</strong>
                </td>
                <td>{{ item.category }}</td>
                <td>{{ item.date }}</td>
                <td><span class="status">Publicado</span></td>
                <td>
                  <button class="delete-button" type="button" (click)="remove(item.id)">
                    Eliminar
                  </button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="5">No hay noticias creadas aún. Usa “Nueva noticia” para empezar.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
})
export class Admin {
  readonly news = inject(NewsService);
  readonly formVisible = signal(false);
  readonly message = signal('');
  readonly submitted = signal(false);
  readonly formError = signal('');
  model = { title: '', category: 'Fútbol colombiano', description: '', content: '' };

  create(form: NgForm): void {
    this.submitted.set(true);
    this.message.set('');
    this.formError.set('');
    if (form.invalid) {
      form.control.markAllAsTouched();
      this.formError.set('Revisa los campos marcados antes de publicar la noticia.');
      return;
    }
    this.news.addArticle(this.model);
    this.message.set('Noticia creada correctamente. Ya aparece en el catálogo y en esta tabla.');
    this.formVisible.set(false);
    form.resetForm({ category: 'Fútbol colombiano' });
    this.submitted.set(false);
  }

  remove(id: number): void {
    this.news.deleteArticle(id);
    this.message.set('Noticia eliminada correctamente.');
  }
}
