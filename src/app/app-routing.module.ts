import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TInicioComponent } from './components/paciente_lista/paciente_lista.component';
import { LoginDComponent } from './components/terapeuta_login/terapeuta_login.component';
import { LoginComponent } from './components/paciente_login/paciente_login.component';
import { PInicioComponent } from './components/paciente_inicio/paciente_inicio.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { TransparenciaComponent } from './components/transparencia/transparencia.component';
import { RegistroPacienteComponent } from './components/paciente_registro/paciente_registro.component';
import { TerapeutaComponent } from './components/terapeuta_inicio/terapeuta_inicio.component';
import { InicioAdminTComponent } from './components/terapeuta_lista/terapeuta_lista.component';
import { RegistroDComponent } from './components/terapeuta_registro/terapeuta_registro.component';
import { InicioAdminComponent } from './components/admin_inicio/admin_inicio.component';
import { NuevaHistoriaComponent } from './components/historia_registro/historia_registro.component';
import { ConsultaRegistrarComponent } from './components/consulta-registrar/consulta-registrar.component';
import { AdminOperacionesComponent } from './components/admin_operaciones/admin_operaciones.component';
import { PacienteConsultasComponent } from './components/paciente-consultas/paciente-consultas.component';
import { TerapeutaConsultasComponent } from './components/terapeuta-consultas/terapeuta-consultas.component';
import { HistoriaListaComponent } from './components/historia-lista/historia-lista.component';

const routes: Routes = [
  // Principal:
  { path: 'principal', component: PrincipalComponent },
  { path: 'conocenos', component: AboutUsComponent },
  { path: 'transparencia', component: TransparenciaComponent },

  // Paciente:
  { path: 'paciente_login', component: LoginComponent },
  { path: 'paciente_inicio/:id', component: PInicioComponent },
  { path: 'paciente_lista/:id', component: TInicioComponent },
  { path: 'paciente_registro/:id', component: RegistroPacienteComponent },
  { path: 'paciente_editar/:id/:idUM', component: RegistroPacienteComponent },
  { path: 'paciente_consultas/:id/:idH', component: PacienteConsultasComponent },

  // Terapeuta:
  { path: 'terapeuta_login', component: LoginDComponent },
  { path: 'terapeuta_inicio/:id', component: TerapeutaComponent },
  { path: 'terapeuta_consultas/:id', component: TerapeutaConsultasComponent },

  { path: 'terapeuta_lista/:id', component: InicioAdminTComponent },
  { path: 'terapeuta_registro/:id', component: RegistroDComponent },
  { path: 'terapeuta_editar/:id/:idUM', component: RegistroDComponent },

  // Administrador
  { path: 'admin_inicio/:id', component: InicioAdminComponent },
  { path: 'admin_operaciones/:id', component: AdminOperacionesComponent },

  //Historia paciente
  { path: 'historia_registro/:id/:idPAC', component:NuevaHistoriaComponent},
  { path: 'historia_editar/:id/:idPAC/:idHM', component:NuevaHistoriaComponent},
  { path: 'historia_lista/:id/:idPAC', component:HistoriaListaComponent},
  { path: 'historia_lista/:id/:idPAC/:todas', component:HistoriaListaComponent},

  //Consulta paciente
  { path: 'consulta_registro/:id/:idH', component:ConsultaRegistrarComponent},
  { path: 'consulta_editar/:id/:idH/:idCM', component:ConsultaRegistrarComponent},

  //Ruta alterna
  { path: '**', redirectTo: 'terapeuta_login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
