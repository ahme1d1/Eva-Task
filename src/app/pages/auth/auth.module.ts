import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from 'src/app/core/material/material.module';
import { sharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    sharedModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
