export class Doctor {
    _id?: number;
    nombre: string;
    apellidoP: string;
    apellidoM: string;
    correoE: string;
    password: string;
    fechaN: string;

    constructor(nombre: string,apellidoP: string, apellidoM: string, correoE: string, password: string, fechaN: string){
        this.nombre = nombre;
        this.apellidoP = apellidoP;
        this.apellidoM = apellidoM;
        this.correoE = correoE;
        this.password = password;
        this.fechaN = fechaN;
    }
}