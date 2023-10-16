import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/app.settings';
import { MaService } from '../../ma.service';
import { TiketDialogComponent } from '../../tikets/tiket-dialog/tiket-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmInputDialogComponent } from 'src/app/shared/confirm-input-dialog/confirm-input-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-mistikasignados-dialog',
  templateUrl: './mistikasignados-dialog.component.html',
  styleUrls: ['./mistikasignados-dialog.component.scss']
})
export class MistikasignadosDialogComponent implements OnInit {
  public page: any;
  public count = 5;
  public dataTiket=[];
  public searchText="";
  public settings:Settings;

  constructor(public snackBar:MatSnackBar,public catservice:MaService,public dialog: MatDialog) { }

  ngOnInit(): void {
  this. GetTikets();
  }
  GetTikets()
  {
    let isopen=localStorage.getItem('isopen');
    let aucatservicethuser=JSON.parse(localStorage.getItem('datalogin')!);

    this.catservice.GetTiketUserEstatus("0",aucatservicethuser.UsuarioId,isopen).subscribe((res:any)=>{
     
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
      this. GetTikets();
      
    });
  }
public  showbtnproce(EstatusTiketId):Boolean
{
  if(EstatusTiketId==1 ||EstatusTiketId==5)
  {
    return true;
  }
  else{
    return false;
  }

}
  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }

  public Procesartiket(tiket)
  {
    this.catservice.UpdateTiket(tiket.TiketId,tiket.SubCategoriaId,'2',tiket.ResponsableId,tiket.Detalle,tiket.Respuesta,tiket.Reasignado ,tiket.ContactoTelefonico,tiket.EsPropio).subscribe((datos:any) => {
      //this.id=datos.id;

  
      this.catservice.GetTiket(tiket.TiketId).subscribe((data:any)=>
      {
  
        this.catservice.updatetiketmail(tiket.TiketId,tiket.Categoria,tiket.SubCategoria,tiket.Criticidad,tiket.Usuario,tiket.Responsable,tiket.Detalle,'EN PROCESO',tiket.Respuesta+'// El tiket esta en proceso de atención','',tiket.ContactoTelefonico).subscribe((datos:any) => {});
        
      
      }
      );
  
      //this.Swal.SwalAutoCloseRedirect('Tiket','El Tiket se actualizó de forma correcta','/home/tablero','success');
    });
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    // this.snackBar.open("El tiket se cerro correctamente", '×', { panelClass: "success", verticalPosition: 'top', duration: 3000 })
    this.catservice.AddBitacoraTiket(tiket.TiketId,userauth.UsuarioId,"El tiket esta en proceso","2").subscribe((datos:any) => {});
    setTimeout(() => {
      this.GetTikets();
    }, 500);

  }
  PausarTiket(tiket)
  {
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    const dialogRef = this.dialog.open(ConfirmInputDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirmar Acción",
        message: "¿Esta seguro de querer poner en espera el ticket?"
      }
    }); 
    dialogRef.afterClosed().subscribe(dialogResult => { 
      if(dialogResult.Confirm=="1"){
        this.catservice.UpdateTiket(tiket.TiketId,tiket.SubCategoriaId,'5',tiket.ResponsableId,tiket.Detalle,tiket.Respuesta+'-'+dialogResult.Detalle,tiket.Reasignado ,tiket.ContactoTelefonico,tiket.EsPropio).subscribe((datos:any) => {
          //this.id=datos.id;
    
      
          this.catservice.GetTiket(tiket.TiketId).subscribe((data:any)=>
          {
      
            this.catservice.updatetiketmail(tiket.TiketId,tiket.Categoria,tiket.SubCategoria,tiket.Criticidad,tiket.Usuario,tiket.Responsable,tiket.Detalle,'ABIERTO',tiket.Respuesta+'-'+dialogResult.Detalle,'',tiket.ContactoTelefonico).subscribe((datos:any) => {});
            
          
          }
          );
          this.catservice.AddBitacoraTiket(tiket.TiketId,userauth.UsuarioId,dialogResult.Detalle,"5").subscribe((datos:any) => {});

      
          //this.Swal.SwalAutoCloseRedirect('Tiket','El Tiket se actualizó de forma correcta','/home/tablero','success');
        });
        this.GetTikets();
        this.snackBar.open("El ticket se puso en espera", '×', { panelClass: "success", verticalPosition: 'top', duration: 3000 })
        setTimeout(() => {
          this.GetTikets();
        }, 500);
        
        

      } 
    }); 
   
  }

  TerminarTiket(tiket)
  {
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    const dialogRef = this.dialog.open(ConfirmInputDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirmar Acción",
        message: "¿Esta seguro de querer finalizar el ticket?"
      }
    }); 
    dialogRef.afterClosed().subscribe(dialogResult => { 
      if(dialogResult.Confirm=="1"){
       // alert(dialogResult.EsPropio);

        //return;
        this.catservice.UpdateTiket(tiket.TiketId,tiket.SubCategoriaId,'4',tiket.ResponsableId,tiket.Detalle,dialogResult.Detalle,tiket.Reasignado ,tiket.ContactoTelefonico,dialogResult.EsPropio).subscribe((datos:any) => {
          //this.id=datos.id;
    
      
          this.catservice.GetTiket(tiket.TiketId).subscribe((data:any)=>
          {
      
            this.catservice.updatetiketmail(tiket.TiketId,tiket.Categoria,tiket.SubCategoria,tiket.Criticidad,tiket.Usuario,tiket.Responsable,tiket.Detalle,'ATENDIDO',dialogResult.Detalle,'',tiket.ContactoTelefonico).subscribe((datos:any) => {});
            
          
          }
          );
          this.catservice.AddBitacoraTiket(tiket.TiketId,userauth.UsuarioId,dialogResult.Detalle,"4").subscribe((datos:any) => {});

      
          //this.Swal.SwalAutoCloseRedirect('Tiket','El Tiket se actualizó de forma correcta','/home/tablero','success');
        });
        this.GetTikets();
        this.snackBar.open("El ticket se finalizo correctamente", '×', { panelClass: "success", verticalPosition: 'top', duration: 3000 })
        setTimeout(() => {
          this.GetTikets();
        }, 500);
        
        

      } 
    }); 
   
  }


}
