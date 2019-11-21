import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms'

import { UsuarioService } from '../../services/usuario.service';

import {UsuarioModule} from '../../modules/usuario/usuario.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

usuario:Object={
  email:null,
  password:null,
}

registro:Object={
  nombre:null,
  edad:null,
  ciudad:null,
  direccion:null,
  email:null,
  password:null,
  casilla:Boolean
}

FormularioLLeno=false;
ErroEmail=false;
RegistroConExito=false;

  error: any;

  usuarios: UsuarioModule[]=[];

  constructor(private router: Router, private usuarioService:UsuarioService) {  }

  ngOnInit() {

    this.usuarioService.getUsuarios().subscribe(resp=>{
      console.log(resp);
      this.usuarios =resp;
    }, error => this.error = error)

  }

  cerrar(form:NgForm){
    this.FormularioLLeno=false;
    this.ErroEmail=false;
    this.RegistroConExito=false;
    form.reset();
  }

  login(form:NgForm){
    if(form.invalid){
      console.log(form);
      console.log("user", this.usuario);
      return;
    }
   console.log(form);
    this.router.navigate(['/home']);
  }

  registrar(form:NgForm){
    if(form.invalid){
      console.log(form);
      console.log("Invalido");

      form.reset();
      if (!form.dirty){
        this.FormularioLLeno = true;
      }
    }
   console.log(form);
      console.log("valido");
      console.log("formulario enviado: ",form.value);
      this.usuarioService.postUsuarios(form.value).subscribe(resp =>{
        console.log(resp);
        if(resp){

          this.RegistroConExito=true;
          this.FormularioLLeno=false;
          this.ErroEmail=false;
        }
        // (<any>$('#ModalRegistro')).modal('hide');
         form.reset();
      }, (err) =>{
        if(err.error.err.message=="Usuario validation failed: email: email debe ser único"){
          this.ErroEmail=true;
        }
        console.log("El error es: ",err);
        console.log("El error es: ",err.error.err.message);
      });

  }
}
