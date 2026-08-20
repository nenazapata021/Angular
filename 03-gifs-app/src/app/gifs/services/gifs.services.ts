import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { finalize, map, tap } from 'rxjs';

const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'; // Record<string, gifs[]>

  try {
    const gifs = JSON.parse(gifsFromLocalStorage);
    return gifs && typeof gifs === 'object' && !Array.isArray(gifs) ? gifs : {};
  } catch {
    return {};
  }
};

// {
//   'goku': [gif1, gif2, gif3],
//   'saitama': [gif1, gif2, gif3],
//   'dragon ball': [gif1, gif2, gif3],
// }

// Record<string, Gif[]>

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  TrendingGidsLoanding = signal(true);
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifstOlOCALsTORAGE = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  })

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
        },
      })
      .pipe(finalize(() => this.TrendingGidsLoanding.set(false)))
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.set(gifs);
      });
  }

  searchGifs(query: string) {
    const normalizedQuery = query.trim().toLowerCase();

    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          q: normalizedQuery,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
        // TODO: Historial
        tap(items => {
          this.searchHistory.update(history => ({
            ...history,
            [normalizedQuery]: items,
          }));
        })
      );
      // .subscribe((resp) => {
      //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      //   console.log({ search: gifs });
      // });
  }
  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query.trim().toLowerCase()] ?? [];
  }
}
