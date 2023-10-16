import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiketsComponent } from './tikets.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { TiketDialogComponent } from './tiket-dialog/tiket-dialog.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

export const routes: Routes = [
  { path: '', component: TiketsComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    TiketDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
    NgxMatFileInputModule
  ]
})
export class TiketsModule { }
