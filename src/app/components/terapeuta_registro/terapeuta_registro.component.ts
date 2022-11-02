import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { Domicilio } from 'src/app/models/domicilio';
import { DomicilioService } from 'src/app/services/domicilio.service';

@Component({
  selector: 'app-registro-d',
  templateUrl: './terapeuta_registro.component.html',
  styleUrls: ['./terapeuta_registro.component.css'],
})
export class RegistroDComponent implements OnInit {
  usuarioForm: FormGroup;
  titulo = 'Registrar Terapeuta';
  id: string;
  idUM: string;
  usuario: Usuario | null;
  nombre: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService,
    private _personaService: PersonaService,
    private _domicilioService: DomicilioService,
    private aRouter: ActivatedRoute
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apPaterno: ['', Validators.required],
      apMaterno: ['', Validators.required],
      fechaNac: ['', Validators.required],
      sexo: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      calle: ['', Validators.required],
      numero_EXT: ['', Validators.required],
      numero_INT: ['', Validators.required],
      colonia: ['', Validators.required],
      entrecalle1: ['', Validators.required],
      entrecalle2: ['', Validators.required],
      referencia: ['', Validators.required],
      municipio: ['', Validators.required],
      estado: ['', Validators.required],
      pais: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.idUM = this.aRouter.snapshot.paramMap.get('idUM') + '';
    this.usuario = null;
    this.nombre = '';
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    if (this.idUM.length > 5) {
      this.esEditar();
    }
  }
  passFormatoCorrecto(password: string) {
    //6 a 45 caracteres
    //Una mayuscula al menos
    //Una minuscula al menos
    //Un numero al menos
    var regularExpression =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,45}$/;
    if (password.match(regularExpression)) {
      return true;
    } else {
      return false;
    }
  }

  obtenerUsuario() {
    if (this.id !== '') {
      this._usuarioService.obtenerUsuario(this.id).subscribe((data) => {
        //console.log(data);
        //console.log(data.usuario_persona.nombre);
        this.usuario = data;
        this.nombre = this.usuario?.usuario_persona.nombre + '';
      });
    }
  }
  guardarTerapeuta() {
    let act = 'S';
    let idRol_PK = 2;
    let desRol = 'Terapeuta';
    let usuario = this.usuarioForm.get('usuario')?.value;
    let password = this.usuarioForm.get('password')?.value;
    let nombre = this.usuarioForm.get('nombre')?.value;
    let apPaterno = this.usuarioForm.get('apPaterno')?.value;
    let apMaterno = this.usuarioForm.get('apMaterno')?.value;
    let fechaNac = this.usuarioForm.get('fechaNac')?.value;
    let sexo = this.usuarioForm.get('sexo')?.value;
    let calle = this.usuarioForm.get('calle')?.value;
    let numero_EXT = this.usuarioForm.get('numero_EXT')?.value;
    let numero_INT = this.usuarioForm.get('numero_INT')?.value;
    let colonia = this.usuarioForm.get('colonia')?.value;
    let entrecalle1 = this.usuarioForm.get('entrecalle1')?.value;
    let entrecalle2 = this.usuarioForm.get('entrecalle2')?.value;
    let referencia = this.usuarioForm.get('referencia')?.value;
    let pais = this.usuarioForm.get('pais')?.value;
    let estado = this.usuarioForm.get('estado')?.value;
    let municipio = this.usuarioForm.get('municipio')?.value;
    const DOMICILIO: Domicilio = {
      calle: calle,
      numero_EXT: numero_EXT,
      numero_INT: numero_INT,
      colonia: colonia,
      entrecalle1: entrecalle1,
      entrecalle2: entrecalle2,
      referencia: referencia,
      pais: pais,
      estado: estado,
      municipio: municipio,
    };
    const PERSONA: Persona = {
      nombre: nombre,
      apPaterno: apPaterno,
      apMaterno: apMaterno,
      fechaNac: fechaNac,
      sexo: sexo,
      persona_domicilio: {
        calle: calle,
        numero_EXT: numero_EXT,
        numero_INT: numero_INT,
        colonia: colonia,
        entrecalle1: entrecalle1,
        entrecalle2: entrecalle2,
        referencia: referencia,
        pais: pais,
        estado: estado,
        municipio: municipio,
      },
    };

    const USUARIO: Usuario = {
      usuario: usuario,
      password: password,
      activo: act,
      usuario_rol: { idRol_PK, desRol },
      usuario_persona: {
        nombre,
        apPaterno,
        apMaterno,
        fechaNac,
        sexo,
        persona_domicilio: {
          calle: calle,
          numero_EXT: numero_EXT,
          numero_INT: numero_INT,
          colonia: colonia,
          entrecalle1: entrecalle1,
          entrecalle2: entrecalle2,
          referencia: referencia,
          pais: pais,
          estado: estado,
          municipio: municipio,
        },
      },
    };
    if (this.passFormatoCorrecto(password)) {
      if (this.idUM.length > 5) {
        //editamos
        this._usuarioService.editarUsuario(this.idUM, USUARIO).subscribe(
          (data) => {
            this.toastr.info(
              'Terapeuta modificado con éxito!',
              'Terapeuta Actualizada!'
            );
            this.router.navigate(['/terapeuta_lista/' + this.id]);
          },
          (error) => {
            console.log(error);
            this.usuarioForm.reset();
          }
        );
      } else {
        //guardamos
        this.guardarPersona(PERSONA, DOMICILIO);
        this._usuarioService.guardarUsuario(USUARIO).subscribe((data) => {
          this.toastr.success(
            'Se ha guardado el terapeuta con éxito!',
            'Paciente registrado!'
          );
          this.router.navigate(['/terapeuta_lista/' + this.id]);
        });
      }
    }
    else{
      this.toastr.warning(
      '-6 a 45 caracteres   '+
      '-Al menos una mayuscula   '+
      '-Al menos una minuscula   '+
      '-Al menos un número   ',
        'Formato incorrecto en contraseña!',{
          timeOut: 8000,
          progressBar:true
        });
      
    }
  }
  esEditar() {
    this.titulo = 'Editar Terapeuta';
    this._usuarioService.obtenerUsuario(this.idUM).subscribe((data) => {
      this.usuarioForm.setValue({
        nombre: data.usuario_persona.nombre,
        apPaterno: data.usuario_persona.apMaterno,
        apMaterno: data.usuario_persona.apPaterno,
        fechaNac: data.usuario_persona.fechaNac,
        sexo: data.usuario_persona.sexo,
        usuario: data.usuario,
        password: data.password,
        calle: data.usuario_persona.persona_domicilio.calle,
        numero_EXT: data.usuario_persona.persona_domicilio.numero_EXT,
        numero_INT: data.usuario_persona.persona_domicilio.numero_INT,
        colonia: data.usuario_persona.persona_domicilio.colonia,
        entrecalle1: data.usuario_persona.persona_domicilio.entrecalle1,
        entrecalle2: data.usuario_persona.persona_domicilio.entrecalle2,
        referencia: data.usuario_persona.persona_domicilio.referencia,
        municipio: data.usuario_persona.persona_domicilio.municipio,
        estado: data.usuario_persona.persona_domicilio.estado,
        pais: data.usuario_persona.persona_domicilio.pais,
      });
    });
  }
  guardarPersona(per: Persona, dom: Domicilio) {
    //console.log(per);
    this.guardarDomicilio(dom);
    this._personaService.guardarPersona(per).subscribe((data) => {
      this.toastr.success(
        'Se ha guardado la persona con éxito!',
        'Persona registrado!'
      );
      //this.router.navigate(['/terapeuta-inicio']);
    });
  }
  guardarDomicilio(dom: Domicilio) {
    //console.log(dom);
    this._domicilioService.guardarDomicilio(dom).subscribe((data) => {
      this.toastr.success(
        'Se ha guardado el domicilio con éxito!',
        'Domicilio registrado!'
      );
      //this.router.navigate(['/terapeuta-inicio']);
    });
  }
  irInicio() {
    let rol = this.usuario?.usuario_rol.desRol;
    switch (rol) {
      case 'Paciente':
        this.router.navigate(['/paciente_inicio/' + this.id]);
        break;
      case 'Administrador':
        this.router.navigate(['/admin_inicio/' + this.id]);
        break;
      case 'Terapeuta':
        this.router.navigate(['/terapeuta_inicio/' + this.id]);
        break;

      default:
        break;
    }
  }
}
