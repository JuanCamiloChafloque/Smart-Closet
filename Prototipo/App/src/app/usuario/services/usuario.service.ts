import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from './usuario';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

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

  findByNickname(nickname: string) {
    const url = `http://localhost:8080/usuario/${nickname}`;
    return this.get<Usuario>(url);
  }

  findById(id: number) {
    const url = `http://localhost:8080/findUsuario/${id}`;
    return this.get<Usuario>(url);
  }

  update(user: Usuario) {
    const url = `http://localhost:8080/editarUsuario/${user.id}`;
    return this.put(url, {
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
