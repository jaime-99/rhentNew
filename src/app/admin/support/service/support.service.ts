import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { of, Observable, share, catchError, map } from 'rxjs';
import { ICategoria, IDataChart, IDepartamento, IEstatusTiket, ISubCategoria, ITiket, Usuario } from '../interfaces/iTiket';
import { autloginResponse } from 'src/app/auth/interfaces/iUsuario';

@Injectable({
    providedIn: 'root'
  })

  export class SupportService {
    //  private baseUrl: string = "https://www.dikeninternational.com/APImesadeayuda/API";
private baseUrl: string = "https://www.dikeninternational.com/APImesadeayuda_____sbx/API";
    // public _departamento: IDepartamento[];

    // get departamento() {
    //   return { ...this._departamento };
    // }

    public _usuario: autloginResponse|any;

    get usuario() {
      return { ...this._usuario };
    }

    constructor( private http: HttpClient ) { }



    // GetAllDepartment(): Observable<IDepartamento[]> {

    //     const url=`${ this.baseUrl }/Departamento/GetDepartment.php`;
    //     return this.http.get<any[]>(url);
    // }



  GetAllDepartment(): Observable<IDepartamento[]> {

    const url=`${ this.baseUrl }/Departamento/GetDepartment.php`;
    return this.http.get<any[]>(url);
}

GetAllServiceDepartment(): Observable<IDepartamento[]> {

    const url=`${ this.baseUrl }/Departamento/GetServiceDepartment.php`;
    return this.http.get<any[]>(url);
}

GetCategoryByDepartment(id:any):Observable<ICategoria[]>{
  const url=`${ this.baseUrl }/Categoria/GetCategoryByDepartmentId.php`;
  const params=new HttpParams().set("id",id);
return this.http.get<any[]>(url,{params});

}
GetUserByDepartmentId(id:string): Observable<any> {

  const url=`${ this.baseUrl }/Usuario/GetUserByDepartmentId.php`;
 const params=new HttpParams().set("id",id);
return this.http.get<Usuario>(url,{params});



}
GetAllsubCategory():Observable<ISubCategoria[]>{
  const url=`${ this.baseUrl }/Subcategoria/GetSubCategory.php`;

 return this.http.get<any[]>(url);

}

GetSubCategory(id:any):Observable<ISubCategoria[]>{
    const url=`${ this.baseUrl }/Subcategoria/GetSubCategory.php`;
    const params=new HttpParams().set("id",id);
 return this.http.get<any[]>(url,{params});

}

GetSubCategoryByCategoriaId(id:any):Observable<ISubCategoria[]>{
  const url=`${ this.baseUrl }/Subcategoria/GetSubCategoryByCategoriaId.php`;
  const params=new HttpParams().set("id",id);
return this.http.get<any[]>(url,{params});

}
AddSubCategory(CategoriaId:string,SubCategoria:string,CriticidadId:string)
{
  const url=`${ this.baseUrl }/Subcategoria/AddSubCategory.php`;

  const body={CategoriaId,SubCategoria,CriticidadId};

  return this.http.post<any>( url, body ).pipe(share());

}




  //tiket services

  GetAllTiket():Observable<ITiket[]>{
    const url=`${ this.baseUrl }/Tiket/GetTiket.php`;

   return this.http.get<any[]>(url);

  }
  GetAllEstusTiket():Observable<IEstatusTiket[]>
  {

    const url=`${ this.baseUrl }/EstatusTiket/GetStatusTiket.php`;

   return this.http.get<any[]>(url);
  }



  GetTiket(id:any):Observable<ITiket[]>{
      const url=`${ this.baseUrl }/Tiket/GetTiket.php`;
      const params=new HttpParams().set("id",id,);
   return this.http.get<any[]>(url,{params});

  }
  GetDashboardTiketResponsables(id:any):Observable<IDataChart[]>{
      const url=`${ this.baseUrl }/Tiket/GetDashboardTiketResponsables.php`;
      const params=new HttpParams().set("id",id,);
   return this.http.get<any[]>(url,{params});

  }
  GetDashboardTopCategoriasTiket(id:any):Observable<IDataChart[]>{
      const url=`${ this.baseUrl }/Tiket/GetDashboardTopCategoriasTiket.php`;
      const params=new HttpParams().set("id",id,);
   return this.http.get<any[]>(url,{params});

  }

  GetTiketUserEstatus(id:any,ResponsableId:any,isopen:any):Observable<ITiket[]>{
    const url=`${ this.baseUrl }/Tiket/GetTiketsUserEstatus.php`;
    const params=new HttpParams().set("id",id,)
                                 .set('ResponsableId',ResponsableId)
                                 .set('isopen',isopen);
 return this.http.get<any[]>(url,{params});

}

postfiles(formData:any):Observable<any>
{
  const url=`${ this.baseUrl }/tools/fileupload.php`;
 return this.http.post<any>(url, formData);



}
GetLoginAuth2(Correo:string,contrasenia:string)
{
  const url=`https://www.dikeninternational.com/dikenecommerce/api/Usuario/GetAuthUser.php`;

  const body={Correo,contrasenia};
  let headers=new HttpHeaders();


  headers.append('Content-Type' , 'application/json');

  return this.http.post<autloginResponse>( url, body,{headers:headers} )
  .pipe(

    map(resp=>{
      resp.ok;
      this._usuario={
        Nombre:resp.Nombre,
        UsuarioId:resp.UsuarioId,
        Correo:resp.Correo,
        message:resp.message,
        ok:resp.ok,
        Departamento:resp.Departamento,
        EsServicio:resp.EsServicio,
        DepartamentoId:resp.DepartamentoId,
        Imagen:resp.Imagen
      };


      localStorage.setItem('datalogin',JSON.stringify( this._usuario))
      return resp.ok;
    }),
    catchError( err => of(err.error.msg) )

  );
}

GetLoginAuth(Correo:string,contrasenia:string)
{
  const url=`${ this.baseUrl }/Usuario/GetAuthUser.php`;

  const body={Correo,contrasenia};

  return this.http.post<autloginResponse>( url, body )
  .pipe(

    map(resp=>{
      resp.ok;
      this._usuario={
        Nombre:resp.Nombre,
        UsuarioId:resp.UsuarioId,
        Correo:resp.Correo,
        message:resp.message,
        ok:resp.ok,
        Departamento:resp.Departamento,
        EsServicio:resp.EsServicio,
        DepartamentoId:resp.DepartamentoId,
        data:resp.data,
        Imagen:resp.Imagen,
        BigDataUsuarioId:resp.BigDataUsuarioId,

      }
      localStorage.setItem('datalogin',JSON.stringify( this._usuario))
      return resp.ok;
    }),
    catchError( err => of(err.error.msg) )

  );
}

//todo creare mi metodo con la api para mandar correo

  mandarCorreoRecuperacion(correo:string){
      const url=`https://www.dikeninternational.com/dikenecommerce/api/tools/enviarCorreoRecuperacion.php`;
      const body={correo};
      return this.http.post<any>( url, body );

  }

  //Aqui seria lo de cambiar la contraseña
  //todo prueba






  AddTiket(UsuarioId:string,SubCategoriaId:string,ResponsableId :string,Detalle:string,ContactoTelefonico:string):Observable<any>
  {
    const url=`${ this.baseUrl }/Tiket/AddTiket.php`;

    const body={UsuarioId,SubCategoriaId,ResponsableId,Detalle,ContactoTelefonico};

    return this.http.post<any>( url, body );

  }
  sendmail(TiketId:string,Categoria:string,SubCategoria:string,Criticidad:string,Usuario:string,Responsable:string,Detalle:string,File:string,ContactoTelefonico:string):Observable<any>
  {
    const url=`${ this.baseUrl }/tools/sendmail.php`;
    const body={TiketId,Categoria,SubCategoria,Criticidad,Usuario,Responsable,Detalle,File,ContactoTelefonico};
    return this.http.post<any>( url, body );


  }
  updatetiketmail(TiketId:string,Categoria:string,SubCategoria:string,Criticidad:string,Usuario:string,Responsable:string,Detalle:string,Estatus:string,Respuesta:string,File:string,ContactoTelefonico:string):Observable<any>
  {
    const url=`${ this.baseUrl }/tools/updatetiketmail.php`;
    const body={TiketId,Categoria,SubCategoria,Criticidad,Usuario,Responsable,Detalle,Estatus,Respuesta,File,ContactoTelefonico};
    return this.http.post<any>( url, body );


  }

  UpdateTiket(TiketId:string,SubCategoriaId:string,EstatusTiketId:string,ResponsableId:string,Detalle:string,Respuesta:string,Reasignado:string,ContactoTelefonico:string):Observable<any>
{

  const url=`${ this.baseUrl }/Tiket/UpdateTiket.php`;

    const body={TiketId,SubCategoriaId,EstatusTiketId,ResponsableId,Detalle,Respuesta,Reasignado,ContactoTelefonico};

    return this.http.put<any>( url, body );


}


  /// fin tiket services








    logout() {
      localStorage.clear();
    }


  }
