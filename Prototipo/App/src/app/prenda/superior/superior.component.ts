import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { Usuario } from 'src/app/usuario/services/usuario';
import { PrendaService } from '../services/prenda.service';
import { Prenda } from '../services/prenda';

@Component({
  selector: 'app-superior',
  templateUrl: './superior.component.html',
  styleUrls: ['./superior.component.css']
})
export class SuperiorComponent implements OnInit {

  user: Usuario = undefined;
  llegoUsuario = false;
  llegoPrenda = false;
  superiores: Prenda[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsuarioService,
    private prendaService: PrendaService
  ) { }

  ngOnInit(): void {

    this.userService.findByNickname(localStorage.getItem('User')).subscribe(
      results => {
        this.user = results;
        this.inicializar();
      }
    );
    this.prendaService.getPrendasSuperiores(localStorage.getItem('User')).subscribe(
      results => {
        this.superiores = results;
        console.log(this.superiores);
        this.llegaronSuperiores();
      }
    );

  }

  llegaronSuperiores() {
    this.llegoPrenda = true;
  }

  inicializar() {
    this.llegoUsuario = true;
  }

}
