import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Dashboard2Component } from './dashboard.component';
import { TilesComponent } from './tiles/tiles.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { MontlySalesComponent } from './montly-sales/montly-sales.component';
import { LatestOrdersComponent } from './latest-orders/latest-orders.component';
import { TiketporcategoriaComponent } from './tiketporcategoria/tiketporcategoria.component';
import { NgxPrintModule } from 'ngx-print';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TiketsDialogComponent } from './tikets-dialog/tikets-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
 
export const routes: Routes = [
  { path: '', component: Dashboard2Component, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    Dashboard2Component,
    TilesComponent,
    InfoCardsComponent,
    AnalyticsComponent,
    MontlySalesComponent,
    LatestOrdersComponent,
    TiketporcategoriaComponent,
    TiketsDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxChartsModule,
    NgxPrintModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
     

  ],
  providers:[{ provide: MAT_DATE_LOCALE, useValue: 'es-MX' }]

})
export class DashboardModule { }
