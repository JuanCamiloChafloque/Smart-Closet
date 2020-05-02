import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { Usuario } from 'src/app/usuario/services/usuario';
import { PrendaService } from '../services/prenda.service';
import { Prenda } from '../services/prenda';
import { Superior } from '../services/superior';

@Component({
  selector: 'app-superior',
  templateUrl: './superior.component.html',
  styleUrls: ['./superior.component.css']
})
export class SuperiorComponent implements OnInit {

  user: Usuario = undefined;
  llegoUsuario = false;
  llegoPrenda = false;
  vacioMessage = '';
  vacio = false;
  popup = false;
  idEliminar;
  superiores: Superior[];

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
    if (this.superiores.length === 0) {
      this.vacio = true;
      this.vacioMessage = 'No tienes prendas en el momento';
    }
  }

  inicializar() {
    this.llegoUsuario = true;
  }

  cambiarFavorito(id: number) {

    for (const prenda of this.superiores) {
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

    for (const prenda of this.superiores) {
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
    for (const prenda of this.superiores) {
      if (prenda.id === this.idEliminar) {
        prendaEliminar = prenda;
      }
    }
    this.superiores = this.superiores.filter(obj => obj !== prendaEliminar);
    this.popup = false;
  }

  cancelar() {
    this.popup = false;
  }


}
