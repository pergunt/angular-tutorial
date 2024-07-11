import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import {HousingLocationComponent} from './components'
import {HousingService} from 'services/housing.service'
import {HousingLocation} from 'types'

export interface SearchFormElements extends HTMLFormControlsCollection {
  search: HTMLInputElement;
}

export interface SearchForm extends HTMLFormElement {
  elements: SearchFormElements;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    CommonModule,
    HousingLocationComponent
  ],
  template: `
    <section>
      <form
        class="flex justify-center"
        (ngSubmit)="filterResults($event)"
      >
        <input
          type="text"
          name="search"
          placeholder="Filter by city"
          class="border py-2 px-4 rounded-md mr-2 w-1/3"
        />
        <button
          class="py-2 px-4 border bg-blue-600 hover:bg-blue-500 transition-colors text-white rounded-md"
        >
          Search
        </button>
      </form>
      <section class="grid grid-cols-5 gap-x-8 gap-y-4 px-4 mt-5 justify-center">
        <housing-location
          *ngFor="let housingLocation of filteredLocationList"
          [housingLocation]="housingLocation"
        ></housing-location>
      </section>
    </section>
  `,
})
export class HomeComponent {
  title: string = 'angular-tutorial';
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      console.log(housingLocationList)
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(event: Event) {
    event.preventDefault()

    const form = event.currentTarget as SearchForm
    const search = form.elements.search.value

    if (!search) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation.city.toLowerCase().includes(search.toLowerCase()),
    );
  }
}
