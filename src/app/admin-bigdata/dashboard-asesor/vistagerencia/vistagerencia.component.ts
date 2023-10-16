import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { BigDataSerivce } from '../../service/bigdata.service';


@Component({
  selector: 'app-vistagerencia',
  templateUrl: './vistagerencia.component.html',
  styleUrls: ['./vistagerencia.component.scss']
})
export class VistagerenciaComponent implements OnInit,AfterViewInit {
  public botones=[];
  single: any[];
  capacitaciones:any[];
  pruebas:any[];
  trabajoplanta:any[];
  cotizaciones:any[];
  public reporteglobal=0;
  public today=new Date();
  public reportesCapacitacion=0;
  public metasCapacitacion=0;
  public reportePruebas=0;
  public metasPruebas=0;
  public reportesTrabajoPlanta=0;
  public metasTrabajoPlanta=0;
  public reportesCotizaciones=0;
  public metasCotizaciones=0;
  public clientesnuevos=0;
  public anio=this.today.getFullYear();
  public mes=this.today.getUTCMonth()+1;
  public visiblecomboasesor=true;
  public AsesoresOK=[];
  public AsesroSelccionado=0;
  public mesnombreSeleccionado="";
  public form: FormGroup;
  legend: boolean = false;
  view: any[] =[300, 300];
  legendPosition: string = 'below';

  CapacitacionColor = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  PruebasColor = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  TrabjoPlantaColor = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  CotizacionesColor = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  @ViewChild('resizedDiv') resizedDiv:ElementRef;
  @ViewChild('chartArea', { static: true })
chartArea: ElementRef;
@ViewChild('selectRef') selectRef: MatSelect;

  ngAfterViewInit() {

  }

setViewSize() 
{
  
this.view =
[ 300, 300] ;
  
}
  constructor(public bgdservice:BigDataSerivce, public fb: FormBuilder) { }

filtrar(data)
{
  this.mesnombreSeleccionado=data.MesNombre+' '+data.Anio;

  this.ObtenerDatos(data.Anio,data.MesNumero,this.AsesroSelccionado)
  this.anio=data.Anio;
  this.mes=data.MesNumero;

}


  ngOnInit(): void {
    this.form = this.fb.group({
      usuario_id: [0,],
    });
    this.mesnombreSeleccionado=this.obtenernombremes(this.mes);
    let suserbigdata=JSON.parse(localStorage.getItem('usuariobigdata')!);

    if( suserbigdata[0].nivel.toUpperCase()=="ASESOR")
    {
      this.AsesroSelccionado= suserbigdata[0].usuario_id;
      this.visiblecomboasesor=false;
    }
    else if( suserbigdata[0].nivel.toUpperCase()=="GERENTE")
    {
      this.visiblecomboasesor=true;
      this.bgdservice.GetVendedorOK(suserbigdata[0].division,suserbigdata[0].nombre_sucursal).subscribe((res)=>{
      
        this.AsesoresOK=res;
        this.AsesroSelccionado=res[0].usuario_id;

        this.form.controls['usuario_id'].setValue(res[0].usuario_id);
      });
    }
     



      this.ObtenerDatos(this.anio,this.mes+1,this.AsesroSelccionado);
    
  

  }
  public obtenernombremes(mes)
  {
    switch (mes) {
      case 1:
      return 'ENERO '+this.anio
        
        break;
        case 2:
      return 'FEBRERO '+this.anio
        
        break;
        case 3:
      return 'MARZO '+this.anio
        
        break;
        case 4:
      return 'ABRIL '+this.anio
        
        break;
        case 5:
      return 'MAYO '+this.anio
        
        case 6:
      return 'JUNIO '+this.anio
        
        case 7:
      return 'JULIO '+this.anio
        
        case 8:
      return 'AGOSTO '+this.anio
        
        case 9:
      return 'SEPTIEMBRE '+this.anio
        
        case 10:
      return 'OCTUBRE '+this.anio
        
       
        case 11:
         
    
      return 'NOVIEMBRE '+this.anio
      case 12:
         
    
      return 'DICIEMBRE '+this.anio
    
        
       
      default:
        break;
    }  
  }
  generarpdf()
  {
    
    
    window.open('https://www.dikeninternational.com/bigdata/exports/exportar_reporteo_asesor_alimentos.php?mes='+this.mes+ '&anio='+this.anio+'&idusuario='+this.AsesroSelccionado, '_blank');
  }
  getColor(percentage) {
    if(percentage <=40)
    { 
      return '#ff0000'

    }
    if(percentage>=41 && percentage <=70)
    {
      return '#FFFF00'
    }
    if(percentage>=71)
    {
      return '#2d572c'
    }

  }
  
  getcolortile(valor)
  {
    if(valor>0)
    { return 'gradient-gray tile p-1';}
    else{ return 'gradient-red tile p-1'}

  }

  ObtenerDatos(anio,mes,asesorSeleccionado)
  {
    

    this.bgdservice.GetMesesReporte().subscribe((res)=>{
      this.botones=res; })
      

      this.bgdservice.GetMesesReporteDetallePorAsesor(asesorSeleccionado,anio,mes).subscribe((res)=>{
        this.reporteglobal=0;
        
        this. reportesCapacitacion=0;
        this. metasCapacitacion=0;
        this. reportePruebas=0;
        this. metasPruebas=0;
        this. reportesTrabajoPlanta=0;
        this. metasTrabajoPlanta=0;
        this. reportesCotizaciones=0;
        this. metasCotizaciones=0;
        this.clientesnuevos=0;
        this.capacitaciones=[];
        this. pruebas=[];
        this.trabajoplanta=[];
        this.cotizaciones=[];
          res.forEach(reporte=>{
            this.reporteglobal+=reporte.Realizado;
            if(reporte.tipo=="capacitacion")
            {
              this.CapacitacionColor={domain:[this.getColor((reporte.Realizado*100)/reporte.Meta)]};
              this.reportesCapacitacion=reporte.Realizado;
              this.metasCapacitacion=reporte.Meta;
              if (this.reportesCapacitacion>this.metasCapacitacion)
              {
               this.capacitaciones=[{
                name:reporte.tipo,
                value:reporte.Meta
               }]
              }
              else{
                this.capacitaciones=[{
                  name:reporte.tipo,
                  value:reporte.Realizado
                 }]
              }
            }
            else if (reporte.tipo=="pruebas")
            {
              this.PruebasColor={domain:[this.getColor((reporte.Realizado*100)/reporte.Meta)]};
              this.reportePruebas=reporte.Realizado;
              this.metasPruebas=reporte.Meta;
              if (this.reportePruebas>this.metasPruebas)
              {
               this.pruebas=[{
                name:reporte.tipo,
                value:reporte.Meta
               }]
              }
              else{
                this.pruebas=[{
                  name:reporte.tipo,
                  value:reporte.Realizado
                 }]
              }
            }
            else if (reporte.tipo=="cotizaciones")
            {
              this.CotizacionesColor={domain:[this.getColor((reporte.Realizado*100)/reporte.Meta)]};
              this.reportesCotizaciones=reporte.Realizado;
              this.metasCotizaciones=reporte.Meta;
              if (this.reportesCotizaciones>this.metasCotizaciones)
              {
               this.cotizaciones=[{
                name:reporte.tipo,
                value:reporte.Meta
               }]
              }
              else{
                this.cotizaciones=[{
                  name:reporte.tipo,
                  value:reporte.Realizado
                 }]
              }
            }
            else if (reporte.tipo=="trabajo-en-planta")
            {
              this.TrabjoPlantaColor={domain:[this.getColor((reporte.Realizado*100)/reporte.Meta)]};
              this.reportesTrabajoPlanta=reporte.Realizado;
              this.metasTrabajoPlanta=reporte.Meta;
              if (this.reportesTrabajoPlanta>this.metasTrabajoPlanta)
              {
               this.trabajoplanta=[{
                name:reporte.tipo,
                value:reporte.Meta
               }]
              }
              else{
                this.trabajoplanta=[{
                  name:reporte.tipo,
                  value:reporte.Realizado
                 }]
              }
            }
            else if(reporte.tipo=="clientes-nuevos")
            {
              this.clientesnuevos=reporte.Realizado;
            }
          })

      })

  }
  changeAsesor(data)
  {
   this.AsesroSelccionado=data;
    this.ObtenerDatos(this.anio,this.mes,data);
    

  



  }

}
