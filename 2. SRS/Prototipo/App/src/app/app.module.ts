import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PantallaInicioComponent } from './pantalla-inicio/pantalla-inicio.component';
import { ClimaComponent } from './clima/clima.component';
import { LoginService } from './login/services/login.service';
import { RegistroService } from './registro/services/registro.service';
import { UsuarioService } from './usuario/services/usuario.service';
import { ClimaService } from './clima/services/clima.service';
import { VerUsuarioComponent } from './usuario/ver-usuario/ver-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PantallaInicioComponent,
    ClimaComponent,
    VerUsuarioComponent,
    EditarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    RegistroService,
    UsuarioService,
    ClimaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
