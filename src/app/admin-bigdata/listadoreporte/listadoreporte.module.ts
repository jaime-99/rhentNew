import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoreporteComponent } from './listadoreporte.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { NgxChartsModule } from '@swimlane/ngx-charts';

export const routes: Routes = [
  { path: '', component: ListadoreporteComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ListadoreporteComponent
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

  ]
})
export class ListadoreporteModule { }
