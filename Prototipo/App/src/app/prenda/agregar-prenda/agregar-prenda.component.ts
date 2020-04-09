import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/services/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { PrendaService } from '../services/prenda.service';

@Component({
  selector: 'app-agregar-prenda',
  templateUrl: './agregar-prenda.component.html',
  styleUrls: ['./agregar-prenda.component.css']
})
export class AgregarPrendaComponent implements OnInit {

  user: Usuario;
  llegoUsuario = false;
  images: any[];
  query = '';
  llegoImagenes = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private prendaService: PrendaService,
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

  inicializarImagenes(data) {
    this.llegoImagenes = true;
    console.log(data.items);
    this.images = data.items;
  }

  searchImages() {
    return this.prendaService.getImages(this.query).subscribe(
      data => this.inicializarImagenes(data),
      error => console.log(error)
    );
  }

}
