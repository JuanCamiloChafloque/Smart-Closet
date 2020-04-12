import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Prenda } from './prenda';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrendaService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError('An error has occurred');
  }

  private get<T>(url): Observable<T> {
    console.log('get:', url);
    return this.http
      .get<T>(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  private put<T>(url, data: T): Observable<T> {
    console.log('put:', url);
    return this.http.put<T>(url, data).pipe(
      catchError(this.handleError)
    );
  }

  getImages(query) {
    return this.http.get('https://customsearch.googleapis.com/customsearch/v1?key=' + environment.imageSearch.apiKey
                          + '&cx=' + environment.imageSearch.idEngine + '&q=' + query
                          + '&searchType=image');
  }

  create(prenda: Prenda, nickname: string) {
    const url = `http://localhost:8080/agregarPrenda/${nickname}`;
    return this.put(url, {
      seccion: prenda.seccion,
      tipo: prenda.tipo,
      nivelFormalidad: +prenda.nivelFormalidad,
      nivelAbrigo: +prenda.nivelAbrigo,
      color: prenda.color,
      favorito: prenda.favorito,
      disponible: prenda.disponible,
      descripcion: prenda.descripcion,
      imgUrl: prenda.imgUrl
    });
  }

  getPrendasSuperiores(nickname: string) {
    const url = `http://localhost:8080/armario/${nickname}/prendas/superior`;
    return this.get<Prenda[]>(url);
  }

  getPrendasInferiores(nickname: string) {
    const url = `http://localhost:8080/armario/${nickname}/prendas/inferior`;
    return this.get<Prenda[]>(url);
  }

  getPrendasZapatos(nickname: string) {
    const url = `http://localhost:8080/armario/${nickname}/prendas/zapatos`;
    return this.get<Prenda[]>(url);
  }

  getPrendasAccesorios(nickname: string) {
    const url = `http://localhost:8080/armario/${nickname}/prendas/accesorios`;
    return this.get<Prenda[]>(url);
  }

  getPrendasFavoritas(nickname: string) {
    const url = `http://localhost:8080/armario/${nickname}/prendas/favoritos`;
    return this.get<Prenda[]>(url);
  }
}
