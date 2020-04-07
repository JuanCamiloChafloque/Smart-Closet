import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  url = 'https://api.openweathermap.org/data/2.5/weather';
  apiKey = 'd94c7bc93d867aa2132c3efcf9fcc73e';

  constructor(private http: HttpClient) { }

  getClimaByCoord(lat, lon) {
    const params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('units', 'metric')
    .set('appid', this.apiKey);

    return this.http.get(this.url, {params});
  }

  getClimaByName(ciudad: string) {
    const params = new HttpParams()
    .set('q', ciudad)
    .set('units', 'metric')
    .set('appid', this.apiKey);

    return this.http.get(this.url, {params});

  }
}
