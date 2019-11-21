import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UsuarioModule} from '../modules/usuario/usuario.module';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  user:UsuarioModule;

  private url = 'https://vaso-rest.herokuapp.com';

  constructor(private http: HttpClient) { }

  getUsuarios(){
  return this.http.get(`${this.url}/api/usuarios/`)
  .pipe(
    map(this.crearArregloUsuarios)
  )
}

 postUsuarios(usuario:UsuarioModule){
   return this.http.post(`${this.url}/api/usuarios`,usuario);
 }

private crearArregloUsuarios(usuariosObj:object){

    let usuarios;

    if (usuariosObj === null){return [];}

       usuarios = usuariosObj;

  return usuarios;
  }

}
