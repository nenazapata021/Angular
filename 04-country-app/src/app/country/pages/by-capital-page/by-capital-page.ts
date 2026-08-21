import { Component } from '@angular/core';
import { SearchInput } from "../../component/search-input/search-input";
import { CountryList } from "../../component/country-list/country-list";

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  onSearch(value: string) {
    console.log({ value });
  }
}
