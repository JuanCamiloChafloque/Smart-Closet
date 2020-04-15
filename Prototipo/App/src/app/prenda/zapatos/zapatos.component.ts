import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/services/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { PrendaService } from '../services/prenda.service';
import { Prenda } from '../services/prenda';

@Component({
  selector: 'app-zapatos',
  templateUrl: './zapatos.component.html',
  styleUrls: ['./zapatos.component.css']
})
export class ZapatosComponent implements OnInit {

  user: Usuario = undefined;
  llegoUsuario = false;
  llegoPrenda = false;
  vacioMessage = '';
  vacio = false;
  zapatos: Prenda[];
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

    this.prendaService.getPrendasZapatos(localStorage.getItem('User')).subscribe(
      results => {
        this.zapatos = results;
        console.log(this.zapatos);
        this.llegaronZapatos();
      }
    );

  }

  llegaronZapatos() {
    this.llegoPrenda = true;
    if (this.zapatos.length === 0) {
      this.vacio = true;
      this.vacioMessage = 'No tienes prendas en el momento';
    }
  }

  inicializar() {
    this.llegoUsuario = true;
  }

  cambiarFavorito(id: number) {

    for (const prenda of this.zapatos) {
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

    for (const prenda of this.zapatos) {
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
      for (const prenda of this.zapatos) {
        if (prenda.id === id) {
          prendaEliminar = prenda;
        }
      }
      this.zapatos = this.zapatos.filter(obj => obj !== prendaEliminar);
    }

  }

}
