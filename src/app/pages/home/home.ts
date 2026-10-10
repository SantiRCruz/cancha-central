import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NewsService } from '../../core/news.service';
import { NewsCard } from '../../shared/news-card/news-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NewsCard],
  template: `
    <section class="hero">
      <div class="hero__content container">
        <p class="eyebrow">Edición especial · Octubre 2026</p>
        <h1>EL FÚTBOL SE VIVE<br /><span>EN CANCHA CENTRAL</span></h1>
        <p>Noticias, análisis y pasión por el fútbol colombiano e internacional.</p>
        <div class="hero__actions">
          <a class="button" routerLink="/noticias">Explorar noticias</a>
          <a class="button button--outline" routerLink="/contacto">Contactar</a>
        </div>
      </div>
    </section>

    <section class="section container">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Selección editorial</p>
          <h2>Noticias destacadas</h2>
        </div>
        <a class="text-link" routerLink="/noticias">Ver todas →</a>
      </div>
      @if (news.loading()) {
        <p class="empty-state">Cargando noticias...</p>
      } @else if (news.error()) {
        <p class="empty-state">No fue posible cargar las noticias.</p>
      } @else {
        <div class="cards cards--three">
          @for (item of featured(); track item.id) {
            <app-news-card [item]="item" />
          }
        </div>
      }
    </section>

    <section class="info-band">
      <div class="info-band__grid container">
        <div>
          <p class="eyebrow">La cancha habla</p>
          <h2>Información que se juega minuto a minuto</h2>
        </div>
        <p>
          Consulta análisis, guarda tus lecturas favoritas y participa con tus noticias y opiniones.
        </p>
        <a class="button button--light" routerLink="/favoritos">Ver favoritos</a>
      </div>
    </section>
  `,
})
export class Home {
  readonly news = inject(NewsService);
  readonly featured = computed(() => this.news.all().slice(0, 3));
}
