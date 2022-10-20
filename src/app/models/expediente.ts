export class Expediente {
    _id?: number;
    curp: string;
    peso: string;
    altura: string;
    presion: string;
    padecimiento: string;
    medicacion: string;
    doctor: string;
    fecha: string;

    constructor(curp: string,peso: string, altura: string, presion: string, padecimiento: string, medicacion: string, doctor: string, fecha: string){
        this.curp = curp;
        this.peso = peso;
        this.altura = altura;
        this.presion = presion;
        this.padecimiento = padecimiento;
        this.medicacion = medicacion;
        this.doctor = doctor;
        this.fecha = fecha;
    }
}