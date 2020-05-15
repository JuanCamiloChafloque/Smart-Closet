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

    this.atuendoService.getAtuendos(localStorage.getItem('User')).subscribe(
      results => {
        this.atuendos = results;
        console.log(this.atuendos);
        this.llegaronAtuendos();
      }
    );

  }

  inicializar() {
    this.llegoUsuario = true;
  }

  llegaronAtuendos() {
    this.llegoAtuendos = true;
    for (const atuendo of this.atuendos){
      this.atuendoService.getPrendasAtuendo(localStorage.getItem('User'), atuendo.id).subscribe(
        results => {
          atuendo.prendas = results;
        }
      )
    }
    this.llegoPrendas = true;
    console.log(this.atuendos);
  }

}
