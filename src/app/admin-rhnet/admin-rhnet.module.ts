import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { InputFileConfig, InputFileModule } from 'ngx-input-file';
const config: InputFileConfig = {
  fileAccept: '*'
};
import { AdminRhnetComponent } from '../admin-rhnet/admin-rhnet.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RhMenuComponent } from './components/menu/menu.component'; 
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { FullScreenComponent } from './components/fullscreen/fullscreen.component';
import { InicioComponent } from './inicio/inicio.component'; 




export const routes = [ 
  { 
    path: '', 
    component: AdminRhnetComponent, children: [
      { path:'',loadChildren:()=>import('./inicio/inicio.module').then(m=>m.InicioModule)},



      
    ]
  } 
];

@NgModule({
  declarations: [
    AdminRhnetComponent,
    BreadcrumbComponent,
    RhMenuComponent,
    UserMenuComponent,
    FullScreenComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    InputFileModule.forRoot(config),
  ]
})
export class AdminRhnetModule { }
