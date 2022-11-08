export class Operacion{
  _id?: string;
  idOperacion_PK?: number;
  fechaRegistro: string;
  hora: string;
  tipoOperacion: string;
  usuarios_idUsuario: string;
  
  constructor(idOperacion_PK: number,fechaRegistro: string,hora: string,tipoOperacion: string,usuarios_idUsuario: string){
      this.idOperacion_PK = idOperacion_PK;
      this.fechaRegistro=fechaRegistro;
      this.hora=hora;
      this.tipoOperacion=tipoOperacion;
      this.usuarios_idUsuario=usuarios_idUsuario;
      
  }
}
