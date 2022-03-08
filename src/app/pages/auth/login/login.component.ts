import { NotificationService } from './../../../shared/services/notification.service';
import { AuthService } from './../../../core/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitLoading!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: NotificationService
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  submit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.submitLoading = true;
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.notify.success('Welcome, You are logined successfully');
        },
        error: (err) => {
          this.notify.error(err)
          this.submitLoading = false;
        },
      });
    }
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

}
