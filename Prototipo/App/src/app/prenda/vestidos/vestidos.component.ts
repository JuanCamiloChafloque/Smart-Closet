import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/services/usuario';
import { Vestido } from '../services/vestido';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { PrendaService } from '../services/prenda.service';
import { Prenda } from '../services/prenda';

@Component({
  selector: 'app-vestidos',
  templateUrl: './vestidos.component.html',
  styleUrls: ['./vestidos.component.css']
})
export class VestidosComponent implements OnInit {

  user: Usuario = undefined;
  llegoUsuario = false;
  llegoPrenda = false;
  vacioMessage = '';
  idEliminar;
  vacio = false;
  popup = false;
  vestidos: Vestido[];

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

    this.prendaService.getPrendasVestidos(localStorage.getItem('User')).subscribe(
      results => {
        this.vestidos = results;
        this.llegaronVestidos();
        console.log(this.vestidos);
      }
    );
  }

  llegaronVestidos() {
    this.llegoPrenda = true;
    if (this.vestidos.length === 0) {
      this.vacio = true;
      this.vacioMessage = 'No tienes prendas en el momento';
    }
  }

  inicializar() {
    this.llegoUsuario = true;
  }

  cambiarFavorito(id: number) {

    for (const prenda of this.vestidos) {
      if (prenda.id === id) {
        if (prenda.favorito === true) {
          prenda.favorito = false;
        } else {
          prenda.favorito = true;
        }
      }
    }

    this.prendaService.editarFavorito(id).subscribe(
      results => {
        console.log(results);
      }
    );
  }

  cambiarDisponible(id: number) {

    for (const prenda of this.vestidos) {
      if (prenda.id === id) {
        if (prenda.disponible === true) {
          prenda.disponible = false;
        } else {
          prenda.disponible = true;
        }
      }
    }

    this.prendaService.editarDisponible(id).subscribe(
      results => {
        console.log(results);
      }
    );

  }

  eliminarPrenda(id: number) {
    this.idEliminar = id;
    this.popup = true;
  }

  aceptar() {
    let prendaEliminar: Prenda;
    this.prendaService.eliminarPrenda(this.idEliminar).subscribe(
      results => {
        console.log(results);
      }
    );
    for (const prenda of this.vestidos) {
      if (prenda.id === this.idEliminar) {
        prendaEliminar = prenda;
      }
    }
    this.vestidos = this.vestidos.filter(obj => obj !== prendaEliminar);
    this.popup = false;
  }

  cancelar() {
    this.popup = false;
  }

}
