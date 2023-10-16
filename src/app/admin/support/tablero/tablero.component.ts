import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SupportService } from '../service/support.service';
import { SupportDialogComponent } from '../support-dialog/support-dialog.component';
import { SupportlistDialogComponent } from '../supportlist-dialog/supportlist-dialog.component';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {

  constructor(private tikeservice:SupportService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

public openListTicketDialog(data:any){
  localStorage.removeItem('isopen');
    localStorage.setItem('isopen',data);
    console.log(data);
    const dialogRef = this.dialog.open(SupportlistDialogComponent, {
      height: '90%',
      width: '80%',
      data: {
        customer: data,
        
      },
      panelClass: ['theme-dialog'],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(customer => { 
    
    });
  }
  
  public openTicketDialog(data:any){
    
    const dialogRef = this.dialog.open(SupportDialogComponent, {
      
      panelClass: ['theme-dialog'],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(customer => { 
    //   this.tikeservice.GetAllTiket().subscribe((res:any)=>{
  
    //     this.dataTiket=res;
        
    //  });
      // if(customer){    
      //   const index: number = this.dataTiket.findIndex(x => x.id == customer.id);
      //   if(index !== -1){
      //     this.dataTiket[index] = customer;
      //   } 
      //   else{ 
      //     let last_customer= this.dataTiket[this.dataTiket.length - 1]; 
      //     customer.id = last_customer.id + 1;
      //     this.dataTiket.push(customer);  
      //   }          
      // }
    });
  }

}
