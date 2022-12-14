export class Consulta{
  _id?: string;
  idConsulta_Paciente?: string;
  idConsulta_PacientePK?: string;
  numConsulta:String;
  descripcion: string;
  ejerciciosCasa: string;
  fechaRegistro:string;
  horaRegistro: string;
  estatus: string;
  idHistoria: string;
  usuarios_idUsuario: string;

  
  constructor(idConsulta_Paciente: string,idConsulta_PacientePK: string,numConsulta: string,descripcion: string, ejerciciosCasa: string,
    fechaRegistro:string,horaRegistro: string, estatus: string,  idHistoria: string,usuarios_idUsuario: string){
      this.idConsulta_Paciente = idConsulta_Paciente;
      this.idConsulta_PacientePK=idConsulta_PacientePK;
      this.numConsulta=numConsulta;
      this.descripcion=descripcion;
      this.ejerciciosCasa=ejerciciosCasa;
      this.fechaRegistro=fechaRegistro;
      this.estatus = estatus;
      this.horaRegistro=horaRegistro;
      this.idHistoria=idHistoria;
      this.usuarios_idUsuario=usuarios_idUsuario;
  }
}
