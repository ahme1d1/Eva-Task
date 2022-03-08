import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  public isLogged$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpClient,
    private localStorageService: LocalStorageService
    ) { }

  public login(Email: string, Password: string) {
    return this.http.post(`${this.apiUrl}/user/login`, {Email, Password})
    .pipe(
      map((res: any) => res.token),
      tap((token) => {
        this.localStorageService.setLocalStorage('token', token);
        this.isLogged$.next(true);
      }))
  }

  public logout(): Observable<boolean> {
    this.localStorageService.deleteLocalStorage('token');
    this.router.navigateByUrl('/login');
    this.isLogged$.next(false);
    return of(true);
  }
}
