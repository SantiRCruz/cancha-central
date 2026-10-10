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
          <form #articleForm="ngForm" (ngSubmit)="create(articleForm)">
            <label
              >Título *<input name="title" [(ngModel)]="model.title" required minlength="5"
            /></label>
            <label
              >Categoría *<select name="category" [(ngModel)]="model.category" required>
                <option>Fútbol colombiano</option>
                <option>Internacional</option>
                <option>Champions</option>
                <option>Opinión</option>
              </select></label
            >
            <label
              >Descripción breve *<textarea
                name="description"
                [(ngModel)]="model.description"
                required
                minlength="10"
                rows="3"
              ></textarea>
            </label>
            <label
              >Contenido *<textarea
                name="content"
                [(ngModel)]="model.content"
                required
                minlength="20"
                rows="5"
              ></textarea>
            </label>
            <button class="button" type="submit">Publicar noticia</button>
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
  model = { title: '', category: 'Fútbol colombiano', description: '', content: '' };

  create(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.news.addArticle(this.model);
    this.message.set('Noticia creada correctamente.');
    this.formVisible.set(false);
    form.resetForm({ category: 'Fútbol colombiano' });
  }

  remove(id: number): void {
    this.news.deleteArticle(id);
    this.message.set('Noticia eliminada correctamente.');
  }
}
