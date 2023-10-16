import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidikenComponent } from './unidiken.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

export const routes:Routes=[
  {path:'',component:UnidikenComponent,pathMatch: 'full'}
]

@NgModule({
  declarations: [
    UnidikenComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UnidikenModule { }
