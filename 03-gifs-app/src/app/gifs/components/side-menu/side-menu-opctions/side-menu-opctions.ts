import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifService } from '../../../services/gifs.services';

interface MenuOpction {
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'gifs-side-menu-opctions',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-opctions.html',
})
export class SideMenuOpctions {
  GifService = inject(GifService)
  menuOpctions:MenuOpction[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar gifs',
      route: '/dashboard/search',
    },
  ];
Key: any;
key: any|string;
}
