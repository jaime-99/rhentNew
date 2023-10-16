import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlataformasComponent } from './plataformas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

export const routes:Routes=[
  {path:'',component:PlataformasComponent,pathMatch: 'full'}
];

@NgModule({
  declarations: [
    PlataformasComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PlataformasModule { }
