import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganigramaComponent } from './organigrama.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrgchartModule } from '@dabeng/ng-orgchart';



export const routes: Routes = [
  { path: '', component: OrganigramaComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [
    OrganigramaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OrgchartModule,
    SharedModule,
    NgxPaginationModule,
   
  ]
})
export class OrganigramaModule { }
