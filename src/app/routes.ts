import { Routes } from '@angular/router';
import {
  DetailsComponent,
  HomeComponent
} from 'features'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details',
  },
];
