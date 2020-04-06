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

  user: Usuario = environment.user;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsuarioService
  ) { }

  ngOnInit(): void {
  }

  irAPerfil() {
    this.router.navigate(['/perfil']);
  }

  verClima() {
    this.router.navigate(['/ver-clima']);
  }

}
