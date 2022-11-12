export class Historia{
  _id?: string;
  idHistoria_PK?: string;

  problematica:string;

  fecRegistro: string;
  fecNacimiento:String;

  peso: string;
  estatura: string;
  emeNombre: string;
  emeParentesco: string;
  emeCelular: string;
  alergias: string;
  cirugias: string;
  traFracturas: string;
  enfCongenitas: string;
  enfHereditarias: string;
  otros: string;
  observaciones: string;
  numConsultasTotales: string;
  estatus:string;
  usuarios_idTerapeuta: string;
  usuarios_idPaciente: string;

  constructor(idHistoria_PK: string,problematica: string,fecRegistro: string,fecNacimiento: string,estatura: string,peso: string,  emeNombre: string,
    emeParentesco: string,emeCelular: string,alergias: string,cirugias: string,traFracturas: string, enfCongenitas: string,enfHereditarias: string,otros: string
    ,observaciones: string,numConsultasTotales: string,estatus:string, usuarios_idTerapeuta: string,usuarios_idPaciente: string){
      this.idHistoria_PK = idHistoria_PK;
      this.problematica=problematica;
      this.fecRegistro=fecRegistro;
      this.fecNacimiento=fecNacimiento;

      this.peso=peso;
      this.emeNombre=emeNombre;
      this.estatura=estatura;
      this.emeParentesco=emeParentesco;
      this.emeCelular=emeCelular;
      this.alergias=alergias;
      this.cirugias=cirugias;
      this.traFracturas=traFracturas;
      this.enfCongenitas=enfCongenitas;
      this.enfHereditarias=enfHereditarias;
      this.otros=otros;
      this.observaciones=observaciones;
      this.numConsultasTotales=numConsultasTotales;

      this.estatus=estatus;
      this.usuarios_idTerapeuta=usuarios_idTerapeuta;
      this.usuarios_idPaciente=usuarios_idPaciente;
      
  }
}
