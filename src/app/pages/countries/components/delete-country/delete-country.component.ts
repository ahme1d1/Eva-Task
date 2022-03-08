import { CountriesService } from './../../services/countries.service';
import { CountriesListComponent } from './../countries-list/countries-list.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-delete-country',
  templateUrl: './delete-country.component.html',
  styleUrls: ['./delete-country.component.scss'],
})
export class DeleteCountryComponent implements OnInit {
  submitLoading!: boolean;
  countryId!: string;

  constructor(
    private countriesService: CountriesService,
    public dialogRef: MatDialogRef<CountriesListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.countryId = this.data.countryId;
  }

  deleteCountry() {
    this.submitLoading = true;
    this.countriesService.deleteCountry(this.countryId).subscribe({
      next: (res) => {
        this.submitLoading = false;
        this.dialogRef.close(res);
        this.notify.success('Country deleted successfully');
      },
      error: () => {
        this.submitLoading = false;
      },
    });
  }
}
