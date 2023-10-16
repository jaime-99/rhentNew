import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Settings } from 'http2';
import { AppService } from 'src/app/app.service';
import { BigDataSerivce } from '../service/bigdata.service';
import { CarteraclientedialogComponent } from './carteraclientedialog/carteraclientedialog.component';

@Component({
  selector: 'app-carteraclientes',
  templateUrl: './carteraclientes.component.html',
  styleUrls: ['./carteraclientes.component.scss']
})
export class CarteraclientesComponent implements OnInit {
public carteraCliente=[];
public page: any;
public count = 25;
public datCategoria=[];

public searchText="";
public settings:Settings;

  constructor(public appService:BigDataSerivce,public dialog:MatDialog) { }

  ngOnInit(): void {

    let userauth=JSON.parse(localStorage.getItem('datalogin')!);

    this.appService.GetCarteraClientesBigData(userauth.BigDataUsuarioId).subscribe((res)=>{
    
      this.carteraCliente=res;
              }    );
  }
  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }
  public openCarteraClientedialog(data:any){
    const dialogRef = this.dialog.open(CarteraclientedialogComponent, {
 
      data: {
       Cliente: data,
        //stores: this.stores
      },
      panelClass: ['theme-dialog'],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(customer => { 

      let userauth=JSON.parse(localStorage.getItem('datalogin')!);

    this.appService.GetCarteraClientesBigData(userauth.BigDataUsuarioId).subscribe((res)=>{
    
      this.carteraCliente=res;
              }    );
      
     
    });
  }

}
