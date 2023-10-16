import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { filter, map, Subscription } from 'rxjs';
//import axios from 'axios';


import { AppService } from 'src/app/app.service';
import { Cotizacion } from '../../app.models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/auth/interfaces/iUsuario';
import { SignInComponent } from '../sign-in/sign-in.component';

import { TiketDialogComponent } from 'src/app/admin-mesadeayuda/tikets/tiket-dialog/tiket-dialog.component';

// import{ SupportService} from 'src/app/admin/support/service'







@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit, OnDestroy {
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  stepperOrientation: 'horizontal' | 'vertical' = "horizontal";
  billingForm: UntypedFormGroup;
  deliveryForm: UntypedFormGroup;
  paymentForm: UntypedFormGroup;
  Probabilidad = "0";
  UsuarioId = "";
  date = new Date();
  datecaduca = new Date();
  clienteId: string;
  numcotizacion = "";
  ClienteId = "";


  correo: string;
  nombreEmpleado: string;
  public nombre: string;
  countries = [];
  months = [];
  years = [];
  EstadoCliente = [];
  deliveryMethods = [];
  grandTotal = 0;
  watcher: Subscription;

  constructor(
    public appService: AppService,
    public formBuilder: UntypedFormBuilder,
    public mediaObserver: MediaObserver

  ) {
    this.watcher = mediaObserver.asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((change: MediaChange) => {
        if (change.mqAlias == 'xs') {
          this.stepperOrientation = 'vertical';
        } else if (change.mqAlias == 'sm') {
          this.stepperOrientation = 'vertical';
        } else if (change.mqAlias == 'md') {
          this.stepperOrientation = 'horizontal';
        } else {
          this.stepperOrientation = 'horizontal';
        }
      });

    this.billingForm = this.formBuilder.group({
      Correo: ['', Validators.required],
      Cliente: [this.nombre, Validators.required] // Agrega las validaciones necesarias


    });
  }

  ChangeEstado(id: any) {

    this.EstadoCliente.forEach(edo => {
      if (edo.EstadoClienteId == id) {
        //this.deliveryForm.setControl
        this.Probabilidad = edo.Probabilidad;

        console.log(edo)
      }
    })

  }



  ngOnInit() {


    let userauth = JSON.parse(localStorage.getItem('datalogin')!)
    this.nombre = userauth.Nombre;
    this.UsuarioId = userauth.UsuarioId;
    this.correo = userauth.Correo;
    console.log(userauth);
    this.appService.Data.cartList.forEach(product => {
      this.grandTotal += product.cartCount * product.newPrice;




    });













    // this.obtenerNombre();
    // this.obtenerUsuario();


    this.countries = this.appService.getCountries();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.billingForm = this.formBuilder.group({
      ClaveCliente: '',
      EstadoClienteId: [0, Validators.required],
      Cliente: '',
      correo: '',
      probabilidad: '',
      fechacierreprevisto: '',
      fechacaduca: '',
      asesor: ['',],
      ejecutiva: ['',],

    });
    this.deliveryForm = this.formBuilder.group({
      deliveryMethod: [this.deliveryMethods[0], Validators.required]
    });
    this.paymentForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiredMonth: ['', Validators.required],
      expiredYear: ['', Validators.required],
      cvv: ['', Validators.required]
    });
    this.appService.GetEstadoClienteByEntidad('prospect').subscribe((res) => {

      this.EstadoCliente = res;

      this.billingForm.controls['EstadoClienteId'].setValue(10);


      //const url=`${ this.correo }/Usuario/GetAuthUser.php`;
      //this.billingForm.controls['correo']


         // lineas que he cambiado

      this.billingForm.controls['correo'].setValue(this.correo);
      this.billingForm.controls['ClaveCliente'].setValue(this.UsuarioId);
      this.billingForm.controls['Cliente'].setValue(this.nombre);








      this.EstadoCliente.forEach(edo => {

        if (edo.EstadoClienteId == 10) {
          //this.deliveryForm.setControl
          this.Probabilidad = edo.Probabilidad;
          console.log(edo);
        }
      });
    });
    this.datecaduca.setDate(this.datecaduca.getDate() + 30);

  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  public placeOrder() {
    const { EstadoClienteId, fechacierreprevisto, fechacaduca, probabilidad} = this.billingForm.value;
    let cotizacion = new Cotizacion();

    cotizacion.ClienteId = this.clienteId;
    cotizacion.EstadoId = EstadoClienteId;

    cotizacion.FechaCierrePrevisto = this.date;;
    cotizacion.FechaCaduca = this.datecaduca;
    cotizacion.Probabilidad = this.Probabilidad;


    cotizacion.Total = this.grandTotal.toString();

    let userauth = JSON.parse(localStorage.getItem('datalogin')!);
    cotizacion.UsuarioId = userauth.UsuarioId;



    this.appService.AddCotizacion(cotizacion, this.appService.Data.cartList).subscribe((res) => {
      this.numcotizacion = res.id;


    });

    // aqui coloco lo de la add ventaEmpleado



    // const ventaEmpleado = {
    //   RhUsuarioId: 1,
    //   Fecha: '2023-06-15',
    //   Total: 100.0
    // };

    // this.appService.agregarVentaEmpleado(ventaEmpleado);

    // console.log(ventaEmpleado);


// coloco lo nuevo de ventaEmpleado

    // async function agregarVentaEmpleado() {
    //   try {
    //     // Realizar la solicitud POST a la API para agregar la venta de empleado
    //     const response = await axios.post('https://www.dikeninternational.com/dikenecommerce/api/ventas/addventaEmpleado.php?', {
    //       RhUsuarioId: 1, // Reemplaza con el valor correcto
    //       Fecha: '2023-06-16', // Reemplaza con el valor correcto
    //       Total: 100.0, // Reemplaza con el valor correcto
    //       Detalles: [
    //         {
    //           ProductoId: 1, // Reemplaza con el valor correcto
    //           Precio: 10.0, // Reemplaza con el valor correcto
    //           Cantidad: 2, // Reemplaza con el valor correcto
    //         },
    //         // Agrega más detalles si es necesario
    //       ],
    //     });

    //     // Obtener la respuesta de la API
    //     const data = response.data;
    //     if (data.ok) {
    //       console.log('La venta de empleado se agregó correctamente');
    //       console.log('ID de venta: ', data.id);
    //       console.log('Mensaje: ', data.message);
    //       // Realizar acciones adicionales si es necesario
    //     } else {
    //       console.log('Error al agregar la venta de empleado');
    //       console.log('Mensaje: ', data.message);
    //     }
    //   } catch (error) {
    //     console.error('Error en la solicitud HTTP: ', error.message);
    //   }
    // }

    // // Llamar a la función para agregar la venta de empleado
    // agregarVentaEmpleado();


// Aqui se termina














    //this.horizontalStepper._steps.forEach(step => step.editable = false);
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;



  }
  /*
  obtenerUsuario() {
    this.correo = this.appService.usuario;
    this.billingForm.controls['correo'];


  } */




  onFocusOutEventCliente(value) {
    let clave = (value.target as HTMLInputElement).value;
    this.appService.GetClienteByClave(clave).subscribe((res: any) => {
      console.log(res);

      this.billingForm.controls['Cliente'].setValue(res.Cliente);
      this.billingForm.controls['asesor'].setValue(res.Asesor);
      this.billingForm.controls['ejecutiva'].setValue(res.Ejecutiva);
      //this.billingForm.controls['correo'].setValue(res.Correo);
      this.clienteId = res.ClienteId;
      this.billingForm.controls['claveCliente'].setValue(res.ClaveCliente);




    });


  }

}
