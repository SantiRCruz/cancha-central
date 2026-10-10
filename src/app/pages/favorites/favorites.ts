import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../core/news.service';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink],
  template: `
    <section class="page-space container">
      <div class="title-row">
        <div>
          <p class="eyebrow">Tu selección</p>
          <h1 class="page-title">Noticias favoritas</h1>
        </div>
        <span class="count-badge">{{ items().length }} guardadas</span>
      </div>
      @if (items().length) {
        <div class="favorite-list">
          @for (item of items(); track item.id) {
            <article class="favorite-item">
              <img [src]="item.image" [alt]="'Imagen de ' + item.title" />
              <div>
                <span class="tag">{{ item.category }}</span>
                <h2>{{ item.title }}</h2>
                <p>{{ item.date }}</p>
                <a class="text-link" [routerLink]="['/noticias', item.id]">Leer artículo →</a>
              </div>
              <button
                class="heart-button"
                aria-label="Quitar de favoritos"
                (click)="news.toggleFavorite(item.id)"
              >
                ♥
              </button>
            </article>
          }
        </div>
      } @else {
        <div class="empty-state">
          <h2>Aún no tienes favoritos</h2>
          <p>Explora las noticias y usa el corazón para guardarlas.</p>
          <a class="button" routerLink="/noticias">Explorar noticias</a>
        </div>
      }
      <p class="storage-note">Tus favoritos se guardan en este navegador mediante localStorage.</p>
    </section>
  `,
})
export class Favorites {
  readonly news = inject(NewsService);
  readonly items = computed(() =>
    this.news.all().filter((item) => this.news.favoriteIds().includes(item.id)),
  );
}
