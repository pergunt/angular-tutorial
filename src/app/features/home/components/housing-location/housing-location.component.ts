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
    <section class="bg-purple-200 max-w-[400px] rounded-lg overflow-hidden">
      <img
        class="h-[250px] w-full"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
        crossorigin
      />
      <div class="py-2 px-4">
        <h2 class="text-purple-600 font-bold">
          {{ housingLocation.name }}
        </h2>
        <p class="mb-2 before:content-[url(/assets/location-pin.svg)]">
          {{ housingLocation.city }}, {{ housingLocation.state }}
        </p>
        <a
          [routerLink]="['/details', housingLocation.id]"
          class="text-white bg-purple-500 hover:bg-purple-400 transition-colors py-2 px-4 inline-block rounded-md"
        >
          Learn More
        </a>
      </div>
    </section>
  `
})

export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
