import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoriaComponent } from './categoria.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { CategoriaDialogComponent } from './categoria-dialog/categoria-dialog.component';

export const routes: Routes = [
  { path: '', component: CategoriaComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [
    CategoriaDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatFileInputModule
  ]
})
export class CategoriaModule { }
