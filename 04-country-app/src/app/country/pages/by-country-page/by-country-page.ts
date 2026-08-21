import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountryList } from "../../component/country-list/country-list";
import { SearchInput } from "../../component/search-input/search-input";

@Component({
  selector: 'app-by-country-page',
  imports: [CountryList, SearchInput],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {}
