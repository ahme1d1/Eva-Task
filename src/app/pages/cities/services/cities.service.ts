import { City } from './../models/city';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  public getCities() {
    return this.http.get<City[]>(`${this.apiUrl}/city`);
  }

  public getCityById(id: string) {
    return this.http.get<City>(`${this.apiUrl}/city/${id}`)
  }

  public getCitiesByCountryId(countryId: string) {
    return this.http.get<City[]>(`${this.apiUrl}/city/getcities/${countryId}`)
  }

  public addCity(Name: string, CountryId: string) {
    return this.http.post<City>(`${this.apiUrl}/city`, { Name, CountryId })
  }

  public updateCity(Id: string, Name: string, CountryId: string) {
    return this.http.put<City>(`${this.apiUrl}/city`, {Id, Name, CountryId})
  }

  public deleteCity(id: string) {
    return this.http.delete<City>(`${this.apiUrl}/city/${id}`)
  }
}
