export class Historia{
  _id?: string;
  idHistoria_PK?: string;
  problema: string;
  fechaRegistro: string;
  fechaNacimiento:String;
  edad: string;
  peso: string;
  estatura: string;
  emeNombre: string;
  emeParentesco: string;
  emeCelular: string;
  alergias: string;
  cirugias: string;
  traumasFracturas: string;
  enfCongenitas: string;
  enfHereditarias: string;
  otros: string;
  observaciones: string;
  numConsultasTotales: string;
  usuario_idUsuario: string;
  persona_idPersona: string;
  
  constructor(idHistoria_PK: string,problema:string,fechaRegistro: string,fechaNacimiento: string,estatura: string, edad: string,peso: string,  emeNombre: string,
    emeParentesco: string,emeCelular: string,alergias: string,cirugias: string,traumasFracturas: string, enfCongenitas: string,enfHereditarias: string,otros: string
    ,observaciones: string,numConsultasTotales: string,usuario_idUsuario: string,persona_idPersona: string){
      this.idHistoria_PK = idHistoria_PK;
      this.problema = problema;
      this.fechaRegistro=fechaRegistro;
      this.fechaNacimiento=fechaNacimiento;
      this.edad=edad;
      this.peso=peso;
      this.emeNombre=emeNombre;
      this.estatura=estatura;
      this.emeParentesco=emeParentesco;
      this.emeCelular=emeCelular;
      this.alergias=alergias;
      this.cirugias=cirugias;
      this.traumasFracturas=traumasFracturas;
      this.enfCongenitas=enfCongenitas;
      this.enfHereditarias=enfHereditarias;
      this.otros=otros;
      this.observaciones=observaciones;
      this.numConsultasTotales=numConsultasTotales;
      this.usuario_idUsuario=usuario_idUsuario;
      this.persona_idPersona=persona_idPersona;
      
  }
}
