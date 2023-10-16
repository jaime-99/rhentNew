import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BigDataSerivce } from '../service/bigdata.service';
import { CapacitacionesDialogComponent } from './capacitaciones-dialog/capacitaciones-dialog.component';
import { PruebasDialogComponent } from './pruebas-dialog/pruebas-dialog.component';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  public actividadesfiltradas=[];
  public page: any;
  public count = 50;

  constructor(public bgdtaservice:BigDataSerivce,public dialog:MatDialog) { }

  ngOnInit(): void {

    this.bgdtaservice.GetReportesActividadesUsuarios('12','','').subscribe((res)=>{
      this.actividadesfiltradas=res; 
    })
  }
  AddCapacitacion()
  {

    
    const dialogRef = this.dialog.open(CapacitacionesDialogComponent, {
      width:"400px",
      height: '90%',
       data: {
         id:0,
         
       
         
         //stores: this.stores
       },
       panelClass: ['theme-dialog'],
       autoFocus: false
     });
     dialogRef.afterClosed().subscribe(customer => { 
 
       
       
      
     });


  }

    AddPrueba()
  {
    

    
    const dialogRef = this.dialog.open(PruebasDialogComponent, {
      width:"450px",
      height: '95%',
       data: {
         id:0,
         
       
         
         //stores: this.stores
       },
       panelClass: ['theme-dialog'],
       autoFocus: false
     });
     dialogRef.afterClosed().subscribe(customer => { 
 
       
       
      
     });


  }


  AddTrabajoPlanta()
  {
    

    
    const dialogRef = this.dialog.open(PruebasDialogComponent, {
      width:"450px",
      height: '95%',
       data: {
         id:0,
         
       
         
         //stores: this.stores
       },
       panelClass: ['theme-dialog'],
       autoFocus: false
     });
     dialogRef.afterClosed().subscribe(customer => { 
 
       
       
      
     });


  }
  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }

}
