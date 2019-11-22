import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LoginModule} from '../modules/login/login.module';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user:LoginModule;

  private url = 'vasoyasociados.tk:8080';

  constructor(private http: HttpClient) { }

 postLogin(usuario:LoginModule){
   return this.http.post(`${this.url}/api/usuarios/login`,usuario);
 }

private crearArregloUsuarios(usuariosObj:object){

    let usuarios;

    if (usuariosObj === null){return [];}

       usuarios = usuariosObj;

  return usuarios;
  }

}
