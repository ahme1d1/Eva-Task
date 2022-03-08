import { NotificationService } from './../../../../shared/services/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CountriesService } from '../../services/countries.service';
import { CountriesListComponent } from '../countries-list/countries-list.component';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {
  submitLoading!: boolean;
  addCountryForm!: FormGroup;

  constructor(
    private countriesService: CountriesService,
    public dialogRef: MatDialogRef<CountriesListComponent>,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.initAddCountryForm();
  }

  private initAddCountryForm(): void {
    this.addCountryForm = new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }

  public get name() {
    return this.addCountryForm.get('name')
  }

  addCountry() {
    this.addCountryForm.markAllAsTouched();
    if (this.addCountryForm.valid) {
      this.submitLoading = true;
      const { name } = this.addCountryForm.value;
      this.countriesService.addCountry(name)
      .subscribe({
        next: (res) => {
          this.submitLoading = false;
          this.dialogRef.close(res);
          this.notificationService.success("Country addes successfully")
        },
        error: () => {
          this.submitLoading = false;
          this.notificationService.error("Something went wrong")
        }
      })
    }
  }

}
