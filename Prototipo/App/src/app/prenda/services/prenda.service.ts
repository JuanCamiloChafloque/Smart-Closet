import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Prenda } from './prenda';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Superior } from './superior';
import { Inferior } from './inferior';
import { Zapato } from './zapato';
import { Accesorio } from './accesorio';
import { Vestido } from './vestido';

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

  private delete<T>(url): Observable<T> {
    console.log('delete:', url);
    return this.http.delete<T>(url).pipe(
      catchError(this.handleError)
    );
  }

  getImages(query) {
    return this.http.get('https://customsearch.googleapis.com/customsearch/v1?key=' + environment.imageSearch.apiKey
                          + '&cx=' + environment.imageSearch.idEngine + '&q=' + query
                          + '&searchType=image');
  }

  createSuperior(prenda: Superior, nickname: string) {
    const url = `http://localhost:8080/agregarSuperior/${nickname}`;
    return this.put(url, {
      seccion: prenda.seccion,
      tipo: prenda.tipo,
      formalidad: +prenda.formalidad,
      abrigo: +prenda.abrigo,
      color: prenda.color,
      favorito: prenda.favorito,
      disponible: prenda.disponible,
      descripcion: prenda.descripcion,
      cuello: prenda.cuello,
      manga: prenda.manga,
      url: prenda.url
    });
  }

  createInferior(prenda: Inferior, nickname: string) {
    const url = `http://localhost:8080/agregarInferior/${nickname}`;
    return this.put(url, {
      seccion: prenda.seccion,
      tipo: prenda.tipo,
      formalidad: +prenda.formalidad,
      abrigo: +prenda.abrigo,
      color: prenda.color,
      favorito: prenda.favorito,
      disponible: prenda.disponible,
      descripcion: prenda.descripcion,
      bota: prenda.bota,
      url: prenda.url
    });
  }

  createZapato(prenda: Zapato, nickname: string) {
    const url = `http://localhost:8080/agregarZapato/${nickname}`;
    return this.put(url, {
      seccion: prenda.seccion,
      tipo: prenda.tipo,
      formalidad: +prenda.formalidad,
      abrigo: +prenda.abrigo,
      color: prenda.color,
      favorito: prenda.favorito,
      disponible: prenda.disponible,
      descripcion: prenda.descripcion,
      forma: prenda.forma,
      url: prenda.url
    });
  }

  createAccesorio(prenda: Accesorio, nickname: string) {
    const url = `http://localhost:8080/agregarAccesorio/${nickname}`;
    return this.put(url, {
      seccion: prenda.seccion,
      tipo: prenda.tipo,
      formalidad: +prenda.formalidad,
      abrigo: +prenda.abrigo,
      color: prenda.color,
      favorito: prenda.favorito,
      disponible: prenda.disponible,
      descripcion: prenda.descripcion,
      url: prenda.url
    });
  }

  createVestido(prenda: Vestido, nickname: string) {
    const url = `http://localhost:8080/agregarVestido/${nickname}`;
    return this.put(url, {
      seccion: prenda.seccion,
      tipo: prenda.tipo,
      formalidad: +prenda.formalidad,
      abrigo: +prenda.abrigo,
      color: prenda.color,
      favorito: prenda.favorito,
      disponible: prenda.disponible,
      descripcion: prenda.descripcion,
      largo: prenda.largo,
      url: prenda.url
    });
  }

  getPrendas(nickname: string) {
    const url = `http://localhost:8080/armario/${nickname}/prendas`;
    return this.get<Prenda[]>(url);
  }

  getPrendasSuperiores(nickname: string) {
    const url = `http://localhost:8080/armario/${nickname}/prendas/superior`;
    return this.get<Superior[]>(url);
  }

  getPrendasInferiores(nickname: string) {
    const url = `http://localhost:8080/armario/${nickname}/prendas/inferior`;
    return this.get<Inferior[]>(url);
  }

  getPrendasZapatos(nickname: string) {
    const url = `http://localhost:8080/armario/${nickname}/prendas/zapatos`;
    return this.get<Zapato[]>(url);
  }

  getPrendasAccesorios(nickname: string) {
    const url = `http://localhost:8080/armario/${nickname}/prendas/accesorios`;
    return this.get<Accesorio[]>(url);
  }

  getPrendasVestidos(nickname: string) {
    const url = `http://localhost:8080/armario/${nickname}/prendas/vestidos`;
    return this.get<Vestido[]>(url);
  }

  getPrendasFavoritas(nickname: string) {
    const url = `http://localhost:8080/armario/${nickname}/prendas/favoritos`;
    return this.get<Prenda[]>(url);
  }

  editarFavorito(id: number) {
    const url = `http://localhost:8080/modificarFavorito/${id}`;
    return this.put(url, {
      seccion: '',
      tipo: '',
      formalidad: -1,
      abrigo: -1,
      color: '',
      favorito: '',
      disponible: '',
      descripcion: '',
      url: ''
    });
  }

  editarDisponible(id: number) {
    const url = `http://localhost:8080/modificarDisponible/${id}`;
    return this.put(url, {
      seccion: '',
      tipo: '',
      formalidad: -1,
      abrigo: -1,
      color: '',
      favorito: '',
      disponible: '',
      descripcion: '',
      url: ''
    });
  }

  eliminarPrenda(id: number) {
    const url = `http://localhost:8080/eliminarPrenda/${id}`;
    return this.delete<Prenda>(url);
  }
}
