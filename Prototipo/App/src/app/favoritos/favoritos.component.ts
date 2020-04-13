import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/services/usuario';
import { Prenda } from '../prenda/services/prenda';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario/services/usuario.service';
import { PrendaService } from '../prenda/services/prenda.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  user: Usuario = undefined;
  llegoUsuario = false;
  llegoPrenda = false;
  favoritas: Prenda[];
  seccionSelected = 'Filtrar';
  filter: Prenda[];
  message = '';

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

    this.prendaService.getPrendasFavoritas(localStorage.getItem('User')).subscribe(
      results => {
        this.favoritas = results;
        this.filter = results;
        this.llegaronFavoritas();
        console.log(this.favoritas);
      }
    );

  }

  llegaronFavoritas() {
    this.llegoPrenda = true;
    if (this.favoritas.length === 0) {
      this.message = 'No tienes ninguna prenda favorita';
    }
  }

  inicializar() {
    this.llegoUsuario = true;
  }

  displayFavorites() {
    this.filter = [];
    console.log(this.seccionSelected);
    if (this.seccionSelected !== 'Todas') {
      for (const prenda of this.favoritas) {
        if (prenda.seccion === this.seccionSelected) {
          this.filter.push(prenda);
        }
      }
    } else {
      for (const prenda of this.favoritas) {
        this.filter.push(prenda);
      }
    }

    if (this.filter.length === 0) {
      if (this.seccionSelected === 'Todas') {
        this.message = 'No tienes ninguna prenda favorita';
      } else {
        this.message = 'No tienes ningún favorito en la sección ' + this.seccionSelected;
      }
    } else {
      this.message = '';
    }
  }

}
