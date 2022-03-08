import { CountryCitiesComponent } from './components/country-cities/country-cities.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesListComponent } from './components/cities-list/cities-list.component';

const routes: Routes = [
  {
    path: '',
    component: CitiesListComponent,
  },
  {
    path: ':id',
    component: CountryCitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
