import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PantallaInicioComponent } from './pantalla-inicio/pantalla-inicio.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: PantallaInicioComponent },
  { path: 'register', component: RegistroComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
