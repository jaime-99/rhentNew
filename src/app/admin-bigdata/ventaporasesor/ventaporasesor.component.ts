import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Settings } from 'http2';
import { CarteraclientedialogComponent } from '../carteraclientes/carteraclientedialog/carteraclientedialog.component';
import { BigDataSerivce } from '../service/bigdata.service';

@Component({
  selector: 'app-ventaporasesor',
  templateUrl: './ventaporasesor.component.html',
  styleUrls: ['./ventaporasesor.component.scss']
})
export class VentaporasesorComponent implements OnInit {
  public visiblecomboasesor=true;
  
  public vendedorok="";
  public carteraCliente=[];
  public ventadetclienteAsesor=[];
  public ventadetclienteAsesorEquipos=[];
  public ventadetclienteAsesorQuimicos=[];
  public AsesoresOK=[];
  public oficinas=[];
  public visiblecombodivision=true;
  public oficinaSeleccionada="";
  today = new Date;
  year = this.today.getFullYear();

  public page: any;
  public count = 25;
  public ventaAsesor=[];
  
  public searchText="";
  public settings:Settings;
  
    constructor(public appService:BigDataSerivce,public dialog:MatDialog) { }
    changeAsesor(data)
    {
      let suserbigdata=JSON.parse(localStorage.getItem('usuariobigdata')!);
      if( suserbigdata[0].nivel.toUpperCase()=="ASESOR" || suserbigdata[0].nivel.toUpperCase()=="GERENTE")
      {
        this.oficinaSeleccionada=suserbigdata[0].nombre_sucursal;

      }
      this.appService.GetVentasPorAsesor(data,this.oficinaSeleccionada,suserbigdata[0].division).subscribe((res)=>{
      
        this.ventaAsesor=res;
                }    );
      

  this.appService.GetVentasDetClientePorAsesor(data,this.oficinaSeleccionada,suserbigdata[0].division).subscribe((res)=>{

        this.ventadetclienteAsesor=res;
                }    );


      this.appService.GetVentasDetClientePorAsesorPortaFolio(data,'Q',this.oficinaSeleccionada,suserbigdata[0].division).subscribe((res)=>{

        this.ventadetclienteAsesorQuimicos=res;
                }    );

      this.appService.GetVentasDetClientePorAsesorPortaFolio(data,'E',this.oficinaSeleccionada,suserbigdata[0].division).subscribe((res)=>{

        this.ventadetclienteAsesorEquipos=res;
                }    );

    



    }
    changeOficina(data)
    {
      this.oficinaSeleccionada=data;
      let suserbigdata=JSON.parse(localStorage.getItem('usuariobigdata')!);
      this.appService.GetVendedorOK(suserbigdata[0].division,data).subscribe((res)=>{
      
        this.AsesoresOK=res;
                }    );
      
    



    }
    
    ngOnInit(): void {
  
      let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    
      let suserbigdata=JSON.parse(localStorage.getItem('usuariobigdata')!);
      this.oficinaSeleccionada=suserbigdata[0].nombre_sucursal;
      this.vendedorok=suserbigdata[0].vendedorOK;
      if( suserbigdata[0].nivel.toUpperCase()=="ASESOR")
      {
        this.visiblecombodivision=false;
        this.visiblecomboasesor=false;
      }
      else if( suserbigdata[0].nivel.toUpperCase()=="GERENTE")
      {
        this.visiblecomboasesor=true;
        this.visiblecombodivision=false;

      }
      
this.appService.getoficinabydivision(suserbigdata[0].division).subscribe((res)=>{
      
        this.oficinas=res;
                }    );


      this.appService.GetVendedorOK(suserbigdata[0].division,suserbigdata[0].nombre_sucursal).subscribe((res)=>{
      
        this.AsesoresOK=res;
                }    );
  
      this.appService.GetVentasPorAsesor(suserbigdata[0].vendedorOK,this.oficinaSeleccionada,suserbigdata[0].division).subscribe((res)=>{
      
        this.ventaAsesor=res;
                }    );
      

  this.appService.GetVentasDetClientePorAsesor(suserbigdata[0].vendedorOK,this.oficinaSeleccionada,suserbigdata[0].division).subscribe((res)=>{

        this.ventadetclienteAsesor=res;
                }    );


      this.appService.GetVentasDetClientePorAsesorPortaFolio(suserbigdata[0].vendedorOK,'Q',this.oficinaSeleccionada,suserbigdata[0].division).subscribe((res)=>{

        this.ventadetclienteAsesorQuimicos=res;
                }    );

      this.appService.GetVentasDetClientePorAsesorPortaFolio(suserbigdata[0].vendedorOK,'E',this.oficinaSeleccionada,suserbigdata[0].division).subscribe((res)=>{

        this.ventadetclienteAsesorEquipos=res;
                }    );

       

    }

    

    getColor(percentage) {
      if(percentage <=40)
      { 
        return 'mat-cell2 mat-color-red'
      }
      if(percentage>=41 && percentage <=70)
      {
        return 'mat-cellyellow'
      }
      if(percentage>=71)
      {
        return 'mat-cell2 mat-color-green'
      }

    }

    getColor2(percentage) {
      if(percentage <=50)
      { 
        return 'red'
      }
      if(percentage>50 && percentage <=99)
      {
        return 'yellow'
      }
      if(percentage>=100)
      {
        return 'green'
      }

    }




    public onPageChanged(event){
      this.page = event; 
      window.scrollTo(0,0); 
    }
   
  
  }
  