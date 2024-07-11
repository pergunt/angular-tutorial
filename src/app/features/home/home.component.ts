import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {HousingLocationComponent} from './components'
import {HousingService} from 'services/housing.service'
import {HousingLocation} from 'types'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    HousingLocationComponent
  ],
  template: `
    <section>
      <form>
        <input
          type="text"
          placeholder="Filter by city"
          class="border py-2 px-4 rounded-md mr-2 w-1/3"
        />
        <button
          class="py-2 px-4 border bg-blue-600 hover:bg-blue-500 transition-colors text-white rounded-md"
          type="button">Search
        </button>
      </form>
      <section class="grid grid-cols-5 gap-x-8 gap-y-4 mt-5 justify-center">
        <housing-location
          *ngFor="let housingLocation of housingLocationList"
          [housingLocation]="housingLocation"
        ></housing-location>
      </section>
    </section>
  `,
})
export class HomeComponent {
  title: string = 'angular-tutorial';
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }
}
