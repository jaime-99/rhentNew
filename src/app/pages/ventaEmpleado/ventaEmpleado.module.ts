import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VentaEmpleadoComponent } from './ventaEmpleado';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



// modulos nuevos

export const routes: Routes = [
  { path: '', component: VentaEmpleadoComponent, pathMatch: 'full' }
];

@NgModule({

  imports:[
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    VentaEmpleadoComponent
  ],
  providers:[{ provide: MAT_DATE_LOCALE, useValue: 'es-MX', }]
})
  export class VentaEmpleadoModule {}








