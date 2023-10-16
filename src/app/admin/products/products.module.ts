import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { InputFileModule } from 'ngx-input-file';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductZoomComponent } from './product-detail/product-zoom/product-zoom.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDialogComponent } from './categories/category-dialog/category-dialog.component';
import { ProductosRelacionadosComponent } from './productos-relacionados/productos-relacionados.component';
import { ProductosSustitutosComponent } from './productos-sustitutos/productos-sustitutos.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductorelacionadoComponent } from './productorelacionado/productorelacionado.component';
import { QuillModule } from 'ngx-quill'
import { NgxMatFileInputModule } from '@angular-material-components/file-input';


export const routes: Routes = [ 
  { path: '', redirectTo: 'product-list', pathMatch: 'full'},
  { path: 'categories', component: CategoriesComponent, data: { breadcrumb: 'Categorías' } },
  { path: 'product-list', component: ProductListComponent, data: { breadcrumb: 'Productos' } },
  { path: 'product-detail', component: ProductDetailComponent, data: { breadcrumb: 'Producto Detalle' } },
  { path: 'product-detail/:id', component: ProductDetailComponent, data: { breadcrumb: 'Producto Detalle' } }, 
  { path: 'add-product', component: AddProductComponent, data: { breadcrumb: 'Agregar Producto' } },
  { path: 'add-product/:id', component: AddProductComponent, data: { breadcrumb: 'Editar Producto' } }, 
  {path:'productosrelacionados/:id',component:ProductosRelacionadosComponent,data:{breadcrumb:'Productos relacionados'}}
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductZoomComponent,
    AddProductComponent,
    CategoriesComponent,
    CategoryDialogComponent,
    ProductosRelacionadosComponent,
    ProductosSustitutosComponent,
    ProductoComponent,
    ProductorelacionadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule,
    SwiperModule,
    InputFileModule,
    QuillModule.forRoot(),
    NgxMatFileInputModule
   
  ]
})
export class ProductsModule { }
