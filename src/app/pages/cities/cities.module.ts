import { sharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCityComponent } from './components/add-city/add-city.component';
import { UpdateCityComponent } from './components/update-city/update-city.component';
import { CitiesListComponent } from './components/cities-list/cities-list.component';
import { CitiesRoutingModule } from './cities-routing.module';
import { DeleteCityComponent } from './components/delete-city/delete-city.component';
import { CountryCitiesComponent } from './components/country-cities/country-cities.component';

@NgModule({
  imports: [
    CommonModule,
    CitiesRoutingModule,
    sharedModule
  ],
  declarations: [
    AddCityComponent,
    UpdateCityComponent,
    CitiesListComponent,
    DeleteCityComponent,
    CountryCitiesComponent
  ]
})
export class CitiesModule { }
