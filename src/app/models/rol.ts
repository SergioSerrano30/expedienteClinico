export class Rol{
    _id?: string;
    idRol_PK: number;
    desRol: string;
    constructor(idRol_PK: number, desRol: string){
        this.idRol_PK = idRol_PK
        this.desRol = desRol
    }
}