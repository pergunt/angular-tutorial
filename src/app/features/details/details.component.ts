import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from 'services/housing.service'
import {HousingLocation} from 'types'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,

  ],
  template: `
    <section
      class="rounded-md overflow-hidden flex justify-between"
    >
      <div class="py-2 px-4">
        <div class="">
          <h2 class="text-purple-600 font-bold">
            {{ housingLocation?.name }}
          </h2>
          <p class="before:content-[url(/assets/location-pin.svg)]">
            {{ housingLocation?.city }}, {{ housingLocation?.state }}
          </p>
        </div>
        <section class="">
          <h2 class="text-purple-500 text-lg mb-2">About this housing location</h2>
          <ul class="text-sm">
            <li>Units available: {{ housingLocation?.availableUnits }}</li>
            <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
            <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
          </ul>
        </section>
      </div>
      <img
        class="h-[250px] w-[500px]"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin
      />
    </section>
  `,
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }
}
