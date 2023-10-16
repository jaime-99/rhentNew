import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaneacionComponent } from './planeacion.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PlaneacionDialogComponent } from './planeacion-dialog/planeacion-dialog.component';

export const routes: Routes = [
  { path: '', component: PlaneacionComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    PlaneacionComponent,
    PlaneacionDialogComponent
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
    FullCalendarModule
  ]
})
export class PlaneacionModule { }
