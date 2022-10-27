import { Usuario_Rol } from "./usuario_rol";

export class Usuario {
  _id?: number;
  usuario: string;
  password: string;
  activo: string;
//   idRol_PK: number;
//   desRol: string;
  usuario_rol: {
    _id?: string;
    idRol_PK: number;
    desRol: string;
  };

  constructor(usuario: string, password: string, activo: string,usuario_rol:Usuario_Rol) {
    this.usuario = usuario;
    this.password = password;
    this.activo = activo;
    // this.idRol_PK = idRol_PK;
    // this.desRol = desRol;
    this.usuario_rol = usuario_rol;
  }
  
}
