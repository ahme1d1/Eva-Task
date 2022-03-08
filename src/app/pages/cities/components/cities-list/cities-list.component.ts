import { CitiesService } from './../../services/cities.service';
import { City } from './../../models/city';
import { DeleteCityComponent } from './../delete-city/delete-city.component';
import { UpdateCityComponent } from './../update-city/update-city.component';
import { AddCityComponent } from './../add-city/add-city.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.scss'],
})
export class CitiesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cityName', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<City>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  loading = false;

  constructor(public dialog: MatDialog, private citiesService: CitiesService) {}

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.loading = true;
    this.citiesService.getCities().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.loading = false;
      this.dataSource.paginator = this.paginator;
    });
  }

  addCity() {
    const dialogRef = this.dialog.open(AddCityComponent, {
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

  EditCity(id: string) {
    const dialogRef = this.dialog.open(UpdateCityComponent, {
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
