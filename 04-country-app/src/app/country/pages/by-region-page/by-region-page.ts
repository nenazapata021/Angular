import { Component } from '@angular/core';
import { CountryList } from "../../component/country-list/country-list";

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {}
