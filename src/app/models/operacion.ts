export class Operacion{
  _id?: string;
  idOperacion_PK?: string;
  fechaRegistro: string;
  hora: string;
  tipoOperacion: string;
  usuario_idUsuario: string;
  
  constructor(idOperacion_PK: string,fechaRegistro: string,hora: string,tipoOperacion: string,usuario_idUsuario: string){
      this.idOperacion_PK = idOperacion_PK;
      this.fechaRegistro=fechaRegistro;
      this.hora=hora;
      this.tipoOperacion=tipoOperacion;
      this.usuario_idUsuario=usuario_idUsuario;
      
  }
}
