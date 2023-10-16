import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Usuario } from 'src/app/auth/interfaces/iUsuario';
import { EmpleadoVentas } from 'src/app/app.models';
import { array } from '@amcharts/amcharts5';
import { id } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-venta-empleado',
  templateUrl: './ventaEmpleado.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaEmpleadoComponent implements OnInit {
  ventaForm: FormGroup;
  detallesForm: FormGroup;
  grandTotal: number = 0;
   numVenta:number= 0;
  UsuarioId ="";
  Nombre ="";
  Mensaje=""; // solamente es una variable para ver mensaje en consola.log()
  maxPalabras = 60;
  Producto = "";
  NumeroEmpleado="";
  numeroDeVentaNuevo = 0;

  Desabilitado: boolean = false;




  constructor(private formBuilder: FormBuilder, public appService: AppService) { }




  ngOnInit() {



    let userauth = JSON.parse(localStorage.getItem('datalogin')!)
    this.UsuarioId = userauth.UsuarioId;  // con esto sacamos informacion del usuario
    this.Nombre = userauth.Nombre;
    this.NumeroEmpleado = userauth.data.Numero_Empleado;
     // este es para ver mejor que hayconsole.log(userauth);






    this.appService.Data.cartList.forEach(product => {
      this.grandTotal += product.cartCount * product.newPrice;
      this.Producto = product.name;

    });






    this.ventaForm = this.formBuilder.group({
      RhUsuarioId: ['', Validators.required],
      Fecha: [this.getCurrentDate(), Validators.required],
      Total: [this.grandTotal, Validators.required],
      detalles: this.formBuilder.array([]),
    });



    // this.fillDetalles(); // Llenar los detalles de venta automáticamente


    this.detallesForm = this.formBuilder.group({
      detalles: this.formBuilder.array([])
    });

    // this.addDetalle();// Agregamos un detalle inicial al formulario


   //this.ventaForm.controls['RhUsuarioId'].setValue(this.UsuarioId)
   this.ventaForm.controls['RhUsuarioId'].setValue(this.Nombre) // para que se vea el nombre


  }

  // fillDetalles() {
  //   const detallesFormArray = this.ventaForm.get('detalles') as FormArray;
  //   this.appService.Data.cartList.forEach(product => {
  //     const detalleFormGroup = this.formBuilder.group({
  //       ProductoId: [product.CodigoDiken, Validators.required],
  //       Precio: [product.newPrice, Validators.required],
  //       Cantidad: [product.cartCount, Validators.required],
  //       Importe: [product.cartCount * product.newPrice, Validators.required]
  //     });


  //     detallesFormArray.push(detalleFormGroup);
  //   });
  // }
  // fecha automatica
  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = this.formatNumber(currentDate.getMonth() + 1);
    const day = this.formatNumber(currentDate.getDate());
    return `${year}-${month}-${day}`;
  }

  formatNumber(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
  // cierre de fecha automatica

  get detalles(): FormArray {
    return this.detallesForm.get('detalles') as FormArray;
  }

  // addDetalle() {
  //   const detalles = this.formBuilder.group({
  //     ProductoId: ['', Validators.required],
  //     Precio: ['', Validators.required],
  //     Cantidad: ['', Validators.required],
  //     Importe: ['', Validators.required]
  //   });

  //   this.detalles.push(detalles);
  // }

  removeDetalle(index: number) {
    this.detalles.removeAt(index);
  }

  nextStep(stepper: any) {
    if (this.ventaForm.valid) {
      stepper.next();
      // this.fillDetalles(); // Llenar los detalles de venta automáticamente

    }
  }


  clickDosBotones(){
    this.submitForm();
    this.clear();
  }

  submitForm() {
   // const clave = this.ventaForm.get('RhUsuarioId').value;

   this.Desabilitado = true;
   // esto es para agregar ahora si bien el numero de la venta
   let empleadoVentas = new EmpleadoVentas();



          let userauth = JSON.parse(localStorage.getItem('datalogin')!);



    if (this.ventaForm.valid) {
      console.log('Formulario válido');

    } else {
      console.log('Formulario inválido');
    }
      const ventaEmpleado = {
        RhUsuarioId: this.UsuarioId,
        Fecha: this.ventaForm.get('Fecha').value,
        Total: this.ventaForm.get('Total').value,
        // de aqui para aca son los que agregue
        //Nombre:this.ventaForm.controls['RhusuarioId'].setValue(this.Nombre)
        Nombre: this.Nombre, // para que se vea el nombre
        //numVenta:this.numVenta = this.numVenta + 1, // para sumar cada venta , es una demo
        NumeroDeEmpleado:this.NumeroEmpleado,

        //Total: 0  // Inicializamos el Total en 0
         // hacemos algo con el numVenta



      };

      const detalles = this.appService.Data.cartList.map(product => ({
        ProductoId: product.id,
        Precio: product.newPrice,
        Cantidad: product.cartCount,
        Importe: product.newPrice * product.cartCount,
        CodigoDiken:product.CodigoDiken,
        productoName:product.name = product.name.length > this.maxPalabras ? product.name.substring(0, this.maxPalabras) + '...' : product.name,
      }));

      const data = {
        ventaEmpleado: ventaEmpleado,
        detalles: detalles
      };

      //   // saber el numero de venta
      // // this.appService.AddVentaEmpleado(ventaEmpleado, this.appService.Data.cartList).subscribe((res) => {
      // //   this.numVenta = res.id;

      const varhtml = {
        ventaEmpleado:ventaEmpleado,
      };





      // });

      this.appService.AddVentaEmpleado(ventaEmpleado, detalles).subscribe((res) => {
         this.numVenta = res.id;
        this.Mensaje = 'se hizo la venta correctamente.';
        //this.numVenta +=1;

        // Agregar algo sobre que ha sido exitoso
        console.log(this.numVenta);

    //enviar los datos al correo elctronico
      this.appService.sendemailVentaEmpleado(ventaEmpleado.NumeroDeEmpleado,ventaEmpleado.Fecha,ventaEmpleado.Total,detalles,ventaEmpleado.Nombre,this.numVenta).subscribe((res) => {

        console.log(this.numVenta);
        // const id = res.id;
        // console.log('ID recibido:', id);
        // Agregar algo sobre que ha sido exitoso

      });
      });




    }
  //     // saber el id
  //   onFocusOutEventCliente(value) {
  //     let clave = (value.target as HTMLInputElement).value;
  //     this.appService.GetClienteByClave(clave).subscribe((res: any) => {
  //       console.log(res);
  //       this.billingForm.controls['claveCliente'].setValue(res.ClaveCliente);
  //     })

  // }

  //todo para limpiar carrito //
  public clear(){
    this.appService.Data.cartList.forEach(product=>{
      this.appService.resetProductCartCount(product);
    });
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;
  }


}




