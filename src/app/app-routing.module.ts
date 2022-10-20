import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { DInicioComponent } from './components/d-inicio/d-inicio.component';
import { DashboardDoctorComponent } from './components/dashboard-doctor/dashboard-doctor.component';
import { EditarExpedienteComponent } from './components/editar-expediente/editar-expediente.component';
import { LoginDComponent } from './components/login-d/login-d.component';
import { LoginComponent } from './components/login/login.component';
import { NuevoExpedienteComponent } from './components/nuevo-expediente/nuevo-expediente.component';
import { PInicioComponent } from './components/p-inicio/p-inicio.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistroDComponent } from './components/registro-d/registro-d.component';
import { RegistroPComponent } from './components/registro-p/registro-p.component';
import { RegistroComponent } from './components/registro/registro.component';
import { TransparenciaComponent } from './components/transparencia/transparencia.component';

const routes: Routes = [
  { path: 'principal', component: PrincipalComponent},
  { path: 'login', component: LoginComponent},
  { path: 'loginD', component: LoginDComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'conocenos', component: AboutUsComponent},
  { path: 'transparencia', component: TransparenciaComponent},
  { path: 'registroP', component: RegistroPComponent},
  { path: 'registroD', component: RegistroDComponent},
  { path: 'doctor-inicio', component: DInicioComponent},
  { path: 'paciente-inicio', component: PInicioComponent},
  { path: 'chatBot', component: ChatBotComponent},
  { path: 'nuevo-expediente', component: NuevoExpedienteComponent},
  { path: 'editar-expediente/:id', component: EditarExpedienteComponent},

  { path: 'dashboard-doctor', component: DashboardDoctorComponent},
  
  {path: '**', redirectTo: 'doctor-inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
