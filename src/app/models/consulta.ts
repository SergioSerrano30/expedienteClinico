export class Consulta{
  _id?: string;
  idConsulta_Paciente?: string;
  idConsulta_PacientePK?: number;
  numConsulta:String;
  descripcion: string;
  ejerciciosCasa: string;
  horaRegistro: string;
  historias_Pacientes_idHistoria_PacientePK: string;
  usuarios_idUsuario: string;

  
  constructor(idConsulta_Paciente: string,idConsulta_PacientePK: number,numConsulta: string,descripcion: string, ejerciciosCasa: string,
    horaRegistro: string,  historias_Pacientes_idHistoria_PacientePK: string,usuarios_idUsuario: string){
      this.idConsulta_Paciente = idConsulta_Paciente;
      this.idConsulta_PacientePK=idConsulta_PacientePK;
      this.numConsulta=numConsulta;
      this.descripcion=descripcion;
      this.ejerciciosCasa=ejerciciosCasa;
      this.horaRegistro=horaRegistro;
      this.historias_Pacientes_idHistoria_PacientePK=historias_Pacientes_idHistoria_PacientePK;
      this.usuarios_idUsuario=usuarios_idUsuario;
  }
}
