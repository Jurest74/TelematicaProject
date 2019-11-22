import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray } from '@angular/forms'
import {NgForm} from '@angular/forms'
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { MensajeService } from '../../services/mensaje.service';
import {MensajeModule} from '../../modules/mensaje/mensaje.module';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable({
  providedIn: 'root'
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
    name:"Kit de aseo",
    descripcion:"Kit de aseo para el hogar compuesto por una trapeadora en lana, escoba suave y recogedor eficiente, color Amarillo, los cuales harán de tu casa un lugar bastante limpio.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/broom-1837434_1280+(1).jpg"
  },
  {
    codigo:2,
    name:"Kit de limpieza",
    descripcion:"Se trata del nuevo kit de limpieza compuesto por 3 toallas de microfibra, un limpiador eficiente, un tarro de jabón y un spray para vidrios, que permitirán llevar a cabo la limpieza de cualquier vidrio que desees de manera muy sencilla y bastante económica.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/clean-571679_1280.jpg"
  },
  {
    codigo:3,
    name:"Botella spray",
    descripcion:"Se trata de una botella de plástico, compacta y bastante cómoda que te permitirá alojar cualquier líquido para cualquier uso, y cargarla fácilmente gracias a su diseño. Viene en 4 colores: rosado, amarillo, azul y negro, puedes escoger el que prefieras.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/spray-bottle-2754171_1280.jpg"
  },
  {
    codigo:4,
    name:"Limpiador de vidrios",
    descripcion:"Este limpiador de vidrios te permitirá dejar cualquier vidrio brillante y bastante limpio de manera rápida y bastante eficiente. Viene en distintos tamaños los cuales se adecuan a cada una de las ventanas sobre las cuales lo quieras usar. Es fácil de transportar y bastante liviano.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/cleaning-1837331_1280.jpg"
  },
  {
    codigo:5,
    name:"Escoba",
    descripcion:"La nueva escoba llega a un increíble precio. Esta escoba podrán deshacerse de pelos y polvo más fácil de lo que imaginas, además, podrá limpiar en sitios  en los que la escoba común no llega, además de esto, es mucho más fácil lavarla y transportarla a cada lugar en que se quiera usar.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/cleaning-268107_1280.jpg"
  },
  {
    codigo:6,
    name:"Trapeador",
    descripcion:"El Nuevo trapeador portable llega para ti a un increíble precio. Este trapeador podrá limpiar en sitios  a los que el trapeador común no llega, además de esto, es mucho más fácil lavarlo y manejarlo de manera que pueda limpiarse más en menos tiempo y con menos esfuerzo.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/broom-1324469_1280.jpg"
  },
  {
    codigo:7,
    name:"Caneca de basura",
    descripcion:"Caneca de basura de tamaño mediano en aluminio, podrá usarse en hogares o en sitios abiertos dado su tamaño y su facilidad para transportar. Esta caneca viene con tres bolsas de repuesto. Es su mejor opción si lo que busca es comodidad y un sitio que guarde todos los malos olores.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/garbage-40357_1280.png"
  },
  {
    codigo:8,
    name:"Kit de limpieza para baño",
    descripcion:"Este kit de limpieza consta de una pluma para baño, un desinfectante y un jabón líquido, y una toalla de microfibra que permitirán realizarle el aseo a su baño de la manera que tanto había esperado. Viene en cuatro colores: rosado, azul y amarillo.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/feather-duster-709124_1280.jpg"
  },
  {
    codigo:9,
    name:"Escoba para hojas",
    descripcion:"Esta escoba trae un diseño especial que la diferencia del resto, el cual permite un mayor agarre y permite cubrir una mayor área y por tanto, una recolecta de hojas en menor tiempo. Está hecha de aluminio y madera, lo que la hace bastante liviana y duradera.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/computing-4591223_1280.jpg"
  },
  {
    codigo:10,
    name:"Ganchos para ropa",
    descripcion:"Ganchos de plástico multicolores, bastante finos y duraderos los cuales permiten colgar todo tipo de prendas sin miedo a que manchen la ropa o simplemente se dañen. Poseen múltiples agarres para todo tipo de superficies.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/clothes-hangers-582212_1280.jpg"
  },
  {
    codigo:11,
    name:"Paño de microfibra",
    descripcion:"Paños de microfibra bastante resistentes y absorbentes que podrán usarse en todo tipo de superficie, incluso si se prefieren para uso corporal. Viene en distintos tamaños y colores, entre los cuales se encuentran: verde, amarillo, azul y naranja.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/micro-fiber-cloth-2716115_1280.jpg"
  },
  {
    codigo:12,
    name:"Jabón de baño",
    descripcion:"Jabón de baño natural, suave y muy humectante, libre de todos los químicos que traen los jabones comunes y que hacen tanto daño en la piel de las personas. Es un jabón de avena y leche, viene en dos tamaños, lo que le permitirá transportarlo a donde quiera.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/soap-1617473_1280.jpg"
  },
  {
    codigo:13,
    name:"Plancha",
    descripcion:"Plancha para ropa bastante cómoda y con diversos niveles, adaptada para todo tipo de telas y prendas. Viene en color verde y naranja, además de esto, tiene una abertura que permitirá expulsar agua directamente a la prenda para garantizar mejores resultados",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/ironing-403074_1280.jpg"
  },
  {
    codigo:14,
    name:"Esponja lavaplatos",
    descripcion:"Esponja para lavar platos y ollas multifunción que permitirá estregar y lavar todas las superficies deseadas sin necesidad de dañarlas o maltratarse las manos. Posee un diseño y un tamaño que permiten un fácil agarre y una máxima duración.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/cleaning-268068_1280.jpg"
  },
  {
    codigo:15,
    name:"Jabón hecho a mano",
    descripcion:"Jabón para manos hecho a mano, a base de componentes naturales acompañados por aromas incomparables, este jabón brinda una suavidad y durabilidad incomparables, además de ser antibacterial y 100% libre de químicos dañinos.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/soap-1209344_1280.jpg"
  },
  {
    codigo:16,
    name:"Guantes",
    descripcion:"Guantes de latex gruesos perfectos para realizar actividades de limpieza que puedan dañar las manos e inclusive manejar químicos fuertes. Estos guantes vienen en diversas tallas y en presentaciones válidas tanto para hombres como para mujeres. Pueden ser usados en ambientes laborales o en hogares.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/gloves-319838_1280.jpg"
  },
  {
    codigo:17,
    name:"Bicarbonato de sodio",
    descripcion:"Caja de bicarbonato de sodio para desmanchar y limpiar cualquier superficie, desde tela hasta acero y aluminio. Trae 50g de bicarbonato de sodio puro, instrucciones de uso y una taza de mezcla para ser usada cada que vaya a aplicarse en cualquier ambiente.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/baking-soda-768950_1280.jpg"
  },
  {
    codigo:18,
    name:"Caneca",
    descripcion:"Caneca de plástico pequeña perfecta para mezclar diferentes productos o almacenar productos de limpieza ya sea dentro de un hogar o en cualquier ambiente laboral. Posee un fácil agarre y está disponible en 2 presentaciones que varían desde el tamaño hasta el color.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/bucket-1643406_1280.png"
  },
  {
    codigo:19,
    name:"Pañitos faciales",
    descripcion:"Pañitos húmedos faciales fabricados en algodón con productos amigables con todo tipo de piel. Perfectos para desmaquillar y limpiar la piel en todo momento. Vienen en paquetes de 10 y en un tamaño que le permite trasladarlos a cualquier lugar.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/skincare-1461395_1280.jpg"
  },
  {
    codigo:20,
    name:"Escoba tradicional",
    descripcion:"Escoba multicolores tradicional que permite un agarre bastante cómodo y cubre áreas lo suficiente grandes. Es muy liviana y permite ser guardada en cualquier lugar. Está hecha de plástico con cerdas suaves.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/brooms-57256_1280.jpg"
  },
  {
    codigo:21,
    name:"Cepillo de dientes ecológico",
    descripcion:"Cepillo de dientes ecológico con cerdas bastante suaves que llegan hasta los rincones mas escondidos permitiendo una limpieza completa y eliminando todas los microorganismos que puedan estar alojados allí.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/cepillo.jpg"
  },
  {
    codigo:22,
    name:"",
    descripcion:"",
    image:""
  },
  {
    codigo:23,
    name:"Cepillo de dientes",
    descripcion:"Cepillo de dientes con cerdas suaves y con limpiador de lengua. Está elaborado en plástico y posee el largor perfecto para manejarlo fácilmente y desplazarlo por toda la boca, permitiendo una limpieza total tanto de dientes como de la lengua.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/cepillocomun.Jpeg"
  },
  {
    codigo:24,
    name:"Cepillo de dientes eléctrico",
    descripcion:"Cepillo de dientes eléctrico elaborado en plástico que duradero y cómodo. Funciona con pilas AA, y tiene entrada para conectar directamente a un toma corriente. Está diseñado para limpiar cada cavidad de la boca sin lastimar. Tiene una gran durabilidad y permite ser transportado a todo lado.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/cepilloelectrico.jpg"
  },
  {
    codigo:25,
    name:"Ducha de baño",
    descripcion:"Ducha de baño con diseño amigable y salida de agua suave. Posee un diseño bastante agradable que podrá situarse en cualquier baño a cualquier altura. Esta ducha tiene la posibilidad de usarse con agua caliente o fría, pues sus componentes están elaborados en materiales que resisten cualquier temperatura.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/shower-1027904_1280.jpg"
  },
  {
    codigo:26,
    name:"Toalla para cocina",
    descripcion:"Toalla en microfibra para cocina, que permitirá limpiar cada rincón de manera fácil y sin necesidad de escurrir a cada rato dada su capacidad de absorción y a que permite realizarle una limpieza total después de ponerlo en contacto con el agua.  Viene en tamaños y diseños que se adecuarán perfectamente a cada cocina.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/cleanliness-2799464_1280.jpg"
  },
  {
    codigo:27,
    name:"Dispensador de jabón",
    descripcion:"Dispensador de jabón elaborado en aluminio y vidrío, con un diseño único que se adaptará a cualquier ambiente y tendrá una durabilidad garantizada. Es apto para almacenar jabones corporales y jabones de limpieza común. Este dispensador permitirá sacar la cantidad necesaria en cada ocasión.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/soap-dispenser-2337697_1280.jpg"
  },
  {
    codigo:28,
    name:"Bañera para bebé",
    descripcion:"Bañera para bebé con el largo y al ancho que tu bebé necesita para estar cómodo y feliz a la hora del baño. Tiene el tamaño perfecto para ser almacenado en cualquier cavidad de la casa, y además, gracias a los materiales usados para elaborarla es resistente a caídas y maltratos que pueda sufrir.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/baby-1651161_1280.jpg"
  },
  {
    codigo:29,
    name:"Valla de madera",
    descripcion:"Valla elaborada en madera para colgar prendas mojadas pequeñas, de manera bastante fácil y con un diseño único. Está diseñada para ser usada en ambientes pequeños y libres del sol directo ya que lo puede deteriorar.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/fence-2733591_1280.png"
  },
  {
    codigo:30,
    name:"Cubo para trapear",
    descripcion:"Cubo de plástico diseñado para alojar trapeadoras y líquidos para trapear. Su diseño permite usarla en cualquier lugar y trasportarla libremente por espacios grandes. Posee dos compartimentos que podrán ser usados de la manera que se prefiera.",
    image:"https://s3.amazonaws.com/proyectos.personales/ProyectoTelematica/graffiti-2023845_1280.jpg"
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
              private mensajeService: MensajeService, private router: Router) {
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

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.mensaje.emailCliente!=="") {
      return true;
    } else {
      this.router.navigate(['/home'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }}

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
