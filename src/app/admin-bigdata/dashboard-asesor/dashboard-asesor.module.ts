import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistagerenciaComponent } from './vistagerencia/vistagerencia.component';
import { VistaaAesorComponent } from './vistaasesor/vistaasesor.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAsesorComponent } from './dashboard-asesor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', component: DashboardAsesorComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    VistagerenciaComponent,
    VistaaAesorComponent,
    DashboardAsesorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxChartsModule,
    NgxPrintModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardAsesorModule { }
