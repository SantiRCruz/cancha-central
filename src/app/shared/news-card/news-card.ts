import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsItem } from '../../core/news-item';

@Component({
  selector: 'app-news-card',
  imports: [RouterLink],
  template: `
    <article class="card">
      <img [src]="item().image" [alt]="'Imagen de ' + item().title" loading="lazy" />
      <div class="card__body">
        <span class="tag">{{ item().category }}</span>
        <h3>{{ item().title }}</h3>
        <p>{{ item().description }}</p>
        <a class="text-link" [routerLink]="['/noticias', item().id]">Ver más →</a>
      </div>
    </article>
  `,
})
export class NewsCard {
  readonly item = input.required<NewsItem>();
}
