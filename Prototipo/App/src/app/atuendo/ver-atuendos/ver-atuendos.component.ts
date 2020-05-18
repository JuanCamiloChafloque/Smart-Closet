import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/services/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { Atuendo } from '../services/atuendo';
import { AtuendoService } from '../services/atuendo.service';

@Component({
  selector: 'app-ver-atuendos',
  templateUrl: './ver-atuendos.component.html',
  styleUrls: ['./ver-atuendos.component.css']
})
export class VerAtuendosComponent implements OnInit {

  user: Usuario;
  llegoUsuario = false;
  llegoAtuendos = false;
  llegoPrendas = false;
  message = '';
  vacioMessage = '';
  idEliminar;
  vacio = false;
  popup = false;
  atuendos: Atuendo[];

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

    this.atuendoService.getAtuendosFavoritos(localStorage.getItem('User')).subscribe(
      results => {
        this.atuendos = results;
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
          }
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
      this.message = 'El atuendo no esta disponible en el momento. Alguna de las prendas estan deshabilitadas.';
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

  eliminar(id: number) {
    this.idEliminar = id;
    this.popup = true;
  }

  aceptar() {

    let atuendoEliminar: Atuendo;
    this.atuendoService.editarFavorito(this.idEliminar).subscribe(
      results => {
        console.log(results);
      }
    );
    for (const atuendo of this.atuendos) {
      if (atuendo.id === this.idEliminar) {
        atuendoEliminar = atuendo;
      }
    }
    this.atuendos = this.atuendos.filter(obj => obj !== atuendoEliminar);
    this.popup = false;

  }

  cancelar() {
    this.popup = false;
  }

}
