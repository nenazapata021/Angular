import { Component } from '@angular/core';
import { SideMenuHeader } from "./side-menu-header/side-menu-header";
import { SideMenuOpctions } from "./side-menu-opctions/side-menu-opctions";

@Component({
  selector: 'gifs-side-menu',
  imports: [SideMenuHeader, SideMenuOpctions],
  templateUrl: './side-menu.html',
})
export class SideMenu {}
