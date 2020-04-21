import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/services/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { PrendaService } from '../services/prenda.service';
import { Prenda } from '../services/prenda';
import { Accesorio } from '../services/accesorio';

@Component({
  selector: 'app-accesorios',
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css']
})
export class AccesoriosComponent implements OnInit {

  user: Usuario = undefined;
  llegoUsuario = false;
  llegoPrenda = false;
  vacioMessage = '';
  vacio = false;
  accesorios: Accesorio[];

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

    this.prendaService.getPrendasAccesorios(localStorage.getItem('User')).subscribe(
      results => {
        this.accesorios = results;
        this.llegaronAccesorios();
        console.log(this.accesorios);
      }
    );

  }

  llegaronAccesorios() {
    this.llegoPrenda = true;
    if (this.accesorios.length === 0) {
      this.vacio = true;
      this.vacioMessage = 'No tienes prendas en el momento';
    }
  }

  inicializar() {
    this.llegoUsuario = true;
  }

  cambiarFavorito(id: number) {

    for (const prenda of this.accesorios) {
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

    for (const prenda of this.accesorios) {
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

    if (window.confirm('Estás seguro que quieres eliminar la prenda?')) {
      let prendaEliminar: Prenda;
      this.prendaService.eliminarPrenda(id).subscribe(
        results => {
          console.log(results);
        }
      );
      for (const prenda of this.accesorios) {
        if (prenda.id === id) {
          prendaEliminar = prenda;
        }
      }
      this.accesorios = this.accesorios.filter(obj => obj !== prendaEliminar);
    }

  }

}
