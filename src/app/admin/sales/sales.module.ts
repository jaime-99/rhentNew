import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'; 
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrdersComponent } from './orders/orders.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';

export const routes: Routes = [ 
  { path: '', redirectTo: 'cotizaciones', pathMatch: 'full'},
  { path: 'orders', component: OrdersComponent, data: { breadcrumb: 'Orders' } },
  { path: 'transactions', component: TransactionsComponent, data: { breadcrumb: 'Transactions' } }, 
  { path: 'cotizaciones',component:CotizacionComponent,data:{breadcrumb:'Cotizaciones'}}
];

@NgModule({
  declarations: [
    OrdersComponent, 
    TransactionsComponent, CotizacionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    SharedModule,
    NgxPaginationModule,
  ]
})
export class SalesModule { }
