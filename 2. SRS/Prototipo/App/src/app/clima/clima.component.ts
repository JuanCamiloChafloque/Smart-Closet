import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClimaService } from './services/clima.service';
import { Usuario } from '../usuario/services/usuario';
import { UsuarioService } from '../usuario/services/usuario.service';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {

  clima;
  lat;
  lon;
  ciudad = '';
  user: Usuario;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private climaService: ClimaService,
    private userService: UsuarioService
  ) { }

  ngOnInit(): void {

    this.userService.findById(+localStorage.getItem('User ID')).subscribe(
      results => {
        this.user = results;
      }
    );

    this.getClimaByCoord();

  }

  getClimaByCoord() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.climaService.getClimaByCoord(this.lat, this.lon).subscribe(data => {
          console.log(data);
          this.clima = data;
        });
      });
    }
  }

  getClimaByName() {

    this.climaService.getClimaByName(this.ciudad).subscribe((data: any) => {
      console.log(data);
      this.clima = data;
      this.lat = data.coord.lat;
      this.lon = data.coord.lon;
    });

  }

  getCoords(event) {

    this.lat = event.coords.lat;
    this.lon = event.coords.lng;

    this.climaService.getClimaByCoord(this.lat, this.lon).subscribe(data => {
      this.clima = data;
      console.log(data);
    });

  }

}
