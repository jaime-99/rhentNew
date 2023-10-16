import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarteraclientesComponent } from './carteraclientes.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarteraclientedialogComponent } from './carteraclientedialog/carteraclientedialog.component';

export const routes: Routes = [
  { path: '', component: CarteraclientesComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    CarteraclientesComponent,
    CarteraclientedialogComponent
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
export class CarteraclientesModule { }
