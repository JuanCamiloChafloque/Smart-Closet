import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/usuario/services/usuario';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError('An error has occurred');
  }

  private post<T>(url, data: T): Observable<T> {
    console.log('post:', url);
    return this.http
      .post<T>(url, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  create(user: Usuario) {
    const url = `http://localhost:8080/crearUsuario`;
    return this.post(url, {
      nombre: user.nombre,
      apellido: user.apellido,
      genero: user.genero,
      correo: user.correo,
      nickname: user.nickname,
      password: user.password,
      ciudad: user.ciudad,
      celular: user.celular
    });
  }

}
