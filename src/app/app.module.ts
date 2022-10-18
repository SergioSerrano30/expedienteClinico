import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
//Componentes
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TransparenciaComponent } from './components/transparencia/transparencia.component';
import { RegistroPComponent } from './components/registro-p/registro-p.component';
import { RegistroDComponent } from './components/registro-d/registro-d.component';
import { LoginDComponent } from './components/login-d/login-d.component';
import { DInicioComponent } from './components/d-inicio/d-inicio.component';
import { PInicioComponent } from './components/p-inicio/p-inicio.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { NuevoExpedienteComponent } from './components/nuevo-expediente/nuevo-expediente.component';
import { EditarExpedienteComponent } from './components/editar-expediente/editar-expediente.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    RegistroComponent,
    AboutUsComponent,
    TransparenciaComponent,
    RegistroPComponent,
    RegistroDComponent,
    LoginDComponent,
    DInicioComponent,
    PInicioComponent,
    ChatBotComponent,
    NuevoExpedienteComponent,
    EditarExpedienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
