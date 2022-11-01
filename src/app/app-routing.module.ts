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
import { NuevaHistoriaComponent } from './components/nueva-historia/nueva-historia.component';

const routes: Routes = [
  // Principal:
  { path: 'principal', component: PrincipalComponent },
  { path: 'conocenos', component: AboutUsComponent },
  { path: 'transparencia', component: TransparenciaComponent },

  // Paciente:
  { path: 'paciente_login', component: LoginComponent },
  { path: 'paciente_lista/:id', component: TInicioComponent },
  { path: 'paciente_inicio/:id', component: PInicioComponent },
  { path: 'paciente_registro/:id', component: RegistroPacienteComponent },
  { path: 'paciente_editar/:id/:idUM', component: RegistroPacienteComponent },
  
  // Terapeuta:
  { path: 'terapeuta_lista/:id', component: InicioAdminTComponent },
  { path: 'registro_terapeuta/:id', component: RegistroDComponent },
  { path: 'editar_terapeuta/:id/:idUM', component: RegistroDComponent },
  { path: 'terapeuta_login', component: LoginDComponent },
  { path: 'terapeuta_inicio/:id', component: TerapeutaComponent },
  { path: 'nueva_historia', component:NuevaHistoriaComponent},
  // Administrador
  { path: 'admin_inicio/:id', component: InicioAdminComponent },

  //Ruta alterna
  { path: '**', redirectTo: 'terapeuta_login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
