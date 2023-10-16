import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalesComponent } from './sucursales.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

export const routes: Routes = [
  { path: '', component: SucursalesComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    SucursalesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SucursalesModule { }
