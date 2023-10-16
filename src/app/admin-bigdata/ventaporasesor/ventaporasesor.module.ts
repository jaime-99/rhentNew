import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaporasesorComponent } from './ventaporasesor.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxPrintModule } from 'ngx-print';

export const routes: Routes = [
  { path: '', component: VentaporasesorComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    VentaporasesorComponent
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
export class VentaporasesorModule { }
