import { Component, Input } from '@angular/core';
import {RouterOutlet, RouterLink} from '@angular/router'
import {HousingLocation} from 'types'

@Component({
  selector: 'housing-location',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  template: `
    <section class="bg-purple-200 rounded-md overflow-hidden">
      <img
        class="h-[250px] w-full "
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
        crossorigin
      />
      <div class="py-2 px-4">
        <h2 class="text-purple-600 font-bold">
          {{ housingLocation.name }}
        </h2>
        <p class="before:content-[url(/assets/location-pin.svg)]">
          {{ housingLocation.city }}, {{ housingLocation.state }}
        </p>
      </div>
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
    </section>
  `
})

export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
