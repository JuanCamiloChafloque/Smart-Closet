import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { Usuario } from '../usuario/services/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nickname = '';
  password = '';
  message = '';
  login = false;
  usuarios: Usuario[];

  constructor(
    private router: Router,
    private logSesion: LoginService
  ) { }

  ngOnInit(): void {
  }

  iniciarSesion( ) {
    if (this.nickname === '' || this.password === '') {
      this.message = 'Todos los campos son obligatorios';
    } else {
      this.logSesion.findAll().subscribe(
        results => this.usuarios = results,
        error => this.message = error.text
      );

      for (const actual of this.usuarios) {
        if (actual.nickname === this.nickname && actual.password === this.password) {
          this.login = true;
        }
      }

      if (this.login === true) {
        this.router.navigate(['']);
      } else {
        this.message = 'Usuario o contraseña incorrecta';
      }
    }
  }

}
