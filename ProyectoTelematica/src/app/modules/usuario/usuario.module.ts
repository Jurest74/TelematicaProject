import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UsuarioModule {

        usuarios:[{
          _id: string,
          nombre: string,
          edad: string,
          ciudad: string,
          direccion: string,
          email: string
        }]

        constructor(){

      }
       }
