import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-inicio',
  templateUrl: './pantalla-inicio.component.html',
  styleUrls: ['./pantalla-inicio.component.css']
})
export class PantallaInicioComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

}
