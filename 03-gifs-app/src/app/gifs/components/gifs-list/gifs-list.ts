import { Component, input } from '@angular/core';
import { GifsListItem } from './gifs-list-item/gifs-list-item';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifsListItem],
  templateUrl: './gifs-list.html',
})
export class GifListComponent {
  gifs = input.required<Gif[]>();
}
