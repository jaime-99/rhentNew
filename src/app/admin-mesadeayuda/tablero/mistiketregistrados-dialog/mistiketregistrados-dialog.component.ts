import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/app.settings';
import { MaService } from '../../ma.service';
import { TiketDialogComponent } from '../../tikets/tiket-dialog/tiket-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmInputDialogComponent } from 'src/app/shared/confirm-input-dialog/confirm-input-dialog.component';

@Component({
  selector: 'app-mistiketregistrados-dialog',
  templateUrl: './mistiketregistrados-dialog.component.html',
  styleUrls: ['./mistiketregistrados-dialog.component.scss']
})
export class MistiketregistradosDialogComponent implements OnInit {
  public page: any;
  public count = 5;
  public dataTiket=[];
  public searchText="";
  public settings:Settings;

  constructor(public snackBar:MatSnackBar,public catservice:MaService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetTikets();
  }
  GetTikets()
  {

    let isopen=localStorage.getItem('isopen');
     let aucatservicethuser=JSON.parse(localStorage.getItem('datalogin')!);

     this.catservice.GetTiketUserEstatus(aucatservicethuser.UsuarioId,"0",isopen).subscribe((res:any)=>{
      
       this.dataTiket=res;
       
 
    });
  }
  public openTicketDialog(data:any){
    const dialogRef = this.dialog.open(TiketDialogComponent, {
 
      data: {
        tiket: data
       
      },
      panelClass: ['theme-dialog'],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(customer => { 
      let isopen=localStorage.getItem('isopen');
      let aucatservicethuser=JSON.parse(localStorage.getItem('datalogin')!);
  console.log(aucatservicethuser);
      this.catservice.GetTiketUserEstatus(aucatservicethuser.UsuarioId,"0",isopen).subscribe((res:any)=>{
       
        this.dataTiket=res;
        
  
     });
      
    });
  }

  Reentiket(tiket)
  {
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    const dialogRef = this.dialog.open(ConfirmInputDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirmar Acción",
        message: "¿Esta seguro de querer re enviar el ticket?"
      }
    }); 
    dialogRef.afterClosed().subscribe(dialogResult => { 
      if(dialogResult.Confirm=="1"){
        this.catservice.UpdateTiket(tiket.TiketId,tiket.SubCategoriaId,'1',tiket.ResponsableId,tiket.Detalle+'//'+dialogResult.Detalle,tiket.Respuesta,tiket.Reasignado ,tiket.ContactoTelefonico,tiket.EsPropio).subscribe((datos:any) => {
          //this.id=datos.id;
    
      
          this.catservice.GetTiket(tiket.TiketId).subscribe((data:any)=>
          {
      
            this.catservice.updatetiketmail(tiket.TiketId,tiket.Categoria,tiket.SubCategoria,tiket.Criticidad,tiket.Usuario,tiket.Responsable,tiket.Detalle+'//'+dialogResult.Detalle,'ABIERTO',tiket.Respuesta,'',tiket.ContactoTelefonico).subscribe((datos:any) => {});
            
          
          }
          );
          this.catservice.AddBitacoraTiket(tiket.TiketId,userauth.UsuarioId,dialogResult.Detalle,"1").subscribe((datos:any) => {});

      
          //this.Swal.SwalAutoCloseRedirect('Tiket','El Tiket se actualizó de forma correcta','/home/tablero','success');
        });
        this.GetTikets();
        this.snackBar.open("El ticket se re-abrio correctamente", '×', { panelClass: "success", verticalPosition: 'top', duration: 3000 })
        setTimeout(() => {
          this.GetTikets();
        }, 500);
        
        

      } 
    }); 
   
  }

  public cerrartiket(tiket)
  {
    this.catservice.UpdateTiket(tiket.TiketId,tiket.SubCategoriaId,'3',tiket.ResponsableId,tiket.Detalle,tiket.Respuesta,tiket.Reasignado ,tiket.ContactoTelefonico,tiket.EsPropio).subscribe((datos:any) => {
      //this.id=datos.id;

  
      this.catservice.GetTiket(tiket.TiketId).subscribe((data:any)=>
      {
  
        this.catservice.updatetiketmail(tiket.TiketId,tiket.Categoria,tiket.SubCategoria,tiket.Criticidad,tiket.Usuario,tiket.Responsable,tiket.Detalle,'CERRADO',tiket.Respuesta,'',tiket.ContactoTelefonico).subscribe((datos:any) => {});
        
      
      }
      );
  
      //this.Swal.SwalAutoCloseRedirect('Tiket','El Tiket se actualizó de forma correcta','/home/tablero','success');
    });
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    this.snackBar.open("El ticket se cerro correctamente", '×', { panelClass: "success", verticalPosition: 'top', duration: 3000 })
    this.catservice.AddBitacoraTiket(tiket.TiketId,userauth.UsuarioId,"El ticket se cerro correctamente","3").subscribe((datos:any) => {});
    setTimeout(() => {
      this.GetTikets();
    }, 500);

  }

  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }
  AbrirTiket(tiket)
  {
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    const dialogRef = this.dialog.open(ConfirmInputDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirmar Acción",
        message: "¿Esta seguro de querer re abrir el ticket?"
      }
    }); 
    dialogRef.afterClosed().subscribe(dialogResult => { 
      if(dialogResult.Confirm=="1"){
        this.catservice.UpdateTiket(tiket.TiketId,tiket.SubCategoriaId,'1',tiket.ResponsableId,tiket.Detalle +'//'+dialogResult.Detalle,tiket.Respuesta,tiket.Reasignado ,tiket.ContactoTelefonico,tiket.EsPropio).subscribe((datos:any) => {
          //this.id=datos.id;
    
      
          this.catservice.GetTiket(tiket.TiketId).subscribe((data:any)=>
          {
      
            this.catservice.updatetiketmail(tiket.TiketId,tiket.Categoria,tiket.SubCategoria,tiket.Criticidad,tiket.Usuario,tiket.Responsable,tiket.Detalle+'//'+dialogResult.Detalle,'ABIERTO',tiket.Respuesta,'',tiket.ContactoTelefonico).subscribe((datos:any) => {});
            
          
          }
          );
          this.catservice.AddBitacoraTiket(tiket.TiketId,userauth.UsuarioId,dialogResult.Detalle,"1").subscribe((datos:any) => {});

      
          //this.Swal.SwalAutoCloseRedirect('Tiket','El Tiket se actualizó de forma correcta','/home/tablero','success');
        });
        this.GetTikets();
        this.snackBar.open("El ticket se re-abrio correctamente", '×', { panelClass: "success", verticalPosition: 'top', duration: 3000 })
        setTimeout(() => {
          this.GetTikets();
        }, 500);
        
        

      } 
    }); 
   
  }

}
