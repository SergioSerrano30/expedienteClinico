import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { TInicioComponent as TInicioComponent } from './components/t-inicio/t-inicio.component';
import { DashboardDoctorComponent } from './components/dashboard-doctor/dashboard-doctor.component';
import { EditarExpedienteComponent } from './components/editar-expediente/editar-expediente.component';
import { LoginDComponent } from './components/login-d/login-d.component';
import { LoginComponent } from './components/login/login.component';
import { NuevoExpedienteComponent } from './components/nuevo-expediente/nuevo-expediente.component';
import { PInicioComponent } from './components/p-inicio/p-inicio.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistroDComponent } from './components/registro-d/registro-d.component';
import { RegistroComponent } from './components/registro/registro.component';
import { TransparenciaComponent } from './components/transparencia/transparencia.component';
import { InicioAdminComponent } from './components/inicio-admin/inicio-admin.component';
import { ModificarPacienteComponent } from './components/modificar-paciente/modificar-paciente.component';
import { RegistroPacienteComponent } from './components/registro-paciente/registro-paciente.component';
import { TerapeutaComponent } from './components/terapeuta/terapeuta.component';
import { ModificarTerapeutaComponent } from './components/modificar-terapeuta/modificar-terapeuta.component';
import { ModificarPacienteTComponent } from './components/modificar-paciente-t/modificar-paciente-t.component';
import { InicioAdminTComponent } from './components/inicio-admin-t/inicio-admin-t.component';

const routes: Routes = [
  // SPRINT 1:
  { path: 'modificar-terapeuta', component: ModificarTerapeutaComponent},
  { path: 'inicio-admin-t', component: InicioAdminTComponent},

  // SPRINT 2:
  { path: 'modificar-paciente-t', component: ModificarPacienteTComponent},

  { path: 'principal', component: PrincipalComponent},
  { path: 'login', component: LoginComponent},
  { path: 'loginD', component: LoginDComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'conocenos', component: AboutUsComponent},
  { path: 'transparencia', component: TransparenciaComponent},
  // { path: 'registroP', component: RegistroPComponent},
  { path: 'registroD', component: RegistroDComponent},

  { path: 'terapeuta-inicio/:id',component:TerapeutaComponent},
  { path: 'terapeuta-inicio-pacientes/:id', component: TInicioComponent},
  { path: 'paciente-inicio/:id', component: PInicioComponent},
 // { path: 'chatBot', component: ChatBotComponent},
  { path: 'nuevo-expediente', component: NuevoExpedienteComponent},
  { path: 'editar-expediente/:id', component: EditarExpedienteComponent},

  { path: 'dashboard-doctor', component: DashboardDoctorComponent},

  { path: 'admin-inicio/:id', component:InicioAdminComponent},
 
  { path: 'registro-paciente',component:RegistroPacienteComponent},

   //ZAMBRANO
   { path: 'modificar-paciente/:id', component:ModificarPacienteComponent},
   { path: 'editar-paciente/:id', component:RegistroPacienteComponent},

   {path: '**', redirectTo: 'terapeuta-inicio', pathMatch: 'full'},

 
  

  {path: '**', redirectTo: 'login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
