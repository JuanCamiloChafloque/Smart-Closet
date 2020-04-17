import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { Usuario } from '../usuario/services/usuario';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = '';
  password = '';
  message = '';
  login = false;
  usuario: Usuario = null;
  usuarios: Usuario[];

  constructor(
    private router: Router,
    private logSesion: LoginService
  ) { }

  ngOnInit(): void {
    this.logSesion.findAll().subscribe(
      results => this.usuarios = results,
      error => this.message = error.text
    );
  }

  iniciarSesion( ) {
    if (this.user === '' || this.password === '') {
      this.message = 'Todos los campos son obligatorios';
    } else {
      for (const actual of this.usuarios) {
        if (actual.nickname === this.user || actual.correo === this.user) {
          if (actual.password === this.password) {
            this.usuario = actual;
            this.login = true;
          }
        }
      }

      if (this.login === true) {
        localStorage.setItem('User', this.usuario.nickname);
        this.router.navigate(['/mi-armario']);
      } else {
        this.message = 'Usuario o contraseña incorrecta';
      }
    }
  }

}
