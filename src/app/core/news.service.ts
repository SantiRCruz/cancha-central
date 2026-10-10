import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { NewArticle, NewsItem } from './news-item';

const STORAGE = {
  favorites: 'canchaCentralFavorites',
  news: 'canchaCentralNews',
};

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly http = inject(HttpClient);
  private readonly baseNews = signal<NewsItem[]>([]);
  private readonly customNews = signal<NewsItem[]>(this.readStorage(STORAGE.news, []));

  readonly loading = signal(true);
  readonly error = signal(false);
  readonly favoriteIds = signal<number[]>(this.readStorage(STORAGE.favorites, []));
  readonly all = computed(() => [...this.customNews(), ...this.baseNews()]);
  readonly categories = computed(() => [...new Set(this.all().map((item) => item.category))]);

  constructor() {
    // El catálogo base se obtiene del JSON local solicitado en el proyecto.
    this.http.get<NewsItem[]>('data/noticias.json').subscribe({
      next: (items) => {
        this.baseNews.set(items);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds().includes(id);
  }

  toggleFavorite(id: number): void {
    const current = this.favoriteIds();
    const updated = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    this.favoriteIds.set(updated);
    this.writeStorage(STORAGE.favorites, updated);
  }

  addArticle(article: NewArticle): void {
    // Las noticias creadas se conservan en el navegador sin requerir un backend.
    const item: NewsItem = {
      ...article,
      id: Date.now(),
      date: new Intl.DateTimeFormat('es-CO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date()),
      author: 'Equipo editorial',
      image: 'assets/futbol-opinion.jpg',
    };
    const updated = [item, ...this.customNews()];
    this.customNews.set(updated);
    this.writeStorage(STORAGE.news, updated);
  }

  deleteArticle(id: number): void {
    const updated = this.customNews().filter((item) => item.id !== id);
    this.customNews.set(updated);
    this.writeStorage(STORAGE.news, updated);
    if (this.isFavorite(id)) this.toggleFavorite(id);
  }

  readonly created = this.customNews.asReadonly();

  private readStorage<T>(key: string, fallback: T): T {
    // Un valor dañado en localStorage no debe impedir que la aplicación inicie.
    try {
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  private writeStorage(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
