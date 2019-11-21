import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray } from '@angular/forms'

import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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


  constructor(private formBuilder: FormBuilder) {

    this.checkoutForm = this.formBuilder.group({
          name: null,
          mensaje: null,
          items:[this.objectsCheck]
        });
  }

  ngOnInit() {
  }

  onSubmit(customerData) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);

    this.checkoutForm.reset();
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
