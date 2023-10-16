import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMesadeayudaComponent } from './admin-mesadeayuda.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FullScreenComponent } from './components/fullscreen/fullscreen.component'; 
import { MenuComponent } from './components/menu/menu.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { CategoriaComponent } from './categoria/categoria.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { TiketsComponent } from './tikets/tikets.component';
import { TableroComponent } from './tablero/tablero.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Dashboard2Component } from './dashboard/dashboard.component';




const config: InputFileConfig = {
  fileAccept: '*'
};
export const routes = [ 
  { 
    path: '', 
    component: AdminMesadeayudaComponent, children: [
      { path:'',loadChildren:()=>import('./tablero/tablero.module').then(m=>m.TableroModule)},
      { path:'dashboard',loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)},
      { path:'categoria', loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule) , data: { breadcrumb: 'Categorias' }}, 
      
      { path:'subcategoria',loadChildren:()=> import('./subcategoria/subcategoria.module').then(m=>m.SubcategoriaModule), data: { breadcrumb: 'SubCategorias' }},
      { path:'tikets',loadChildren:()=> import('./tikets/tikets.module').then(m=>m.TiketsModule), data: { breadcrumb: 'Tikets' }},
      { path:'tablero',loadChildren:()=> import('./tablero/tablero.module').then(m=>m.TableroModule), data: { breadcrumb: 'tablero' }}

      
    ]
  } 
];

@NgModule({
  declarations: [
    AdminMesadeayudaComponent,
    BreadcrumbComponent,
    FullScreenComponent,
    MenuComponent,
    UserMenuComponent,
    CategoriaComponent,
    SubcategoriaComponent,
    TiketsComponent,
    TableroComponent,
 
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    InputFileModule.forRoot(config),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
    
  ]
})
export class AdminMesadeayudaModule { }
