import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PantallaInicioComponent } from './pantalla-inicio/pantalla-inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { VerUsuarioComponent } from './usuario/ver-usuario/ver-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { ClimaComponent } from './clima/clima.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main-page', component: PantallaInicioComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'perfil', component: VerUsuarioComponent },
  { path: 'editar-perfil', component: EditarUsuarioComponent },
  { path: 'ver-clima', component: ClimaComponent },
  { path: '', pathMatch: 'full', redirectTo: '/main-page' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
