import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { Usuario } from 'src/app/usuario/services/usuario';
import { PrendaService } from '../../prenda/services/prenda.service';
import { AtuendoService } from '../services/atuendo.service';
import { Prenda } from 'src/app/prenda/services/prenda';
import { Atuendo } from '../services/atuendo';

@Component({
  selector: 'app-crear-atuendo',
  templateUrl: './crear-atuendo.component.html',
  styleUrls: ['./crear-atuendo.component.css']
})
export class CrearAtuendoComponent implements OnInit {

  user: Usuario;
  llegoUsuario = false;
  llegoPrendas = false;
  message = 'Selecciona prendas para crear tu atuendo!';
  seccionSelected = '';
  prendas: Prenda[];
  filter: Prenda[];
  escogidas: Prenda[] = [];
  vSuperior = false;
  vChaqueta = false;
  vInferior = false;
  vZapato = false;
  vVestido = false;
  atuendo: Atuendo = new Atuendo(undefined, undefined, undefined);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsuarioService,
    private prendaService: PrendaService,
    private atuendoService: AtuendoService
  ) { }

  ngOnInit(): void {
    this.userService.findByNickname(localStorage.getItem('User')).subscribe(
      results => {
        this.user = results;
        this.inicializar();
      }
    );

    this.prendaService.getPrendas(localStorage.getItem('User')).subscribe(
      results => {
        this.prendas = results;
        this.filter = results;
        this.llegaronPrendas();
        console.log(this.prendas);
      }
    );
  }

  inicializar() {
    this.llegoUsuario = true;
  }

  llegaronPrendas() {
    this.llegoPrendas = true;
    for (const prenda of this.prendas) {
      prenda.selected = false;
    }

    for (const prenda of this.prendas) {
      if (prenda.disponible === false) {
        this.prendas = this.prendas.filter(obj => obj !== prenda);
        this.filter = this.filter.filter(obj => obj !== prenda);
      }
    }


  }

  displayPrendas() {
    this.filter = [];

    for (const prenda of this.prendas) {
      if (prenda.seccion === this.seccionSelected) {
        this.filter.push(prenda);
      }
    }
  }

  agregarPrenda(prenda: Prenda) {
    this.message = '';
    if (this.verify(prenda)) {
      prenda.selected = true;
      this.escogidas.push(prenda);
    }
  }

  eliminarPrenda(id: number) {
    this.message = '';
    let prendaEliminar: Prenda;
    for (const prenda of this.escogidas) {
      if (prenda.id === id) {
        prendaEliminar = prenda;
      }
    }
    this.escogidas = this.escogidas.filter(obj => obj !== prendaEliminar);
    prendaEliminar.selected = false;
    if (prendaEliminar.seccion === 'Superior') {
      if (prendaEliminar.tipo === 'Camisa' || prendaEliminar.tipo === 'Camiseta' || prendaEliminar.tipo === 'Top') {
        this.vSuperior = false;
      } else {
        this.vChaqueta = false;
      }
    } else if (prendaEliminar.seccion === 'Inferior') {
      this.vInferior = false;
    } else if (prendaEliminar.seccion === 'Zapato') {
      this.vZapato = false;
    } else if (prendaEliminar.seccion === 'Vestido') {
      this.vVestido = false;
    }
    if (this.escogidas.length === 0) {
      this.message = 'Selecciona prendas para crear tu atuendo!';
    }
  }

  verify(prenda: Prenda): boolean {

    if (prenda.seccion === 'Superior') {
      if (prenda.tipo === 'Camisa' || prenda.tipo === 'Camiseta' || prenda.tipo === 'Top') {
        if (this.vSuperior === false) {
          this.vSuperior = true;
          return true;
        } else {
          this.message = 'Ya tienes una prenda superior del mismo tipo en tu atuendo';
          return false;
        }
      } else {
        if (this.vChaqueta === false) {
          this.vChaqueta = true;
          return true;
        } else {
          this.message = 'Ya tienes una prenda superior del mismo tipo en tu atuendo';
          return false;
        }
      }
    }
    if (prenda.seccion === 'Inferior') {
      if (this.vInferior === false) {
        this.vInferior = true;
        return true;
      } else {
        this.message = 'Ya tienes una prenda inferior en tu atuendo';
        return false;
      }
    }
    if (prenda.seccion === 'Zapato') {
      if (this.vZapato === false) {
        this.vZapato = true;
        return true;
      } else {
        this.message = 'Ya tienes un zapato en tu atuendo';
        return false;
      }
    }
    if (prenda.seccion === 'Vestido') {
      if (this.vSuperior === false) {
        if (this.vVestido === false) {
          this.vVestido = true;
          return true;
        } else {
          this.message = 'Ya tienes un vestido en tu atuendo';
          return false;
        }
      } else {
        this.message = 'Ya tienes una prenda superior en tu atuendo';
        return false;
      }

    }
    if (prenda.seccion === 'Accesorio' || prenda.seccion === 'Superior') {
      return true;
    }

  }

  crearAtuendo() {

    let sup = false;
    let inf = false;
    let zap = false;
    let ves = false;

    for (const prenda of this.escogidas) {
      if (prenda.seccion === 'Superior') {
        sup = true;
      }
      if (prenda.seccion === 'Inferior') {
        inf = true;
      }
      if (prenda.seccion === 'Zapato') {
        zap = true;
      }
      if (prenda.seccion === 'Vestido') {
        ves = true;
      }
    }

    if (ves === true) {
      if (zap === true) {
        this.atuendo.favorito = true;
        this.atuendo.prendas = this.escogidas;
        this.atuendoService.createAtuendo(localStorage.getItem('User'), this.atuendo).subscribe(
          results => {
            this.atuendo = results as Atuendo;
            console.log(this.atuendo);
            for (const prenda of this.escogidas) {
              this.atuendoService.agregarPrendaAtuendo(localStorage.getItem('User'), this.atuendo.id, prenda.id, prenda).subscribe(
                data => console.log(data)
              );
            }
            this.router.navigate(['/menu-atuendos']);
          });
      } else {
        this.message = 'Debe haber un Zapato para crear el atuendo';
      }
    } else {
      if (sup === true && inf === true && zap === true) {
        this.atuendo.favorito = true;
        this.atuendo.prendas = this.escogidas;
        this.atuendoService.createAtuendo(localStorage.getItem('User'), this.atuendo).subscribe(
          results => {
            this.atuendo = results as Atuendo;
            console.log(this.atuendo);
            for (const prenda of this.escogidas) {
              this.atuendoService.agregarPrendaAtuendo(localStorage.getItem('User'), this.atuendo.id, prenda.id, prenda).subscribe(
                data => console.log(data)
              );
            }
            this.router.navigate(['/menu-atuendos']);
          });
      } else {
        this.message = 'Debe haber por lo menos una prenda de la sección Superior, Inferior, Zapato';
      }
    }


  }


}
