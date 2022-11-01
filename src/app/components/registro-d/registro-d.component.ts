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
  templateUrl: './registro-d.component.html',
  styleUrls: ['./registro-d.component.css']
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
    private aRouter:ActivatedRoute
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
    this.id=this.aRouter.snapshot.paramMap.get('id')+'';
    this.idUM=this.aRouter.snapshot.paramMap.get('idUM')+'';
    this.usuario = null;
    this.nombre = '';
  }
 
  ngOnInit(): void {
    this.obtenerUsuario();
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
    let calle =this.usuarioForm.get('calle')?.value
    let numero_EXT = this.usuarioForm.get('numero_EXT')?.value
    let numero_INT = this.usuarioForm.get('numero_INT')?.value
    let colonia = this.usuarioForm.get('colonia')?.value
    let entrecalle1 = this.usuarioForm.get('entrecalle1')?.value
    let entrecalle2 = this.usuarioForm.get('entrecalle2')?.value
    let referencia = this.usuarioForm.get('referencia')?.value
    let pais = this.usuarioForm.get('pais')?.value
    let estado = this.usuarioForm.get('estado')?.value
    let municipio = this.usuarioForm.get('municipio')?.value
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
    
    //console.log(USUARIO);
    this.guardarPersona(PERSONA,DOMICILIO);
    this._usuarioService.guardarUsuario(USUARIO).subscribe(data =>{
      this.toastr.success('Se ha guardado el paciente con éxito!', 'Paciente registrado!');
      this.router.navigate(['/inicio-admin-t/'+this.id]);
    })
  }
  guardarPersona(per:Persona,dom:Domicilio) {

    //console.log(per);
    this.guardarDomicilio(dom);
    this._personaService.guardarPersona(per).subscribe(data =>{
      this.toastr.success('Se ha guardado la persona con éxito!', 'Persona registrado!');
      //this.router.navigate(['/terapeuta-inicio']);
    })
  }
  guardarDomicilio(dom:Domicilio) {
    //console.log(dom);
    this._domicilioService.guardarDomicilio(dom).subscribe(data =>{
      this.toastr.success('Se ha guardado el domicilio con éxito!', 'Domicilio registrado!');
      //this.router.navigate(['/terapeuta-inicio']);
    })
    
  }
}
