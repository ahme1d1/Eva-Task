import { Country } from 'src/app/pages/countries/models/country';
import { CountriesService } from './../../../countries/services/countries.service';
import { CitiesService } from './../../services/cities.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { City } from '../../models/city';
import { AddCityComponent } from '../add-city/add-city.component';
import { DeleteCityComponent } from '../delete-city/delete-city.component';
import { UpdateCityComponent } from '../update-city/update-city.component';

@Component({
  selector: 'app-country-cities',
  templateUrl: './country-cities.component.html',
  styleUrls: ['./country-cities.component.scss'],
})
export class CountryCitiesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cityName', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<City>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  countryId!: string;
  loading = false;
  country!: Country;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private citiesService: CitiesService,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.countryId = this.route.snapshot.params['id'];
    this.loadCountryCities();
    this.loadCountry();
  }

  loadCountryCities() {
    this.loading = true;
    this.citiesService.getCitiesByCountryId(this.countryId).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.loading = false;
      this.dataSource.paginator = this.paginator;
    });
  }

  loadCountry() {
    this.countriesService.getCountryById(this.countryId).subscribe((res) => {
      this.country = res;
    });
  }

  addCity() {
    const dialogRef = this.dialog.open(AddCityComponent, {
      width: '500px',
      data: {
        countryId: this.countryId,
      },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res != undefined && res) {
        const data = this.dataSource.data;
        data.push(res);
        this.dataSource.data = data;
      }
    });
  }

  EditCity(id: string) {
    const dialogRef = this.dialog.open(UpdateCityComponent, {
      width: '500px',
      data: {
        cityId: id,
        countryId: this.countryId,
      },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res != undefined && res) {
        const data = this.dataSource.data;
        data.forEach((item, index) => {
          if (item.id == res.id) {
            data[index] = res;
          }
        });
        this.dataSource.data = data;
      }
    });
  }

  deleteCity(id: string) {
    const dialogRef = this.dialog.open(DeleteCityComponent, {
      width: '500px',
      data: {
        cityId: id,
      },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res != undefined && res) {
        const data = this.dataSource.data;
        data.forEach((item, index) => {
          if (item.id == res.id) {
            data.splice(index, 1);
          }
        });
        this.dataSource.data = data;
      }
    });
  }
}
