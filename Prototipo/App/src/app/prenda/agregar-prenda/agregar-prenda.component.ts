import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/services/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { PrendaService } from '../services/prenda.service';
import { Prenda } from '../services/prenda';

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
  message = '';
  llegoImagenes = false;
  selected = false;
  selectedImage = false;
  foundImage;
  imageUser;
  prenda: Prenda = new Prenda(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  );

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
    console.log(data.items);
    this.images = data.items;
    this.llegoImagenes = true;
    this.selected = false;
    this.message = '';
  }

  selectImage(link) {
    this.foundImage = link;
    this.message = 'Imagen Seleccionada';
    this.selected = true;
  }

  searchImages() {
    return this.prendaService.getImages(this.query + ' png').subscribe(
      data => this.inicializarImagenes(data),
      error => console.log(error)
    );
  }

  subirFoto(event) {
    this.selectedImage = true;
    this.imageUser = event.target.files[0];
  }

  crearPrendaBusqueda() {
    this.prenda.disponible = true;
    this.prenda.favorito = false;
    this.prenda.imgUrl = this.foundImage;
    console.log(this.prenda);
    this.prendaService.create(this.prenda, localStorage.getItem('User')).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/mi-armario']);
      },
      error => {
        console.log(error);
      }
    );
  }

  crearPrendaSubida() {
    this.prenda.disponible = true;
    this.prenda.favorito = false;
    this.prenda.imgUrl = this.imageUser.name;
    console.log(this.prenda);
    this.prendaService.create(this.prenda, localStorage.getItem('User')).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/mi-armario']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
