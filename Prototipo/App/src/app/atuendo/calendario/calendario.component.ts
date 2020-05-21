import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/services/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { AtuendoService } from '../services/atuendo.service';
import { Calendario } from '../services/calendario';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  user: Usuario;
  nombreMeses;
  llegoUsuario = false;
  calendario: Calendario[] = [];
  mesInicial;
  anioInicial;

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
  }

  inicializar() {
    this.llegoUsuario = true;
    this.meses();
    const fecha: Date = new Date();
    this.mesInicial = fecha.getMonth() + 1;
    this.anioInicial = fecha.getFullYear();
    const diaActual = new Date(this.anioInicial, this.mesInicial, 0).getDate();
    const semana = new Date(this.anioInicial, this.mesInicial - 1, 1);

    for (let i = 0; i < semana.getDay(); i++) {
      const cal: Calendario = new Calendario(-1, -1, -1, null);
      this.calendario.push(cal);
    }

    for (let i = 0; i < diaActual; i++) {
      const cal: Calendario = new Calendario(i + 1, this.mesInicial, this.anioInicial, undefined);
      const date = this.calcularFecha(i + 1, this.mesInicial, this.anioInicial);
      this.atuendoService.atuendoFecha(date, localStorage.getItem('User')).subscribe(
        results => {
          cal.atuendo = results;
          if (cal.atuendo !== null) {
            cal.atuendo.numSup = 0;
            cal.atuendo.numAcc = 0;
            cal.atuendo.numVes = 0;
            this.atuendoService.getPrendasAtuendo(localStorage.getItem('User'), cal.atuendo.id).subscribe(
              data => {
                cal.atuendo.prendas = data;
                for (const actual of cal.atuendo.prendas) {
                  if (actual.seccion === 'Superior') {
                    cal.atuendo.numSup += 1;
                  }
                  if (actual.seccion === 'Accesorio') {
                    cal.atuendo.numAcc += 1;
                  }
                  if (actual.seccion === 'Vestido') {
                    cal.atuendo.numVes += 1;
                  }
                }
              }
            );
          }
        });
      this.calendario.push(cal);
    }

    const ultimoDia = new Date(this.anioInicial, this.mesInicial - 1, diaActual);

    for (let i = 0; i < 6 - ultimoDia.getDay(); i++) {
      const cal: Calendario = new Calendario(-1, -1, -1, null);
      this.calendario.push(cal);
    }

  }

  meses() {
    this.nombreMeses = new Map<number, string>();
    this.nombreMeses.set(1, 'Enero');
    this.nombreMeses.set(2, 'Febrero');
    this.nombreMeses.set(3, 'Marzo');
    this.nombreMeses.set(4, 'Abril');
    this.nombreMeses.set(5, 'Mayo');
    this.nombreMeses.set(6, 'Junio');
    this.nombreMeses.set(7, 'Julio');
    this.nombreMeses.set(8, 'Agosto');
    this.nombreMeses.set(9, 'Septiembre');
    this.nombreMeses.set(10, 'Octubre');
    this.nombreMeses.set(11, 'Noviembre');
    this.nombreMeses.set(12, 'Diciembre');
  }

  actualizarDisplayLeft() {

    this.calendario = [];

    if (this.mesInicial === 1) {
      this.mesInicial = 12;
      this.anioInicial -= 1;
    } else {
      this.mesInicial -= 1;
    }

    const diaActual = new Date(this.anioInicial, this.mesInicial, 0).getDate();
    const semana = new Date(this.anioInicial, this.mesInicial - 1, 1);

    for (let i = 0; i < semana.getDay(); i++) {
      const cal: Calendario = new Calendario(-1, -1, -1, null);
      this.calendario.push(cal);
    }


    for (let i = 0; i < diaActual; i++) {
      const cal: Calendario = new Calendario(i + 1, this.mesInicial, this.anioInicial, undefined);
      const date = this.calcularFecha(i + 1, this.mesInicial, this.anioInicial);
      this.atuendoService.atuendoFecha(date, localStorage.getItem('User')).subscribe(
        results => {
          cal.atuendo = results;
          if (cal.atuendo !== null) {
            cal.atuendo.numSup = 0;
            cal.atuendo.numAcc = 0;
            cal.atuendo.numVes = 0;
            this.atuendoService.getPrendasAtuendo(localStorage.getItem('User'), cal.atuendo.id).subscribe(
              data => {
                cal.atuendo.prendas = data;
                for (const actual of cal.atuendo.prendas) {
                  if (actual.seccion === 'Superior') {
                    cal.atuendo.numSup += 1;
                  }
                  if (actual.seccion === 'Accesorio') {
                    cal.atuendo.numAcc += 1;
                  }
                  if (actual.seccion === 'Vestido') {
                    cal.atuendo.numVes += 1;
                  }
                }
              }
            );
          }
        }
      );
      this.calendario.push(cal);
    }

    const ultimoDia = new Date(this.anioInicial, this.mesInicial - 1, diaActual);

    for (let i = 0; i < 6 - ultimoDia.getDay(); i++) {
      const cal: Calendario = new Calendario(-1, -1, -1, null);
      this.calendario.push(cal);
    }

  }

  actualizarDisplayRight() {

    this.calendario = [];

    if (this.mesInicial === 12) {
      this.mesInicial = 1;
      this.anioInicial += 1;
    } else {
      this.mesInicial += 1;
    }

    const diaActual = new Date(this.anioInicial, this.mesInicial, 0).getDate();
    const semana = new Date(this.anioInicial, this.mesInicial - 1, 1);

    for (let i = 0; i < semana.getDay(); i++) {
      const cal: Calendario = new Calendario(-1, -1, -1, null);
      this.calendario.push(cal);
    }


    for (let i = 0; i < diaActual; i++) {
      const cal: Calendario = new Calendario(i + 1, this.mesInicial, this.anioInicial, undefined);
      const date = this.calcularFecha(i + 1, this.mesInicial, this.anioInicial);
      this.atuendoService.atuendoFecha(date, localStorage.getItem('User')).subscribe(
        results => {
          cal.atuendo = results;
          if (cal.atuendo !== null) {
            cal.atuendo.numSup = 0;
            cal.atuendo.numAcc = 0;
            cal.atuendo.numVes = 0;
            this.atuendoService.getPrendasAtuendo(localStorage.getItem('User'), cal.atuendo.id).subscribe(
              data => {
                cal.atuendo.prendas = data;
                for (const actual of cal.atuendo.prendas) {
                  if (actual.seccion === 'Superior') {
                    cal.atuendo.numSup += 1;
                  }
                  if (actual.seccion === 'Accesorio') {
                    cal.atuendo.numAcc += 1;
                  }
                  if (actual.seccion === 'Vestido') {
                    cal.atuendo.numVes += 1;
                  }
                }
              }
            );
          }
        }
      );
      this.calendario.push(cal);
    }

    const ultimoDia = new Date(this.anioInicial, this.mesInicial - 1, diaActual);

    for (let i = 0; i < 6 - ultimoDia.getDay(); i++) {
      const cal: Calendario = new Calendario(-1, -1, -1, null);
      this.calendario.push(cal);
    }

  }

  calcularFecha(dia: number, mes: number, anio: number): string {
    let mesM = '';
    let diaM = '';

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
    return fecha;
  }

}
