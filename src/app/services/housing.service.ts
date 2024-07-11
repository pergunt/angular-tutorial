import { Injectable } from '@angular/core';
import {HousingLocation} from "types";

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor() { }
  url = 'http://localhost:3000/locations';

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return (await data.json()) || [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) || {};
  }

  submitApplication(args: {firstName: string, lastName: string, email: string}) {
    console.log(
      `Homes application received: firstName: ${args.firstName}, lastName: ${args.lastName}, email: ${args.email}.`,
    );
  }
}
