import { NotificationService } from './../../../../shared/services/notification.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountriesService } from '../../services/countries.service';
import { CountriesListComponent } from '../countries-list/countries-list.component';

@Component({
  selector: 'app-update-country',
  templateUrl: './update-country.component.html',
  styleUrls: ['./update-country.component.scss']
})
export class UpdateCountryComponent implements OnInit {
  submitLoading!: boolean;
  updateCountryForm!: FormGroup;
  countryId!: string;

  constructor(
    private countriesService: CountriesService,
    public dialogRef: MatDialogRef<CountriesListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notify: NotificationService
  ) { }

  ngOnInit(): void {
    this.countryId = this.data.countryId;
    this.loadCountry(this.countryId);
    this.initUpdateCountryForm();
  }

  private loadCountry(id: string) {
    this.countriesService.getCountryById(id).subscribe((res) => {
      const { name } = res;
      this.updateCountryForm.patchValue({name})
    })
  }

  private initUpdateCountryForm(): void {
    this.updateCountryForm = new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }

  public get name() {
    return this.updateCountryForm.get('name')
  }

  updateCountry(): void {
    this.updateCountryForm.markAllAsTouched();
    if (this.updateCountryForm.valid) {
      this.submitLoading = true;
      const { name } = this.updateCountryForm.value;
      this.countriesService.updateCountry(this.countryId, name)
      .subscribe({
        next: (res) => {
          this.submitLoading = false;
          this.dialogRef.close(res);
          this.notify.success('Country updated successfully');
        },
        error: () => {
          this.submitLoading = false;
        }
      })
    }
  }

}
