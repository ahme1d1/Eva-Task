import { LocalStorageService } from './../services/local-storage.service';
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";


@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.localStorageService.getLocalStorage('token')
    if (token) {
      return true;
    } else {
      console.log("no Value")
      this.router.navigate(['/login'])
      return false;
    }
  }
}
