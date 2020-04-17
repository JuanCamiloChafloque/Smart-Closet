import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/services/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistroService } from './services/registro.service';
import { LoginService } from '../login/services/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  submitted = false;
  message = '';
  confirmPass = '';
  usuarios: Usuario[];
  usuario: Usuario = new Usuario(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registroService: RegistroService,
    private logSesion: LoginService
  ) { }

  ngOnInit(): void {
    this.logSesion.findAll().subscribe(
      results => this.usuarios = results,
      error => this.message = error.text
    );
  }

  register() {
    this.submitted = true;
    for (const actual of this.usuarios) {
      if (this.usuario.nickname === actual.nickname) {
        this.message = 'Nickname no disponible';
        this.submitted = false;
      }
      if (this.usuario.correo === actual.correo) {
        this.message = 'Ya hay un usuario asociado al correo ingresado';
        this.submitted = false;
      }
    }

    if (this.submitted === true) {
      if (this.usuario.password === this.confirmPass) {
        this.registroService.create(this.usuario).subscribe(
          result => {
            console.log(result);
            localStorage.setItem('User', this.usuario.nickname);
            this.router.navigate(['/mi-armario']);
          },
          error => {
            console.log(error);
          }
        );
      } else {
        this.message = 'Las contraseñas son diferentes';
      }
    }
  }

  get canSubmit() {
    if (this.usuario.nombre !== undefined && this.usuario.apellido !== undefined &&
       this.usuario.genero !== undefined && this.usuario.correo !== undefined &&
       this.usuario.ciudad !== undefined && this.usuario.celular !== undefined &&
       this.usuario.nickname !== undefined && this.usuario.password !== undefined &&
       this.confirmPass !== '') {
        return true;
    } else {
      this.message = 'Todos los campos son obligatorios';
      return false;
    }
  }

}
