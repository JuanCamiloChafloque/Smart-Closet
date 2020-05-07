import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { Usuario } from 'src/app/usuario/services/usuario';

@Component({
  selector: 'app-crear-atuendo',
  templateUrl: './crear-atuendo.component.html',
  styleUrls: ['./crear-atuendo.component.css']
})
export class CrearAtuendoComponent implements OnInit {

  user: Usuario;
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

}
