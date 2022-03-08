import { CitiesListComponent } from './../cities-list/cities-list.component';
import { CitiesService } from './../../services/cities.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Country } from 'src/app/pages/countries/models/country';
import { CountriesService } from 'src/app/pages/countries/services/countries.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-update-city',
  templateUrl: './update-city.component.html',
  styleUrls: ['./update-city.component.scss'],
})
export class UpdateCityComponent implements OnInit {
  submitLoading!: boolean;
  updateCityForm!: FormGroup;
  cityId!: string;
  countries: Country[] = [];
  filteredCountries!: Observable<Country[]>;
  countryId!: string;

  constructor(
    private citiesService: CitiesService,
    public dialogRef: MatDialogRef<CitiesListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private countriesService: CountriesService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.initUpdateCityForm();
    if (this.data) {
      this.cityId = this.data.cityId;
      this.loadCity(this.cityId);
      this.countryId = this.data.countryId;
      this.updateCityForm.get('country')?.clearValidators();
    }
    this.loadCountries();
    this.filteredCountries = this.updateCityForm.controls[
      'country'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.countries.slice()))
    );
  }

  private loadCity(id: string) {
    this.citiesService.getCityById(id).subscribe((res) => {
      const { name, countryId } = res;
      this.loadCountry(countryId);
      this.updateCityForm.patchValue({ name });
    });
  }

  loadCountries() {
    this.countriesService.getCountries().subscribe((res) => {
      this.countries = res;
    });
  }

  loadCountry(id: string) {
    this.countriesService.getCountryById(id).subscribe((res) => {
      const country = res;
      this.updateCityForm.patchValue({ country });
    });
  }

  private initUpdateCityForm(): void {
    this.updateCityForm = new FormGroup({
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });
  }

  displayFn(item: Country): string {
    return item ? `${item.name}` : '';
  }

  private _filter(name: string): Country[] {
    const filterValue = name.toLowerCase();

    return this.countries.filter((country) =>
      country.name.toLowerCase().includes(filterValue)
    );
  }

  public get name() {
    return this.updateCityForm.get('name');
  }

  public get country() {
    return this.updateCityForm.get('country');
  }

  updateCity(): void {
    this.updateCityForm.markAllAsTouched();
    if (this.updateCityForm.valid) {
      this.submitLoading = true;
      const { name, country } = this.updateCityForm.value;
      const countryId = this.countryId ? +this.countryId : country.id;
      this.citiesService.updateCity(this.cityId, name, countryId).subscribe({
        next: (res) => {
          this.submitLoading = false;
          this.dialogRef.close(res);
          this.notify.success('City updated successfully');
        },
        error: () => {
          this.submitLoading = false;
        },
      });
    }
  }
}
