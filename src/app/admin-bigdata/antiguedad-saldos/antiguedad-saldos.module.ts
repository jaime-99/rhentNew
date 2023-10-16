import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AntiguedadSaldosComponent } from './antiguedad-saldos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxPrintModule } from 'ngx-print';
import { CarterasaldosantComponent } from './carterasaldosant/carterasaldosant.component';

export const routes: Routes = [
  { path: '', component: AntiguedadSaldosComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AntiguedadSaldosComponent,
    CarterasaldosantComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    NgxChartsModule,

    NgxPrintModule,
    
  ]
})
export class AntiguedadSaldosModule { }
