import { NotificationService } from './../../../../shared/services/notification.service';
import { Country } from './../../../countries/models/country';
import { CountriesService } from './../../../countries/services/countries.service';
import { CitiesListComponent } from './../cities-list/cities-list.component';
import { CitiesService } from './../../services/cities.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
})
export class AddCityComponent implements OnInit {
  submitLoading!: boolean;
  addCityForm!: FormGroup;
  countries: Country[] = [];
  filteredCountries!: Observable<Country[]>;
  countryId!: string;

  constructor(
    private citiesService: CitiesService,
    private countriesService: CountriesService,
    public dialogRef: MatDialogRef<CitiesListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.initAddCityForm();
    if (this.data) {
      this.countryId = this.data.countryId;
      this.addCityForm.get('country')?.clearValidators();
    }
    this.loadCountries();
    this.filteredCountries = this.addCityForm.controls[
      'country'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.countries.slice()))
    );
  }

  loadCountries() {
    this.countriesService.getCountries().subscribe((res) => {
      this.countries = res;
    });
  }

  private initAddCityForm(): void {
    this.addCityForm = new FormGroup({
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });
  }

  private _filter(name: string): Country[] {
    const filterValue = name.toLowerCase();

    return this.countries.filter((country) =>
      country.name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(item: Country): string {
    return item ? `${item.name}` : '';
  }

  public get name() {
    return this.addCityForm.get('name');
  }

  public get country() {
    return this.addCityForm.get('country');
  }

  addCity() {
    this.addCityForm.markAllAsTouched();
    if (this.addCityForm.valid) {
      this.submitLoading = true;
      const { name, country } = this.addCityForm.value;
      const countryId = this.countryId ? +this.countryId : country.id;
      this.citiesService.addCity(name, countryId).subscribe({
        next: (res) => {
          this.submitLoading = false;
          this.dialogRef.close(res);
          this.notify.success('City added successfully');
        },
        error: () => {
          this.submitLoading = false;
        },
      });
    }
  }
}
