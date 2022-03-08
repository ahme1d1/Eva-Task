import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material/material.module';



@NgModule({
  imports: [
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class sharedModule { }
