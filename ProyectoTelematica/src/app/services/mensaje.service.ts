import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MensajeModule} from '../modules/mensaje/mensaje.module';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  user:MensajeModule;

  private url = 'vasoyasociados.tk:8080';

  constructor(private http: HttpClient) { }

 postMensaje(mensaje:MensajeModule){
   return this.http.post(`${this.url}/api/comentarios`,mensaje);
 }

}
