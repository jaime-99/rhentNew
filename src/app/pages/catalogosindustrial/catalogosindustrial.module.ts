import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogosindustrialComponent } from './catalogosindustrial.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

export const routes:Routes=[
  {path:'',component:CatalogosindustrialComponent,pathMatch:'full'}
];

@NgModule({
  declarations: [
    CatalogosindustrialComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CatalogosindustrialModule { }
