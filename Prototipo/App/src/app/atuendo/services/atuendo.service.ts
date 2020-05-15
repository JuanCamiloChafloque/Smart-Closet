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

  getAtuendos(nickname: string) {
    const url = `http://localhost:8080/armario/${nickname}/atuendos`;
    return this.get<Atuendo[]>(url);
  }

  getPrendasAtuendo(nickname: string, id: number){
    const url = `http://localhost:8080/armario/${nickname}/${id}/prendas`;
    return this.get<Prenda[]>(url);
  }

}
