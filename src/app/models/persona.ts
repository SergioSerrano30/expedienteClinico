export class Persona {

        _id?: string;
        idPersona_PK?: number;
        nombre: string;
        apPaterno: string;
        apMaterno: string;
        fechaNac: string;
        sexo: string;
        persona_domicilio?:
          {
            _id?: string
            idDomicilio_PK?: number
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
          }
          constructor(idPersona_PK: number,nombre: string,apPaterno: string,apMaterno: string,fechaNac: string,sexo: string,
            persona_domicilio:{},idDomicilio_PK: number,calle: string,numero_EXT: string,numero_INT: string,colonia: string,entrecalle1: string,entrecalle2: string,referencia: string,pais: string,estado: string,municipio: string){
                this.idPersona_PK = idPersona_PK;
                this.nombre = nombre;
                this.apPaterno = apPaterno;
                this.apMaterno = apMaterno;
                this.fechaNac = fechaNac;
                this.sexo = sexo;
                this.persona_domicilio = {idDomicilio_PK,calle,numero_EXT,numero_INT,colonia,entrecalle1,entrecalle2,referencia,pais,estado,municipio}
          }
}