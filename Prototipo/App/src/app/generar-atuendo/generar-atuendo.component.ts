import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario/services/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../usuario/services/usuario.service';
import { Superior } from '../prenda/services/superior';
import { Inferior } from '../prenda/services/inferior';
import { Zapato } from '../prenda/services/zapato';
import { Accesorio } from '../prenda/services/accesorio';
import { PrendaService } from '../prenda/services/prenda.service';
import { Vestido } from '../prenda/services/vestido';
import { ClimaService } from '../clima/services/clima.service';
import { Atuendo } from '../atuendo/services/atuendo';
import { Prenda } from '../prenda/services/prenda';

@Component({
  selector: 'app-generar-atuendo',
  templateUrl: './generar-atuendo.component.html',
  styleUrls: ['./generar-atuendo.component.css']
})
export class GenerarAtuendoComponent implements OnInit {

  user: Usuario;
  llegoUsuario = false;

  formalidad = 3;
  clima = 2;
  climaApi;
  favoritos;
  checkVestido = false;

  superiores: Superior[];
  inferiores: Inferior[];
  zapatos: Zapato[];
  accesorios: Accesorio[];
  vestidos: Vestido[];
  apiClima;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsuarioService,
    private prendaService: PrendaService,
    private climaService: ClimaService
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
    this.prendaService.getPrendasSuperiores(localStorage.getItem('User')).subscribe(
      results => {
        this.superiores = results;
      }
    );

    /*this.climaService.getClimaByName(this.user.ciudad).subscribe(
      (data: any) => {
        this.apiClima = data;
        this.climaApi = this.apiClima.main.temp;
      }
    );*/

    this.prendaService.getPrendasInferiores(localStorage.getItem('User')).subscribe(
      results => {
        this.inferiores = results;
      }
    );

    this.prendaService.getPrendasZapatos(localStorage.getItem('User')).subscribe(
      results => {
        this.zapatos = results;
      }
    );

    this.prendaService.getPrendasAccesorios(localStorage.getItem('User')).subscribe(
      results => {
        this.accesorios = results;
      }
    );

    this.prendaService.getPrendasVestidos(localStorage.getItem('User')).subscribe(
      results => {
        this.vestidos = results;
      }
    );
  }

  generarAtuendos() {
    let atuendos: Atuendo[] = [];

    for (let i = 0; i < 3; i++) {
      const rand = Math.round((Math.random() * this.superiores.length));
      const supActual = this.superiores[rand];
      console.log(rand);
      console.log(supActual);
      if (supActual.formalidad >= this.formalidad - 1 && supActual.formalidad <= this.formalidad - 1) {
        if (this.clima === -1) {
          this.clima = this.calcularAbrigoAPI(this.climaApi);
        }
        if (supActual.abrigo === this.clima) {
          atuendos.push(this.generarInd(supActual));
        }
      }
    }

    console.log(atuendos);

  }

  calcularAbrigoAPI(temp: number ): number {
    if (temp < 5) {
      return 5;
    } else if (temp < 12) {
      return 4;
    } else if (temp < 17) {
      return 3;
    } else if (temp < 25) {
      return 2;
    } else if (temp >= 25) {
      return 1;
    }
  }

  generarInd(superior: Superior): Atuendo {

    const color = superior.color;
    let atuendo: Atuendo = new Atuendo(undefined, undefined, []);
    let colorSuperior;
    let colorInferior;
    atuendo.prendas.push(superior);

    if (superior.tipo === 'Chaqueta' || superior.tipo === 'Saco' || superior.tipo === 'Abrigo') {
      for (const sup of this.superiores) {
        if (sup.disponible === true) {
          if (sup.id !== superior.id) {
            if (sup.tipo === 'Camiseta' || sup.tipo === 'Blusa' || sup.tipo === 'Top' || sup.tipo === 'Camisa') {
              if (sup.abrigo > 2) {
                if (sup.formalidad >= this.formalidad - 1 && sup.formalidad <= this.formalidad + 1) {
                  const colores = this.coloresClima(this.clima);
                  if (colores.includes(sup.color)) {
                    atuendo.prendas.push(sup);
                    sup.disponible = false;
                    colorSuperior = sup.color;
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }

    for (const inf of this.inferiores) {
      if (inf.disponible === true) {
        if (inf.abrigo >= this.clima - 1 && inf.abrigo <= this.clima + 1) {
          if (inf.formalidad >= this.formalidad - 1 && inf.formalidad <= this.formalidad + 1) {
            const colores = this.coloresClima(this.clima);
            if (colores.includes(inf.color)) {
              atuendo.prendas.push(inf);
              colorInferior = inf.color;
              inf.disponible = false;
              break;
            }
          }
        }
      }
    }

    for (const zap of this.zapatos) {
      if (zap.disponible === true) {
        if (zap.abrigo >= this.clima - 1 && zap.abrigo <= this.clima + 1) {
          if (zap.formalidad >= this.formalidad - 1 && zap.formalidad <= this.formalidad + 1) {
            const colores = this.coloresClima(this.clima);
            if (colores.includes(zap.color)) {
              atuendo.prendas.push(zap);
              zap.disponible = false;
              break;
            }
          }
        }
      }
    }

    if (this.clima >= 4) {
      for (const acc of this.accesorios) {
        if (acc.disponible === true) {
          if (this.clima === 5) {
            if (acc.formalidad >= this.formalidad - 1 && acc.formalidad <= this.formalidad + 1) {
              const colores = this.coloresClima(this.clima);
              if (acc.color === colorSuperior || acc.color === colorInferior) {
                atuendo.prendas.push(acc);
                acc.disponible = false;
                break;
              }
            }
          }
        }
      }
    }

    return atuendo;
  }

  coloresClima(abrigo: number): string[] {

    let colores: string[] = [];
    if (abrigo === 1) {
      colores.push('Negro');
      colores.push('Blanco');
      colores.push('Azul claro');
      colores.push('Verde claro');
      colores.push('Amarillo');
      colores.push('Naranja');
      colores.push('Salmon');
      colores.push('Fucsia');
    } else if (abrigo === 2) {
      colores.push('Negro');
      colores.push('Blanco');
      colores.push('Azul');
      colores.push('Verde');
      colores.push('Amarillo');
      colores.push('Naranja');
      colores.push('Salmon');
      colores.push('Fucsia');
      colores.push('Rojo');
    } else if (abrigo === 3) {
      colores.push('Negro');
      colores.push('Blanco');
      colores.push('Gris');
      colores.push('Gris claro');
      colores.push('Marrón');
      colores.push('Rojo');
      colores.push('Morado');
      colores.push('Oliva');
      colores.push('Azul');
    } else if (abrigo === 4) {
      colores.push('Morado');
      colores.push('Blanco');
      colores.push('Negro');
      colores.push('Gris');
      colores.push('Marrón');
      colores.push('Beige');
      colores.push('Azul');
    } else if (abrigo === 5) {
      colores.push('Morado');
      colores.push('Beige');
      colores.push('Blanco');
      colores.push('Negro');
      colores.push('Gris');
      colores.push('Verde');
      colores.push('Azul oscuro');
    }

    return colores;
  }



}
