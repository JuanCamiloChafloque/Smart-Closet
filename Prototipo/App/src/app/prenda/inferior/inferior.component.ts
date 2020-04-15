import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/services/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { PrendaService } from '../services/prenda.service';
import { Prenda } from '../services/prenda';

@Component({
  selector: 'app-inferior',
  templateUrl: './inferior.component.html',
  styleUrls: ['./inferior.component.css']
})
export class InferiorComponent implements OnInit {

  user: Usuario = undefined;
  llegoUsuario = false;
  llegoPrenda = false;
  vacioMessage = '';
  vacio = false;
  inferiores: Prenda[];
  prendaEditar: Prenda;

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

    this.prendaService.getPrendasInferiores(localStorage.getItem('User')).subscribe(
      results => {
        this.inferiores = results;
        console.log(this.inferiores);
        this.llegaronInferiores();
      }
    );

  }

  llegaronInferiores() {
    this.llegoPrenda = true;
    if (this.inferiores.length === 0) {
      this.vacio = true;
      this.vacioMessage = 'No tienes prendas en el momento';
    }
  }

  inicializar() {
    this.llegoUsuario = true;
  }

  cambiarFavorito(id: number) {

    for (const prenda of this.inferiores) {
      if (prenda.id === id) {
        if (prenda.favorito === true) {
          prenda.favorito = false;
        } else {
          prenda.favorito = true;
        }
      }
      this.prendaEditar = prenda;
    }
    this.prendaService.editarFavorito(id, this.prendaEditar).subscribe(
      results => {
        console.log(results);
        this.prendaEditar = undefined;
      }
    );
  }

  cambiarDisponible(id: number) {

    for (const prenda of this.inferiores) {
      if (prenda.id === id) {
        if (prenda.disponible === true) {
          prenda.disponible = false;
        } else {
          prenda.disponible = true;
        }
      }
      this.prendaEditar = prenda;
    }
    this.prendaService.editarDisponible(id, this.prendaEditar).subscribe(
      results => {
        console.log(results);
        this.prendaEditar = undefined;
      }
    );

  }

  eliminarPrenda(id: number) {

    if (window.confirm('Estás seguro que quieres eliminar la prenda?')) {
      let prendaEliminar: Prenda;
      this.prendaService.eliminarPrenda(id).subscribe(
        results => {
          console.log(results);
        }
      );
      for (const prenda of this.inferiores) {
        if (prenda.id === id) {
          prendaEliminar = prenda;
        }
      }
      this.inferiores = this.inferiores.filter(obj => obj !== prendaEliminar);
    }
  }

}
