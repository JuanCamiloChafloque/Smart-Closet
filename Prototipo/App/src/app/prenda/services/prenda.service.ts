import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrendaService {

  /*query = '';
  apiKey = '15968628-d43517fd4e9b9f5ed84440a5e';
  apiUrl = 'https://pixabay.com/api/?key=';
  queryUrl = this.apiUrl + this.apiKey + '&q=';
  perPage = '&per_page=5';*/

  constructor(private http: HttpClient) { }

  getImages(query) {
    //return this.http.get(this.queryUrl + query + this.perPage);
    return this.http.get('https://customsearch.googleapis.com/customsearch/v1?key=' + environment.imageSearch.apiKey
                          + '&cx=' + environment.imageSearch.idEngine + '&q=' + query
                          + '&searchType=image');
  }
}
