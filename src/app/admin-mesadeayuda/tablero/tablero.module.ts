import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableroComponent } from './tablero.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MistiketregistradosDialogComponent } from './mistiketregistrados-dialog/mistiketregistrados-dialog.component';
import { MistikasignadosDialogComponent } from './mistikasignados-dialog/mistikasignados-dialog.component';



export const routes: Routes = [
  { path: '', component: TableroComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [
    MistiketregistradosDialogComponent,
    MistikasignadosDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class TableroModule { }
