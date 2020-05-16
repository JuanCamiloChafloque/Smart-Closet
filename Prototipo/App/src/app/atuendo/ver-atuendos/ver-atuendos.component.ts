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
