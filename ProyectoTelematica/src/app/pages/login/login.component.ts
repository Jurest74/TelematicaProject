import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms'

import { UsuarioService } from '../../services/usuario.service';
import {UsuarioModule} from '../../modules/usuario/usuario.module';

import { LoginService } from '../../services/login.service';
import {LoginModule} from '../../modules/login/login.module';

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
ErroLogin=false;

  error: any;

  usuarios: UsuarioModule[]=[];

  loginUser:LoginModule[]=[];

  constructor(private router: Router, private usuarioService:UsuarioService,
              private loginService:LoginService) {  }

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
      console.log("Invalido");
      form.reset();
      return;
    }
    console.log(form);
       console.log("valido");
       console.log("formulario enviado: ",form.value);
       this.loginService.postLogin(form.value).subscribe(resp =>{
         console.log(resp);
         if(resp){
           console.log("Usuario valido")
           let email = form.value.email;
           let pass = form.value.password;
           this.router.navigate([`/home/${email}`]);
         }
         // (<any>$('#ModalRegistro')).modal('hide');
          form.reset();
       }, (err) =>{
         if(err.error.err.message=="Usuario o (contraseña) incorrectos"){
           this.ErroLogin=true;
           console.log("error: ",err);
         }
         console.log("El error es: ",err);
         console.log("El error es: ",err.error.err.message);
       });
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
