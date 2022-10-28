export class Domicilio{
    _id?: string;
    idDomicilio_PK: number;
    calle: string;
    numero_EXT: string;
    numero_INT: string;
    colonia: string;
    entrecalle1: string;
    entrecalle2: string;
    referencia: string;
    pais: string;
    estado: string;
    municipio:string
    constructor(idDomicilio_PK: number,calle: string,numero_EXT: string,numero_INT: string,colonia: string,entrecalle1: string,entrecalle2: string,referencia: string,pais: string,estado: string,municipio:string){
        this.idDomicilio_PK = idDomicilio_PK;
        this.calle=calle;
        this.numero_EXT=numero_EXT;
        this.numero_INT=numero_INT;
        this.colonia=colonia;
        this.entrecalle1=entrecalle1;
        this.entrecalle2=entrecalle2;
        this.referencia=referencia;
        this.pais=pais;
        this.estado=estado;
        this.municipio=municipio;
    }
}