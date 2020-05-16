import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/services/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

@Component({
  selector: 'app-menu-atuendo',
  templateUrl: './menu-atuendo.component.html',
  styleUrls: ['./menu-atuendo.component.css']
})
export class MenuAtuendoComponent implements OnInit {

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
