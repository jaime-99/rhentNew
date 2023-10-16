import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBigdataComponent } from './admin-bigdata.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { NgxPaginationModule } from 'ngx-pagination';
import { BgdBreadcrumbComponent } from './components/bgd-breadcrumb/bgd-breadcrumb.component';
import { BgdFullscreenComponent } from './components/bgd-fullscreen/bgd-fullscreen.component';
import { BgdMenuComponent } from './components/bgd-menu/bgd-menu.component';
import { BgdUsermenuComponent } from './components/bgd-usermenu/bgd-usermenu.component';
import { ProductsModule } from '../pages/products/products.module';






const config: InputFileConfig = {
  fileAccept: '*'
};
export const routes = [ 
  { 
    path: '', 
    component: AdminBigdataComponent, children: [
      { path:'',loadChildren:()=>import('./antiguedad-saldos/antiguedad-saldos.module').then(m=>m.AntiguedadSaldosModule)},
      { path:'antiguedad-saldos',loadChildren:()=>import('./antiguedad-saldos/antiguedad-saldos.module').then(m=>m.AntiguedadSaldosModule)},
      { path:'carteraclientes',loadChildren:()=>import('./carteraclientes/carteraclientes.module').then(m=>m.CarteraclientesModule), data: { breadcrumb: 'Cartera de clientes' }},
      { path:'ventasporasesor',loadChildren:()=>import('./ventaporasesor/ventaporasesor.module').then(m=>m.VentaporasesorModule), data: { breadcrumb: 'Ventas por Asesor' }},
      { path:'ventasporoficina',loadChildren:()=>import('./ventaporoficina/ventaporoficina.module').then(m=>m.VentaporoficinaModule), data: { breadcrumb: 'Ventas por Oficina' }},
      { path:'bdproductos',loadChildren:()=>import('../pages/products/products.module').then(m=>m.ProductsModule),data: { breadcrumb: 'Productos' }},
      { path:'dashboard',loadChildren:()=>import('./dashboard-asesor/dashboard-asesor.module').then(m=>m.DashboardAsesorModule)},
      { path:'listadoreportes',loadChildren:()=>import('./listadoreporte/listadoreporte.module').then(m=>m.ListadoreporteModule)},
      { path:'planeacion',loadChildren:()=>import('./planeacion/planeacion.module').then(m=>m.PlaneacionModule), data: { breadcrumb: 'Planeación Semanal' }},
      { path:'reportes',loadChildren:()=>import('./reportes/reportes.module').then(m=>m.ReportesModule), data: { breadcrumb: 'Reportes' }}

      
    ]
  } 
];

@NgModule({
  declarations: [
    AdminBigdataComponent,
    BgdBreadcrumbComponent,
    BgdFullscreenComponent,
    BgdMenuComponent,
    BgdUsermenuComponent,
 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    InputFileModule.forRoot(config),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    
  ]
})
export class AdminBigdataModule { }
