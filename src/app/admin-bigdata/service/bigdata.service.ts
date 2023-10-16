import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class BigDataSerivce {
    private baseUrl: string = "https://www.dikeninternational.com/dikenecommerce/api";
    constructor(private http:HttpClient, public snackBar: MatSnackBar) { }

    public getCursosCapacitacion():Observable<any[]>
    {
        let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getcusrsoscapacitacion.php?';
        const params=new HttpParams();
        return this.http.get<any[]>(apiurl,{params});
    
    }

    public GetReportesActividadesUsuarios(usuarioid:string,fecha1:string,fecha2:string):Observable<any[]>
    {

        let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getreportesusuario.php?';
        const params=new HttpParams().set("id",usuarioid);
        return this.http.get<any[]>(apiurl,{params});


    }

    AddPlaneacion(id_usuario:string,cliente:string,tipo_actividad:string,observaciones:string,fecha_captura:string):Observable<any>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/addplaneacion.php';

    const body={id_usuario,cliente,tipo_actividad,observaciones,fecha_captura};

    return this.http.post<any>( apiurl, body );

}

    public getplaneacionesporusuario(usuario_id:any):Observable<any[]>
    {
        let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getplaneacionesbyuserId.php?';
        const params=new HttpParams().set("id",usuario_id);
        return this.http.get<any[]>(apiurl,{params});
    
    }
    public gettipoactividad(division:string,nivel:string):Observable<any[]>
    {
        let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/gettipoactividad.php?';
        const params=new HttpParams().set("id",division).set("nivel",nivel);
        return this.http.get<any[]>(apiurl,{params});
    
    }

    public gettiporeporte():Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/gettiporeportes.php?';
    const params=new HttpParams();
    return this.http.get<any[]>(apiurl,{params});

}
public getreporteasesor(BigdataUsuarioId:string,tiporeporte:string):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getreporteasesor.php?';
    const params=new HttpParams().set("id",BigdataUsuarioId).set("tiporeporte",tiporeporte);
    return this.http.get<any[]>(apiurl,{params});

}
    public GetCarteraClientesBigData(BigdataUsuarioId:string):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getcarteraclientes.php?';
    const params=new HttpParams().set("id",BigdataUsuarioId);
    return this.http.get<any[]>(apiurl,{params});

}

public GetVendedorOK(division:string,oficina:string):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getvendedorok.php?';
    const params=new HttpParams().set("id",division).set("oficina",oficina);
    return this.http.get<any[]>(apiurl,{params});

}
public GetMesesReporte():Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getlastmonthsreports.php?';
    const params=new HttpParams();
    return this.http.get<any[]>(apiurl,{params});

}
public GetMesesReporteDetallePorAsesor(id:any,anio:any,mes:any):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getreporteresumenporasesor.php?';
    const params=new HttpParams().set("id",id).set("anio",anio).set("mes",mes);
    return this.http.get<any[]>(apiurl,{params});

}
public getoficinabydivision(division:string):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getoficinabydivision.php?';
    const params=new HttpParams().set("id",division);
    return this.http.get<any[]>(apiurl,{params});

}

public GetVentasPorAsesor(Asesor:string,oficina:string,division:string):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getventasporasesor.php?';
    const params=new HttpParams().set("id",Asesor).set("oficina",oficina).set("division",division);
    return this.http.get<any[]>(apiurl,{params});

}
public GetVentasPorOficina(Ofcina:string,division:string):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getventasporoficina.php?';
    const params=new HttpParams().set("id",Ofcina).set("division",division);
    return this.http.get<any[]>(apiurl,{params});

}
public GetVentasAsesorePorOficina(Ofcina:string,Division:string):Observable<any[]>
{
    // let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getvendedorok.php?';
    // const params=new HttpParams().set("id",Division).set("oficina",Ofcina);
    // return this.http.get<any[]>(apiurl,{params});
   let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/geteventaasesoresporoficina.php?';
    const params=new HttpParams().set("id",Division).set("oficina",Ofcina);
    return this.http.get<any[]>(apiurl,{params});

}
public GetVentasDetClientePorAsesor(Asesor:string,oficina:string,division:string):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getdetalleclienteventaporasesor.php?';
    const params=new HttpParams().set("id",Asesor).set("oficina",oficina).set("division",division);
    return this.http.get<any[]>(apiurl,{params});

}

public GetVentasDetClientePorAsesorPortaFolio(Asesor:string,portafolio:string,oficina:string,division:string):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getdetalleclienteventaporasesorportafolio.php?';
    const params=new HttpParams().set("id",Asesor).set("portafolio",portafolio).set("oficina",oficina).set("division",division);
    return this.http.get<any[]>(apiurl,{params});

}
public GetNivelCliente():Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getnivelcliente.php?';
    const params=new HttpParams();
    return this.http.get<any[]>(apiurl,{params});

}

public GetUsuarioBigData(BigdataUsuarioId:string):Observable<any[]>
{
    let apiurl='https://www.dikeninternational.com/dikenecommerce/api/bigdata/getuserbigdata.php?';
    const params=new HttpParams().set("id",BigdataUsuarioId);
    return this.http.get<any[]>(apiurl,{params});

}

}