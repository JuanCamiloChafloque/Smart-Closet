import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/services/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { PrendaService } from '../services/prenda.service';
import { Prenda } from '../services/prenda';
import { Superior } from '../services/superior';
import { Inferior } from '../services/inferior';
import { Zapato } from '../services/zapato';
import { Accesorio } from '../services/accesorio';
import { Vestido } from '../services/vestido';

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
  colors;
  hexColor = '';

  sup = false;
  inf = false;
  zap = false;
  ves = false;
  acc = false;
  abrigo = '';
  formalidad = '';

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
    this.colors = new Map<string, string>();
    this.colors.set('#ffffff', 'Blanco');
    this.colors.set('#808080', 'Gris');
    this.colors.set('#c0c0c0', 'Gris claro');
    this.colors.set('#000000', 'Negro');
    this.colors.set('#ff0000', 'Rojo');
    this.colors.set('#800000', 'Marrón');
    this.colors.set('#ffff00', 'Amarillo');
    this.colors.set('#00ff00', 'Verde claro');
    this.colors.set('#008000', 'Verde');
    this.colors.set('#00ffff', 'Azul claro');
    this.colors.set('#0000ff', 'Azul');
    this.colors.set('#000080', 'Azul oscuro');
    this.colors.set('#808000', 'Oliva');
    this.colors.set('#ff00ff', 'Fucsia');
    this.colors.set('#800080', 'Morado');
    this.colors.set('#fa8072', 'Salmon');
    this.colors.set('#ff8000', 'Naranja');
    this.colors.set('#fff8e7', 'Beige');
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
    this.prenda.color = this.colors.get(this.hexColor);
    this.prenda.url = this.foundImage;
    console.log(this.prenda);

    if (this.prenda.seccion === 'Superior') {
      this.prendaService.createSuperior(this.prenda as Superior, localStorage.getItem('User')).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/mi-armario']);
        },
        error => {
          console.log(error);
        }
      );
    } else if (this.prenda.seccion === 'Inferior') {
      this.prendaService.createInferior(this.prenda as Inferior, localStorage.getItem('User')).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/mi-armario']);
        },
        error => {
          console.log(error);
        }
      );
    } else if (this.prenda.seccion === 'Zapato') {
      this.prendaService.createZapato(this.prenda as Zapato, localStorage.getItem('User')).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/mi-armario']);
        },
        error => {
          console.log(error);
        }
      );
    } else if (this.prenda.seccion === 'Accesorio') {
      this.prendaService.createAccesorio(this.prenda as Accesorio, localStorage.getItem('User')).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/mi-armario']);
        },
        error => {
          console.log(error);
        }
      );
    } else if ( this.prenda.seccion === 'Vestido') {
      this.prendaService.createVestido(this.prenda as Vestido, localStorage.getItem('User')).subscribe(
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

  crearPrendaSubida() {
    this.prenda.disponible = true;
    this.prenda.favorito = false;
    this.prenda.color = this.colors.get(this.hexColor);
    this.prenda.url = '../../../assets/images/' + this.imageUser.name;
    console.log(this.prenda);

    if (this.prenda.seccion === 'Superior') {
      this.prendaService.createSuperior(this.prenda as Superior, localStorage.getItem('User')).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/mi-armario']);
        },
        error => {
          console.log(error);
        }
      );
    } else if (this.prenda.seccion === 'Inferior') {
      this.prendaService.createInferior(this.prenda as Inferior, localStorage.getItem('User')).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/mi-armario']);
        },
        error => {
          console.log(error);
        }
      );
    } else if (this.prenda.seccion === 'Zapato') {
      this.prendaService.createZapato(this.prenda as Zapato, localStorage.getItem('User')).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/mi-armario']);
        },
        error => {
          console.log(error);
        }
      );
    } else if (this.prenda.seccion === 'Accesorio') {
      this.prendaService.createAccesorio(this.prenda as Accesorio, localStorage.getItem('User')).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/mi-armario']);
        },
        error => {
          console.log(error);
        }
      );
    } else if ( this.prenda.seccion === 'Vestido') {
      this.prendaService.createVestido(this.prenda as Vestido, localStorage.getItem('User')).subscribe(
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

  filtrarSeccion() {
    if (this.prenda.seccion === 'Superior') {
      this.sup = true;
      this.zap = false;
      this.inf = false;
      this.ves = false;
      this.acc = false;
    } else if (this.prenda.seccion === 'Inferior') {
      this.sup = false;
      this.zap = false;
      this.ves = false;
      this.inf = true;
      this.acc = false;
    } else if (this.prenda.seccion === 'Zapato') {
      this.sup = false;
      this.zap = true;
      this.inf = false;
      this.ves = false;
      this.acc = false;
    } else if (this.prenda.seccion === 'Vestido') {
      this.ves = true;
      this.sup = false;
      this.zap = false;
      this.inf = false;
      this.acc = false;
    } else if (this.prenda.seccion === 'Accesorio') {
      this.sup = false;
      this.zap = false;
      this.inf = false;
      this.ves = false;
      this.acc = true;
    }
  }

}
