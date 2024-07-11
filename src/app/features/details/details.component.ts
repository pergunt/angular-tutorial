import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HousingService} from 'services/housing.service'
import {HousingLocation} from 'types'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <article
      class="rounded-md overflow-hidden flex justify-between"
    >
      <div class="py-2 px-4 flex justify-between grow">
        <section class="w-[300px] mt-4 p-4 rounded-md border border-purple-500">
          <h2 class="text-lg mb-2">Apply now to live here</h2>
          <form
            [formGroup]="applyForm"
            (submit)="submitApplication()"
            class="flex flex-col gap-4"
          >
            <label class="text-purple-500" for="first-name">First Name</label>
            <input placeholder="type here" class="focus:shadow-lg focus:shadow-purple-300 rounded-md transition-all outline-none p-2 border-b" id="first-name" type="text" formControlName="firstName" />
            <label class="text-purple-500" for="last-name">Last Name</label>
            <input placeholder="type here" class="focus:shadow-lg focus:shadow-purple-300 rounded-md transition-all outline-none p-2 border-b" id="last-name" type="text" formControlName="lastName" />
            <label class="text-purple-500" for="email">Email</label>
            <input placeholder="type here" class="focus:shadow-lg focus:shadow-purple-300 rounded-md transition-all outline-none p-2 border-b" id="email" type="email" formControlName="email" />
            <button class="bg-purple-500 hover:bg-purple-400 py-2 rounded-md text-white" type="submit">Apply now</button>
          </form>
        </section>
      </div>
      <div>
        <img
          class="h-[250px] w-[500px]"
          [src]="housingLocation?.photo"
          alt="Exterior photo of {{ housingLocation?.name }}"
          crossorigin
        />
        <h2 class="text-purple-600 font-bold">
          {{ housingLocation?.name }}
        </h2>
        <p class="before:content-[url(/assets/location-pin.svg)]">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
        <section class="">
          <h2 class="text-purple-500 text-lg mb-2">About this housing location</h2>
          <ul class="text-sm">
            <li>Units available: {{ housingLocation?.availableUnits }}</li>
            <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
            <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
          </ul>
        </section>
      </div>
    </article>
  `,
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  submitApplication() {
    const {value} = this.applyForm

    this.housingService.submitApplication({
      firstName: value.firstName || '',
      lastName: value.lastName || '',
      email: value.email || '',
    });
  }
}
