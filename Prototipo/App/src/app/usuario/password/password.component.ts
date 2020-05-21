import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../services/usuario';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  user: Usuario;
  llegoUsuario = false;
  respuesta = '';
  correct = false;
  message = '';
  password = '';
  confirm = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.userService.findByNickname(localStorage.getItem('User')).subscribe(
      results => {
        this.user = results;
        this.inicializar();
      }
    );
  }

  inicializar() {
    this.llegoUsuario = true;
  }

  verificar() {
    if (this.respuesta !== '') {
      if (this.respuesta === this.user.respuesta) {
        this.correct = true;
        this.message = '';
      } else {
        this.message = 'Respuesta incorrecta!';
      }
    } else {
      this.message = 'Digita tu respuesta';
    }
  }

  confirmar() {
    if (this.password !== '' && this.confirm !== '') {
      if (this.password === this.confirm) {
        this.user.password = this.password;
        this.userService.update(this.user).subscribe(
          result => {
            this.router.navigate(['/login']);
            console.log(result);
          },
          error => {
            console.log(error);
          }
        );
      } else {
        this.message = 'Las contraseñas no coinciden';
      }
    } else {
      this.message = 'Todos los campos son obligatorios!';
    }

  }

}
