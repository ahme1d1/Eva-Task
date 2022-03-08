import { environment } from './../../../../environments/environment.prod';
import { Country } from './../models/country';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  public getCountries() {
    return this.http.get<Country[]>(`${this.apiUrl}/country`)
  }

  public getCountryById(id: string) {
    return this.http.get<Country>(`${this.apiUrl}/country/${id}`)
  }

  public addCountry(Name: string) {
    return this.http.post<Country>(`${this.apiUrl}/country`, {Name})
  }

  public updateCountry(Id: string, Name: string) {
    return this.http.put<Country>(`${this.apiUrl}/country`, {Id, Name})
  }

  public deleteCountry(id: string) {
    return this.http.delete<Country>(`${this.apiUrl}/country/${id}`)
  }
}
