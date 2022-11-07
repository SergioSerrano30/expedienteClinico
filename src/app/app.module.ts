import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { LoginComponent } from './components/paciente_login/paciente_login.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TransparenciaComponent } from './components/transparencia/transparencia.component';
import { RegistroDComponent } from './components/terapeuta_registro/terapeuta_registro.component';
import { LoginDComponent } from './components/terapeuta_login/terapeuta_login.component';
import { TInicioComponent } from './components/paciente_lista/paciente_lista.component';
import { PInicioComponent } from './components/paciente_inicio/paciente_inicio.component';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { InicioAdminComponent } from './components/admin_inicio/admin_inicio.component';
import { RegistroPacienteComponent } from './components/paciente_registro/paciente_registro.component';
import { TerapeutaComponent } from './components/terapeuta_inicio/terapeuta_inicio.component';
import { InicioAdminTComponent } from './components/terapeuta_lista/terapeuta_lista.component';
import { NuevaHistoriaComponent } from './components/nueva-historia/nueva-historia.component';
import { ConsultaRegistrarComponent } from './components/consulta-registrar/consulta-registrar.component';
import { AdminOperacionesComponent } from './components/admin-operaciones/admin-operaciones.component';




@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    AboutUsComponent,
    TransparenciaComponent,
    RegistroDComponent,
    LoginDComponent,
    TInicioComponent,
    PInicioComponent,
    InicioAdminComponent,
    RegistroPacienteComponent,
    TerapeutaComponent,
    InicioAdminTComponent,
    NuevaHistoriaComponent,
    ConsultaRegistrarComponent,
    AdminOperacionesComponent,
    

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AuthModule.forRoot({
      domain: 'dev-rohwjf2k.us.auth0.com',
      clientId: 'XKDz2na0oENKC7lluWKjfT3W6u2OtvI0'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
