import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/services/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistroService } from './services/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  submitted = false;
  message = '';
  confirmPass = '';
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
    private registroService: RegistroService
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.submitted = true;
    if (this.usuario.password === this.confirmPass) {
      this.registroService.create(this.usuario).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/perfil']);
        },
        error => {
          console.log(error);
          this.submitted = false;
        }
      );
    } else {
      this.message = 'Las contraseñas son diferentes';
    }
  }

  get canSubmit() {
    if (this.usuario.nombre !== undefined && this.usuario.apellido !== undefined &&
       this.usuario.genero !== undefined && this.usuario.correo !== undefined &&
       this.usuario.ciudad !== undefined && this.usuario.celular !== undefined &&
       this.usuario.nickname !== undefined && this.usuario.password !== undefined &&
       this.confirmPass !== '' && this.submitted === false) {
        return true;
    } else {
      this.message = 'Todos los campos son obligatorios';
      return false;
    }
  }

}
