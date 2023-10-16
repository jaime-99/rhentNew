import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoscadenasComponent } from './catalogoscadenas.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

export const routes:Routes=[
  {path:'',component:CatalogoscadenasComponent,pathMatch:'full'}
];


@NgModule({
  declarations: [
    CatalogoscadenasComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CatalogoscadenasModule { }
