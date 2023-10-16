import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaService } from '../ma.service';
import { TiketDialogComponent } from '../tikets/tiket-dialog/tiket-dialog.component';
import { MistikasignadosDialogComponent } from './mistikasignados-dialog/mistikasignados-dialog.component';
import { MistiketregistradosDialogComponent } from './mistiketregistrados-dialog/mistiketregistrados-dialog.component';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {

  public isuserService=true;
  public tiketsabiertos="";
  public tiketsEnProceso="";
  public tiketsEnEspera="";
  public TiketsAtendidos="";
  public tiketscerrados="";

  public tiketsasignadosabiertos="";
  public tiketsasignadosEnProceso="";
  public tiketsasignadosEnEspera="";
  public tiketsasignadosAtendidos="";
  public tiketsasignadoscerrados=""
  public servicio=0;

  constructor(private tikeservice:MaService,public dialog: MatDialog) { }

  ngOnInit(): void {
   
 this.CargarTablero();

  }

  public CargarTablero()
  {
    let usuarioAuth=JSON.parse(localStorage.getItem('datalogin')!);
    if(usuarioAuth.EsServicio=="1")
    this.isuserService=true;
    else
    this.isuserService=false;
    


    this.tikeservice.GetTablero(usuarioAuth.UsuarioId).subscribe((res:any)=>{
      this.tiketsabiertos=res.MisTiekesAbiertos;
      this.tiketsEnProceso=res.MisTiekesEnProceso;
      this.tiketsEnEspera=res.MisTiekesEnEspera;
      this.TiketsAtendidos=res.MisTiekesAtendidos
      this.tiketscerrados=res.MisTiekesCerrados;

      this.tiketsasignadosabiertos=res.TiekesAsignadosAbiertos;
      this.tiketsasignadosEnProceso=res.TiekesAsignadosEnProceso;
      this.tiketsasignadosEnEspera=res.TiekesAsignadosEnEspera;
      this.tiketsasignadosAtendidos=res.TiekesAsignadosAtendidos;
      this.tiketsasignadoscerrados=res.TiekesAsignadosCerrados;
     

    });



    if (usuarioAuth.EsServicio=="1")
    {
  
      this.isuserService=true;
    }
    else{
      this.isuserService=false;
    }
  }
  public openListTicketDialog(data:any){
    localStorage.removeItem('isopen');
      localStorage.setItem('isopen',data);
      console.log(data);
      const dialogRef = this.dialog.open(MistiketregistradosDialogComponent, {
        height: '90%',
        width: '80%',
        data: {
          customer: data,
          
        },
        panelClass: ['theme-dialog'],
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(customer => { 
        this.CargarTablero();
      });
    }
    
  public openAsigListTicketDialog(data:any){
    localStorage.removeItem('isopen');
      localStorage.setItem('isopen',data);
      console.log(data);
      const dialogRef = this.dialog.open(MistikasignadosDialogComponent, {
        height: '90%',
        width: '80%',
        data: {
          customer: data,
          
        },
        panelClass: ['theme-dialog'],
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(customer => { 
       this. CargarTablero();
      
      });
    }

    
    public openTicketDialog(data:any){
      const dialogRef = this.dialog.open(TiketDialogComponent, {
 
        data: {
          customer: data,
         
        },
        panelClass: ['theme-dialog'],
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(customer => { 
        setTimeout(() => {
          
        
        this.CargarTablero();
        this.CargarTablero();
      }, 700);
      });  
    
    }

}
