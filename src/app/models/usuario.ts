
export class Usuario {
  _id?: number;
  usuario: string;
  password: string;
  activo: string;
  usuario_rol: [{
    _id?: string;
    idRol_PK: number;
    desRol: string;
  }]
  usuario_persona: [{
    _id?: string
    idPersona_PK: number,
    nombre: string, 
    apPaterno: string,
    apMaterno: string,
    fechaNac: string,
    sexo: string,
    persona_domicilio:
      [{
        _id?: string
        calle: string,
        numero_EXT: string,
        numero_INT: string,
        colonia: string,
        entrecalle1: string,
        entrecalle2: string,
        referencia: string,
        pais: string,
        estado: string,
        municipio: string
        
      }]
  }]

  constructor(usuario: string, password: string, activo: string,
    usuario_rol:[],idRol_PK: number, desRol: string,
    usuario_persona:[],idPersona_PK: number, nombre: string, apPaterno: string,apMaterno: string, fechaNac: string, sexo: string,
    persona_domicilio:[],calle: string, numero_EXT: string, numero_INT: string, colonia: string,entrecalle1: string,entrecalle2: string,referencia: string,pais: string,estado: string,municipio: string) {
    this.usuario = usuario;
    this.password = password;
    this.activo = activo;
    this.usuario_rol = [{idRol_PK,desRol}];
    
    this.usuario_persona =[{idPersona_PK,nombre,apPaterno,apMaterno,fechaNac,sexo,
      persona_domicilio:[{calle,numero_EXT,numero_INT,colonia,entrecalle1,entrecalle2,referencia,pais,estado,municipio}]
  }];
  }
  
}
