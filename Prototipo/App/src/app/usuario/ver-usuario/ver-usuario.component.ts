import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { environment } from '../../../environments/environment';
import { Usuario } from '../services/usuario';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css']
})
export class VerUsuarioComponent implements OnInit {

  user: Usuario = undefined;
  llegoUsuario = false;

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

  logout() {
    localStorage.clear();
    this.router.navigate(['/main-page']);
  }

  deleteUser() {

    if (window.confirm('Estás seguro que quieres eliminar tu cuenta?')) {
      this.userService.remove(this.user.id).subscribe(
        resultado => {
          console.log('Usuario eliminado!');
          this.logout();
        });
    }
  }

}
