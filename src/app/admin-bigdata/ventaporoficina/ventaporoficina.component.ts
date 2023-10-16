import { Component, OnInit } from '@angular/core';
import { OficinavendedroeRes } from '../models/OficinaVendedores';
import { BigDataSerivce } from '../service/bigdata.service';

@Component({
  selector: 'app-ventaporoficina',
  templateUrl: './ventaporoficina.component.html',
  styleUrls: ['./ventaporoficina.component.scss']
})
export class VentaporoficinaComponent implements OnInit {
  ventaporoficina=[];
  ventaAsesoresOficina=[];
  oficinas=[];
  public visiblecombodivision=true;
  public oficinaSeleccionada="";
  today = new Date;
  year = this.today.getFullYear();
  constructor(public appService:BigDataSerivce) { }

  ngOnInit(): void {
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
      let suserbigdata=JSON.parse(localStorage.getItem('usuariobigdata')!);
      this.oficinaSeleccionada=suserbigdata[0].nombre_sucursal;


      this.appService.getoficinabydivision(suserbigdata[0].division).subscribe((res)=>{
      
        this.oficinas=res;
                }    );

                if( suserbigdata[0].nivel.toUpperCase()=="GERENTE")
                {
                  
                  this.visiblecombodivision=false;
          
                }         



      this.appService.GetVentasPorOficina(this.oficinaSeleccionada,suserbigdata[0].division).subscribe((res)=>{
      
        this.ventaporoficina=res;
                }    );

                this.appService.GetVentasAsesorePorOficina(this.oficinaSeleccionada,suserbigdata[0].division).subscribe((res)=>{
      
                  this.ventaAsesoresOficina=res;
                          }    );
      //this.vendedorok=suserbigdata[0].vendedorOK;
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
  changeOficina(data)
  {
    this.oficinaSeleccionada=data;
    let suserbigdata=JSON.parse(localStorage.getItem('usuariobigdata')!);
    this.appService.GetVentasPorOficina(this.oficinaSeleccionada,suserbigdata[0].division).subscribe((res)=>{
      
      this.ventaporoficina=res;
              }    );

              this.appService.GetVentasAsesorePorOficina(this.oficinaSeleccionada,suserbigdata[0].division).subscribe((res)=>{
    
                this.ventaAsesoresOficina=res;
                        }    );
  }
}
