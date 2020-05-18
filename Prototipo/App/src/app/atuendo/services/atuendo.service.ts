import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Atuendo } from './atuendo';
import { Prenda } from 'src/app/prenda/services/prenda';

@Injectable({
  providedIn: 'root'
})
export class AtuendoService {


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

  getAtuendoById(id: number) {
    const url = `http://localhost:8080/findAtuendo/${id}`;
    return this.get<Atuendo>(url);
  }

  getAtuendos(nickname: string) {
    const url = `http://localhost:8080/armario/${nickname}/atuendos`;
    return this.get<Atuendo[]>(url);
  }

  getAtuendosFavoritos(nickname: string) {
    const url = `http://localhost:8080/armario/${nickname}/atuendos/favoritos`;
    return this.get<Atuendo[]>(url);
  }

  getPrendasAtuendo(nickname: string, id: number){
    const url = `http://localhost:8080/armario/${nickname}/${id}/prendas`;
    return this.get<Prenda[]>(url);
  }

  agregarPrendaAtuendo(nickname: string, idA: number, idP: number, prenda: Prenda) {
    const url = `http://localhost:8080/agregarAtuendo/${nickname}/${idA}/${idP}`;
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

  createAtuendo(nickname: string, atuendo: Atuendo) {
    const url = `http://localhost:8080/crearAtuendo/${nickname}`;
    return this.put(url, {
      favorito: atuendo.favorito
    });
  }

  editarFavorito(id: number) {
    const url = `http://localhost:8080/modificarAtuendoFavorito/${id}`;
    return this.put(url, {
      favorito: false
    });
  }

  ponerAtuendo(nickname: string, id: number, poner: string) {
    const url = `http://localhost:8080/crearFecha/${nickname}/${id}/${poner}`;
    return this.put(url, {poner});
  }

  ultimaVez(id: number) {
    const url = `http://localhost:8080/ultimaVez/${id}`;
    return this.get<Date>(url);
  }

  cantidadVeces(id: number) {
    const url = `http://localhost:8080/cantidadVeces/${id}`;
    return this.get<number>(url);
  }

  atuendoFecha(fecha: string) {
    const url = `http://localhost:8080/atuendoFecha/${fecha}`;
    return this.get<Atuendo>(url);
  }

}
