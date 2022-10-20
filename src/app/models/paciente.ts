export class Paciente {
    _id?: number;
    nombre: string;
    apellidoP: string;
    apellidoM: string;
    seguro: string;
    correo: string;
    nacimiento: string;
    curp: string;
    password: string;
    fecha: string;

    constructor(nombre: string,apellidoP: string, apellidoM: string, seguro: string, correo: string, nacimiento: string, curp: string, password: string, fecha: string){
        this.nombre = nombre;
        this.apellidoP = apellidoP;
        this.apellidoM = apellidoM;
        this.seguro = seguro;
        this.correo = correo;
        this.nacimiento = nacimiento;
        this.curp = curp;
        this.password = password;
        this.fecha = fecha;
    }
}