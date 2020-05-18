import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PantallaInicioComponent } from './pantalla-inicio/pantalla-inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { VerUsuarioComponent } from './usuario/ver-usuario/ver-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { ClimaComponent } from './clima/clima.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { ArmarioComponent } from './armario/armario.component';
import { SuperiorComponent } from './prenda/superior/superior.component';
import { InferiorComponent } from './prenda/inferior/inferior.component';
import { ZapatosComponent } from './prenda/zapatos/zapatos.component';
import { AccesoriosComponent } from './prenda/accesorios/accesorios.component';
import { AgregarPrendaComponent } from './prenda/agregar-prenda/agregar-prenda.component';
import { GenerarAtuendoComponent } from './generar-atuendo/generar-atuendo.component';
import { PasswordComponent } from './usuario/password/password.component';
import { VestidosComponent } from './prenda/vestidos/vestidos.component';
import { VerAtuendosComponent } from './atuendo/ver-atuendos/ver-atuendos.component';
import { HistorialComponent } from './atuendo/historial/historial.component';
import { CrearAtuendoComponent } from './atuendo/crear-atuendo/crear-atuendo.component';
import { MenuAtuendoComponent } from './atuendo/menu-atuendo/menu-atuendo.component';
import { CalendarioComponent } from './atuendo/calendario/calendario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main-page', component: PantallaInicioComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'perfil', component: VerUsuarioComponent },
  { path: 'editar-perfil', component: EditarUsuarioComponent },
  { path: 'ver-clima', component: ClimaComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'mi-armario', component: ArmarioComponent },
  { path: 'prendas-superiores', component: SuperiorComponent },
  { path: 'prendas-inferiores', component: InferiorComponent },
  { path: 'prendas-zapatos', component: ZapatosComponent },
  { path: 'prendas-accesorios', component: AccesoriosComponent },
  { path: 'prendas-vestidos', component: VestidosComponent },
  { path: 'agregar-prenda', component: AgregarPrendaComponent },
  { path: 'generar-atuendo', component: GenerarAtuendoComponent },
  { path: 'recuperar-contrasena', component: PasswordComponent },
  { path: 'menu-atuendos', component: MenuAtuendoComponent },
  { path: 'mis-atuendos', component: VerAtuendosComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'mi-calendario', component: CalendarioComponent },
  { path: 'crear-atuendo', component: CrearAtuendoComponent },
  { path: '', pathMatch: 'full', redirectTo: '/main-page' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
