import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Settings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SupportService } from './service/support.service';
import { SupportDialogComponent } from './support-dialog/support-dialog.component';


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  public tickets = [
    { id: 1, statusId: 1, code: '#000625', supportCategoryId: 1, issue: 'lorem ipsum', order: '#1556', customer: 'Andy Warhol', storeId: 1, date: new Date(2020,1,15,10,45) },
    { id: 2, statusId: 2, code: '#002350', supportCategoryId: 2, issue: 'lorem ipsum', order: '#5214', customer: 'Luisa Styles', storeId: 2, date: new Date(2020,2,8,22,12) },
    { id: 3, statusId: 3, code: '#007852', supportCategoryId: 3, issue: 'lorem ipsum', order: '#4285', customer: 'Michael Blair', storeId: 2, date: new Date(2020,3,29,14,30) },
    { id: 4, statusId: 4, code: '#009621', supportCategoryId: 4, issue: 'lorem ipsum', order: '#3658', customer: 'Julia Aniston', storeId: 1, date: new Date(2020,4,18,8,20) }
  ];
  public statuses = [
    { id: 1, name: 'In Progress' },
    { id: 2, name: 'Pending' },
    { id: 3, name: 'Solved' },
    { id: 4, name: 'Closed' } 
  ];
  public spportCategories = [
    { id: 1, name: 'Pre-Sale Question' },
    { id: 2, name: 'Order Question' },
    { id: 3, name: 'Shipping' },
    { id: 4, name: 'Product Availability' } 
  ];
  public stores = [
    { id: 1, name: 'Store 1' },
    { id: 2, name: 'Store 2' }
  ];
  public page: any;
  public count = 6;
  public dataTiket=[];
  public searchText="";
  public settings:Settings;
  constructor(private tikeservice:SupportService,public dialog: MatDialog) {
    


   }

  ngOnInit(): void {

    this.tikeservice.GetAllTiket().subscribe((res:any)=>{
  
      this.dataTiket=res;
      
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
      if(dialogResult){
        const index: number = this.tickets.indexOf(ticket);
        if (index !== -1) {
          this.tickets.splice(index, 1);  
        } 
      } 
    }); 
  }

  public openTicketDialog(data:any){
    const dialogRef = this.dialog.open(SupportDialogComponent, {
 
      data: {
        customer: data,
        stores: this.stores
      },
      panelClass: ['theme-dialog'],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(customer => { 
      this.tikeservice.GetAllTiket().subscribe((res:any)=>{
  
        this.dataTiket=res;
        
     });
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
