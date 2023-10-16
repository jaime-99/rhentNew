import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from './reportes.component';
import { PruebasDialogComponent } from './pruebas-dialog/pruebas-dialog.component';
import { CapacitacionesDialogComponent } from './capacitaciones-dialog/capacitaciones-dialog.component';
import { TrabajoplantaDialogComponent } from './trabajoplanta-dialog/trabajoplanta-dialog.component';
import { CotizacionesDialogComponent } from './cotizaciones-dialog/cotizaciones-dialog.component';
import { ClientesnuevosDialogComponent } from './clientesnuevos-dialog/clientesnuevos-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

export const routes: Routes = [
  { path: '', component: ReportesComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ReportesComponent,
    PruebasDialogComponent,
    CapacitacionesDialogComponent,
    TrabajoplantaDialogComponent,
    CotizacionesDialogComponent,
    ClientesnuevosDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    
    NgxMatFileInputModule
  ]
})
export class ReportesModule { }
