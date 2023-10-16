import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Settings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MaService } from '../ma.service';
import { CategoriaDialogComponent } from './categoria-dialog/categoria-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  
  public page: any;
  public count = 10;
  public datCategoria=[];
  public searchText="";
  public settings:Settings;
  constructor(public snackBar:MatSnackBar,private catservice:MaService,public dialog:MatDialog) { }

  ngOnInit(): void {

    this. GetCategorias();
  }


  GetCategorias()
  {
    this.catservice.GetAllCategory().subscribe((res:any)=>{
  
      this.datCategoria=res;
      console.log(this.datCategoria);
      
   });

  }
  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }

  public remove(ticket:any){  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want remove this ticket?"
      }
    }); 
    dialogRef.afterClosed().subscribe(dialogResult => { 
    
    }); 
  }

  public openTicketDialog(data:any){
    const dialogRef = this.dialog.open(CategoriaDialogComponent, {
 
      data: {
        categoria: data,
        //stores: this.stores
      },
      panelClass: ['theme-dialog'],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(customer => { 

      this. GetCategorias();
   
      
     
    });
  }

  ActivarTogle(categoria)
  {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirmar Acción",
        message: "¿Esta seguro de querer "+categoria.Activar+" la Categoria?"
      }
    }); 
    dialogRef.afterClosed().subscribe(dialogResult => { 
      if(dialogResult){
        
        this.catservice.UpdateCategory(categoria.CategoriaId,categoria.DepartamentoId,categoria.Categoria,categoria.Active=="1"?"0":"1").subscribe((datos:any) => {
   
          this.snackBar.open("Acción realizada con exito", '×', { panelClass: "success", verticalPosition: 'top', duration: 3000 })
          this.GetCategorias();
          // this.ok=datos.ok;
          // this.message=datos.message;
          // //alert(datos.message);
          // console.log(datos);
        });

        

      } 
    }); 
   
  }

}
