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

    this.userService.findById(+localStorage.getItem('User ID')).subscribe(
      results => {
        this.user = results;
        this.inicializar();
      }
    );

  }

  inicializar() {
    this.llegoUsuario = true;
  }

  irAPerfil() {
    this.router.navigate(['/perfil']);
  }

  verClima() {
    this.router.navigate(['/ver-clima']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/main-page']);
  }

}
