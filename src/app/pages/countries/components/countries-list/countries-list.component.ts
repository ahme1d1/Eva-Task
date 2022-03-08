import { CountriesService } from './../../services/countries.service';
import { Country } from './../../models/country';
import { AddCountryComponent } from './../add-country/add-country.component';
import { DeleteCountryComponent } from './../delete-country/delete-country.component';
import { UpdateCountryComponent } from './../update-country/update-country.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<Country>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  loading = false;
  disableRoute = false;

  constructor(
    public dialog: MatDialog,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.loading = true;
    this.countriesService.getCountries().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.loading = false;
      this.dataSource.paginator = this.paginator;
    });
  }

  addCountry() {
    const dialogRef = this.dialog.open(AddCountryComponent, {
      width: '500px',
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

  EditCountry(id: string) {
    const dialogRef = this.dialog.open(UpdateCountryComponent, {
      width: '500px',
      data: {
        countryId: id,
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

  deleteCountry(id: string) {
    const dialogRef = this.dialog.open(DeleteCountryComponent, {
      width: '500px',
      data: {
        countryId: id,
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
