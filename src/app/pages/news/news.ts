import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../../core/news.service';
import { NewsCard } from '../../shared/news-card/news-card';

@Component({
  selector: 'app-news',
  imports: [FormsModule, NewsCard],
  template: `
    <section class="page-space container">
      <p class="eyebrow">Actualidad deportiva</p>
      <h1 class="page-title">Últimas noticias</h1>
      <p class="lead">Toda la actualidad del fútbol en un solo lugar.</p>
      <div class="news-toolbar">
        <label class="search"
          ><span class="sr-only">Buscar noticias</span
          ><input
            type="search"
            placeholder="Buscar noticias..."
            [ngModel]="query()"
            (ngModelChange)="query.set($event)"
        /></label>
        <div class="filters" aria-label="Filtrar por categoría">
          <button
            class="filter"
            [class.active]="category() === 'Todas'"
            (click)="category.set('Todas')"
          >
            Todas
          </button>
          @for (item of news.categories(); track item) {
            <button
              class="filter"
              [class.active]="category() === item"
              (click)="category.set(item)"
            >
              {{ item }}
            </button>
          }
        </div>
      </div>
      <p class="result-count">
        {{ filtered().length }}
        {{ filtered().length === 1 ? 'noticia encontrada' : 'noticias encontradas' }}
      </p>
      @if (news.loading()) {
        <p class="empty-state">Cargando noticias...</p>
      } @else if (!filtered().length) {
        <p class="empty-state">No encontramos noticias con esos criterios.</p>
      } @else {
        <div class="cards cards--three">
          @for (item of filtered(); track item.id) {
            <app-news-card [item]="item" />
          }
        </div>
      }
    </section>
  `,
})
export class News {
  readonly news = inject(NewsService);
  readonly query = signal('');
  readonly category = signal('Todas');
  readonly filtered = computed(() => {
    const term = this.query().trim().toLowerCase();
    return this.news
      .all()
      .filter(
        (item) =>
          (this.category() === 'Todas' || item.category === this.category()) &&
          `${item.title} ${item.description}`.toLowerCase().includes(term),
      );
  });
}
