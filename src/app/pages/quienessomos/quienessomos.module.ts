import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuienessomosComponent } from './quienessomos.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

export const routes:Routes=[
  {path:'',component:QuienessomosComponent,pathMatch: 'full'}
];

@NgModule({
  declarations: [
    QuienessomosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class QuienessomosModule { }
