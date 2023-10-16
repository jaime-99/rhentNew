import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubcategoriaComponent } from './subcategoria.component';
import { SubcategoriaDialogComponent } from './subcategoria-dialog/subcategoria-dialog.component';



export const routes: Routes = [
  { path: '', component: SubcategoriaComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [
    SubcategoriaDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class SubcategoriaModule { }
