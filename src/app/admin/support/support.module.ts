import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SupportComponent } from './support.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupportDialogComponent } from './support-dialog/support-dialog.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { TableroComponent } from './tablero/tablero.component';
import { SupportlistDialogComponent } from './supportlist-dialog/supportlist-dialog.component';
import { ListTiketsComponent } from './list-tikets/list-tikets.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Tiket-list', pathMatch: 'full'},
  { path: 'Tiket-list', component: SupportComponent, data: { breadcrumb: 'Tickets' } },
  { path: 'board', component: TableroComponent, data: { breadcrumb: 'board' } },
];

@NgModule({
  declarations: [
    SupportComponent,
    SupportDialogComponent,
    TableroComponent,
    SupportlistDialogComponent,
    ListTiketsComponent
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
export class SupportModule { }
