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
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TransparenciaComponent } from './components/transparencia/transparencia.component';
import { RegistroDComponent } from './components/registro-d/registro-d.component';
import { LoginDComponent } from './components/login-d/login-d.component';
import { TInicioComponent } from './components/t-inicio/t-inicio.component';
import { PInicioComponent } from './components/p-inicio/p-inicio.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { NuevoExpedienteComponent } from './components/nuevo-expediente/nuevo-expediente.component';
import { EditarExpedienteComponent } from './components/editar-expediente/editar-expediente.component';

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { DashboardDoctorComponent } from './components/dashboard-doctor/dashboard-doctor.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { InicioAdminComponent } from './components/inicio-admin/inicio-admin.component';
import { RegistroPacienteComponent } from './components/registro-paciente/registro-paciente.component';
import { ModificarPacienteComponent } from './components/modificar-paciente/modificar-paciente.component';
import { TerapeutaComponent } from './components/terapeuta/terapeuta.component';
import { ModificarTerapeutaComponent } from './components/modificar-terapeuta/modificar-terapeuta.component';
import { ModificarPacienteTComponent } from './components/modificar-paciente-t/modificar-paciente-t.component';
import { InicioAdminTComponent } from './components/inicio-admin-t/inicio-admin-t.component';



@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    RegistroComponent,
    AboutUsComponent,
    TransparenciaComponent,
    RegistroDComponent,
    LoginDComponent,
    TInicioComponent,
    PInicioComponent,
    ChatBotComponent,
    NuevoExpedienteComponent,
    EditarExpedienteComponent,
    DashboardDoctorComponent,
    GaleriaComponent,
    InicioAdminComponent,
    RegistroPacienteComponent,
    ModificarPacienteComponent,
    TerapeutaComponent,
    ModificarTerapeutaComponent,
    ModificarPacienteTComponent,
    InicioAdminTComponent,

  
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
