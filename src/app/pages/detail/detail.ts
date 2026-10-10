import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService } from '../../core/news.service';

@Component({
  selector: 'app-detail',
  imports: [RouterLink],
  template: `
    <section class="page-space container">
      @if (item(); as article) {
        <p class="breadcrumb">
          <a routerLink="/">Inicio</a> / <a routerLink="/noticias">Noticias</a> /
          {{ article.category }}
        </p>
        <div class="detail-grid">
          <article>
            <h1 class="detail-title">{{ article.title }}</h1>
            <p class="meta">Por {{ article.author }} · {{ article.date }} · 5 min de lectura</p>
            <img class="detail-image" [src]="article.image" [alt]="'Imagen de ' + article.title" />
            <p class="article-content">{{ article.content }}</p>
          </article>
          <aside class="detail-aside">
            <button
              class="favorite-button"
              [class.saved]="news.isFavorite(article.id)"
              (click)="news.toggleFavorite(article.id)"
            >
              {{ news.isFavorite(article.id) ? '♥ En favoritos' : '♡ Agregar a favoritos' }}
            </button>
            <a class="button contact-button" routerLink="/contacto">Contactar</a>
            <h2>El partido en cifras</h2>
            <ul>
              <li>62% de posesión</li>
              <li>14 remates</li>
              <li>7 tiros al arco</li>
            </ul>
          </aside>
        </div>
      } @else if (!news.loading()) {
        <div class="empty-state">
          <h1>Noticia no encontrada</h1>
          <a class="button" routerLink="/noticias">Volver a noticias</a>
        </div>
      }
    </section>
  `,
})
export class Detail {
  readonly news = inject(NewsService);
  private readonly id = signal(Number(inject(ActivatedRoute).snapshot.paramMap.get('id')));
  readonly item = computed(() => this.news.all().find((article) => article.id === this.id()));
}
