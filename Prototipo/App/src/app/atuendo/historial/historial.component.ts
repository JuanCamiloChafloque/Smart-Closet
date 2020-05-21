import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/services/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { AtuendoService } from '../services/atuendo.service';
import { Atuendo } from '../services/atuendo';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  user: Usuario;
  llegoUsuario = false;
  llegoAtuendos = false;
  llegoPrendas = false;
  vacioMessage = '';
  message = '';
  vacio = false;
  last = '';
  atuendos: Atuendo[];
  filter: Atuendo[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsuarioService,
    private atuendoService: AtuendoService
  ) { }

  ngOnInit(): void {
    this.userService.findByNickname(localStorage.getItem('User')).subscribe(
      results => {
        this.user = results;
        this.inicializar();
      }
    );

    this.atuendoService.getAtuendos(localStorage.getItem('User')).subscribe(
      results => {
        this.atuendos = results;
        this.filter = results;
        this.llegaronAtuendos();
      }
    );
  }

  inicializar() {
    this.llegoUsuario = true;
  }

  llegaronAtuendos() {
    this.llegoAtuendos = true;
    if (this.atuendos.length === 0) {
      this.vacio = true;
      this.vacioMessage = 'No tienes atuendos en el momento';
    }
    for (const atuendo of this.atuendos) {
      atuendo.numSup = 0;
      atuendo.numAcc = 0;
      atuendo.numVes = 0;
      this.atuendoService.getPrendasAtuendo(localStorage.getItem('User'), atuendo.id).subscribe(
        results => {
          atuendo.prendas = results;
          for (const actual of atuendo.prendas) {
            if (actual.seccion === 'Superior') {
              atuendo.numSup += 1;
            }
            if (actual.seccion === 'Accesorio') {
              atuendo.numAcc += 1;
            }
            if (actual.seccion === 'Vestido') {
              atuendo.numVes += 1;
            }
          }
        }
      );
      this.atuendoService.cantidadVeces(atuendo.id).subscribe(
        results => {
          atuendo.cantidad = results;
        }
      );
      this.atuendoService.ultimaVez(atuendo.id).subscribe(
        results => {
          atuendo.ultimo = results;
        }
      );
    }
    this.llegoPrendas = true;
    console.log(this.atuendos);
  }

  poner(id: number) {

    if (this.verifyDisponibilidad(id)) {
      this.message = '';
      const date: Date = new Date();
      let mesM = '';
      let diaM = '';

      const anio = date.getFullYear();
      const mes = date.getMonth() + 1;
      const dia = date.getDate();

      if (mes < 10) {
        mesM = '0' + mes;
      } else {
        mesM = '' + mes;
      }

      if (dia < 10) {
        diaM = '0' + dia;
      } else {
        diaM = '' + dia;
      }

      const fecha = anio + '-' + mesM + '-' + diaM;
      console.log(fecha);

      this.atuendoService.ponerAtuendo(localStorage.getItem('User'), id, fecha).subscribe(
        results => {
          console.log(results);
          this.router.navigate(['/menu-atuendos']);
        });
    } else {
      this.message = 'El atuendo no esta disponible en el momento. Alguna de las prendas están deshabilitadas.';
    }

  }

  verifyDisponibilidad(id: number): boolean {

    let atuendoEncontrado: Atuendo;

    for (const atuendo of this.atuendos) {
      if (atuendo.id === id) {
        atuendoEncontrado = atuendo;
      }
    }
    for (const prenda of atuendoEncontrado.prendas) {
      if (prenda.disponible === false) {
        return false;
      }
    }
    return true;
  }


  cambiarFavorito(id: number) {
    for (const atuendo of this.atuendos) {
      if (atuendo.id === id) {
        if (atuendo.favorito === true) {
          atuendo.favorito = false;
        } else {
          atuendo.favorito = true;
        }
      }
    }

    this.atuendoService.editarFavorito(id).subscribe(
      results => {
        console.log(results);
      }
    );
  }

  filtrarRecientes() {
    this.filter = [];
    const today: Date = new Date();
    if (this.last !== '') {
      if (+this.last === 4) {
        for (const atuendo of this.atuendos) {
          const mine: Date = new Date(atuendo.ultimo);
          const todayD = Math.round(today.getTime() * 1.1574e-8);
          const mineD = Math.round(mine.getTime() * 1.1574e-8);
          const res = todayD - mineD;
          if (res <= 4) {
            this.filter.push(atuendo);
          }
        }
      } else if (+this.last === 10) {
        for (const atuendo of this.atuendos) {
          const mine: Date = new Date(atuendo.ultimo);
          const todayD = Math.round(today.getTime() * 1.1574e-8);
          const mineD = Math.round(mine.getTime() * 1.1574e-8);
          const res = todayD - mineD;
          if (res <= 10) {
            this.filter.push(atuendo);
          }
        }
      } else if (+this.last === 12) {
        for (const atuendo of this.atuendos) {
          const mine: Date = new Date(atuendo.ultimo);
          const todayD = Math.round(today.getTime() * 1.1574e-8);
          const mineD = Math.round(mine.getTime() * 1.1574e-8);
          const res = todayD - mineD;
          if (res <= 12) {
            this.filter.push(atuendo);
          }
        }
      } else {
        for (const atuendo of this.atuendos) {
          this.filter.push(atuendo);
        }
      }
    }

  }

}
