import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoImagen } from 'src/app/app.models';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  private baseUrl: string = "https://www.dikeninternational.com/dikenecommerce/api";
  constructor(private http: HttpClient) { }
 

  postfiles(formData:any):Observable<any>
{
  const url=`${ this.baseUrl }/tools/fileupload.php`;
 return this.http.post<any>(url, formData);

}
UpdateProducto(ProductoId:any,Producto:any,PrecioActual:any,Descripcion:any,Clase:any,Familia:any,SubFamilia:any,TextSearch:any,CodigoDiken:any,PrettyText:any)
{
  const url=`${ this.baseUrl }/producto/UpdateProducto.php`; 


  const body={ProductoId,Producto,PrecioActual,Descripcion,Clase,Familia,SubFamilia,TextSearch,CodigoDiken,PrettyText}
  return this.http.put<any>( url, body );

}
UpdateProductoImagen(Id:any,ProductoId:any,small:any,medium:any,big:any,EsPrincipal:any)
{
  const url=`${ this.baseUrl }/producto/UpdateProductoImagen.php`;  

  const body={Id,ProductoId,small,medium,big,EsPrincipal}
  return this.http.put<any>( url, body );

}
AddProductoImagen(ProductoId:any,small:any,medium:any,big:any,EsPrincipal:any)
{
  const url=`${ this.baseUrl }/producto/AddProductoImagen.php`;  

  const body={ProductoId,small,medium,big,EsPrincipal}
  return this.http.post<any>( url, body );


}

GetProductoImangeByProductoId(id:string)
{
  const url=`${ this.baseUrl }/producto/GetProductoImagenGetByProductoId.php`;
  const params=new HttpParams().set("id",id);
return this.http.get<ProductoImagen>(url,{params});
}
GetFamiliasDescription(id:string)
{
  const url=`${ this.baseUrl }/producto/GetFamiliasDescription.php`;
  const params=new HttpParams().set("id",id);
return this.http.get<any>(url,{params});
}
}
