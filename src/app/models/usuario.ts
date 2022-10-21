export class Usuario {
    _id?: number;
    usuario: string;
    password: string;
    activo: string;

    constructor(usuario: string, password: string, activo: string){
        this.usuario = usuario;
        this.password = password;
        this.activo = activo;
    }
}