import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/services/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario/services/usuario.service';

@Component({
  selector: 'app-armario',
  templateUrl: './armario.component.html',
  styleUrls: ['./armario.component.css']
})
export class ArmarioComponent implements OnInit {

  user: Usuario;
  llegoUsuario = false;
  first = true;

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

  previous() {
    if (this.first === false) {
      this.first = true;
    }
  }

  next() {
    if (this.first === true) {
      this.first = false;
    }
  }

}
