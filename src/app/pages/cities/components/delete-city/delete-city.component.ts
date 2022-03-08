import { CitiesListComponent } from './../cities-list/cities-list.component';
import { CitiesService } from './../../services/cities.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-delete-city',
  templateUrl: './delete-city.component.html',
  styleUrls: ['./delete-city.component.scss'],
})
export class DeleteCityComponent implements OnInit {
  submitLoading!: boolean;
  cityId!: string;

  constructor(
    private citiesService: CitiesService,
    public dialogRef: MatDialogRef<CitiesListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.cityId = this.data.cityId;
  }

  deleteCity() {
    this.submitLoading = true;
    this.citiesService.deleteCity(this.cityId).subscribe({
      next: (res) => {
        this.submitLoading = false;
        this.dialogRef.close(res);
        this.notify.success('City deleted successfully');
      },
      error: () => {
        this.submitLoading = false;
      },
    });
  }
}
