import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray } from '@angular/forms'
import {NgForm} from '@angular/forms'
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

import { MensajeService } from '../../services/mensaje.service';
import {MensajeModule} from '../../modules/mensaje/mensaje.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorpuntaje=false;
  errormensaje=false;
  errorCheck=false;
 ErroEnvio=false;
 enviado = false;

checkoutForm:FormGroup;

  objects = [{
    codigo:1,
    name:"Aceite",
    price:"2000",
    image:"/assets/img/trabajos/1.jpg"
  },
  {
    codigo:2,
    name:"Salsa",
    price:"2000",
    image:"/assets/img/trabajos/2.jpg"
  },
  {
    codigo:3,
    name:"Atun",
    price:"2000",
    image:"/assets/img/trabajos/3.jpg"
  },
  {
    codigo:4,
    name:"Piña",
    price:"2000",
    image:"/assets/img/trabajos/4.jpg"
  },
  {
    codigo:5,
    name:"arroz",
    price:"2000",
    image:"/assets/img/trabajos/5.jpg"
  },
  {
    codigo:6,
    name:"frijol",
    price:"2000",
    image:"/assets/img/trabajos/6.jpg"
  },
  {
    codigo:7,
    name:"lenteja",
    price:"2000",
    image:"/assets/img/trabajos/7.jpg"
  },
  {
    codigo:8,
    name:"huevo",
    price:"2000",
    image:"/assets/img/trabajos/8.jpg"
  }
];

objectsCheck = [];

mensaje={
  emailCliente:null,
  calificacion:null,
  mensaje:null,
  productosSeleccionados:null,
}


  constructor(private formBuilder: FormBuilder, private rutaActiva: ActivatedRoute,
              private mensajeService: MensajeService) {
  }

  ngOnInit() {
    this.mensaje.emailCliente = this.rutaActiva.snapshot.params.email;
  }

  enviar() {
    let puntaje = $("#puntaje option:selected").val();
    let mensaje = $("#mensaje").val();
    let productosselect = this.objectsCheck.toString();
   if(puntaje=="Open this select menu"){
  this.errorpuntaje=true;}
  else if(mensaje==""){console.log("vacio",mensaje);this.errormensaje=true;}
  else if(productosselect==""){this.errorCheck = true}
     else{
       this.errorpuntaje=false;
       this.errormensaje=false;
       this.errorCheck=false;
console.log(mensaje);
this.mensaje.productosSeleccionados = productosselect;
this.mensaje.mensaje=mensaje;
this.mensaje.calificacion=puntaje;
console.log("this ",this.mensaje);
this.mensajeService.postMensaje(this.mensaje).subscribe(resp =>{
  console.log(resp);
  if(resp){
    console.log("Enviado")
    this.enviado = true;
    //document.getElementById("mensaje").value = "";
  }
}, (err) =>{
  console.log("El error es: ",err);
  console.log("El error es: ",err.error.err.message);
});
    }
    }

  onCheckChange(event) {

  /* Selected */
  if(event.target.checked){
    // Add a new control in the arrayForm
    this.objectsCheck.push(event.target.value);
    console.log(this.objectsCheck);
  }
  /* unselected */
  else{
    // find the unselected element
    let i: number = 0;

    for(i;i<this.objectsCheck.length;i++){
      if(this.objectsCheck[i]==event.target.value){this.objectsCheck.splice(i,1);}
    }

//    this.objectsCheck.forEach((ctrl: FormControl) => {
  //    if(ctrl.value == event.target.value) {
        // Remove the unselected element from the arrayForm
      //  this.objectsCheck.removeAt(i);
    //  delete this.objectsCheck[i];
    //    return;
  //    }
      console.log(this.objectsCheck);
      i++;
  //  });
  }
//
//  check(i) {
  //  if (this.objects) {
    //  this.objects[i].check = !this.objects[i].check;
    //  console.log(this.objects[i]);
    //  console.log("Estado actual: ", this.objects)
    //}
  //}

}}
