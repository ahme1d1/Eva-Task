import { sharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { UpdateCountryComponent } from './components/update-country/update-country.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { DeleteCountryComponent } from './components/delete-country/delete-country.component';

@NgModule({
  imports: [
    CommonModule,
    CountriesRoutingModule,
    sharedModule
  ],
  declarations: [
    AddCountryComponent,
    UpdateCountryComponent,
    CountriesListComponent,
    DeleteCountryComponent
  ]
})
export class CountriesModule { }
