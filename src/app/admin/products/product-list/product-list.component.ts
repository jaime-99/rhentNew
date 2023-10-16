import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Product } from 'src/app/app.models';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products: Array<Product> = [];
  public viewCol: number = 25;
  public page: any;
  public count = 12;
  public searchText:string="";
  constructor(public appService:AppService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if(window.innerWidth < 1280){
      this.viewCol = 33.3;
    };
    this.getAllProducts();
  }
  public search(event:any){ // Aqui es donde se busca


    this.searchText = (event.target as HTMLInputElement).value;
    console.log(this.searchText);
    this.appService.search.next(this.searchText);

    let queryParams: any = {};
    queryParams.textSearch=this.searchText;
    this.getAllProducts();

    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  }

  public getAllProducts(){
    this.appService.getProductsApi(this.searchText).subscribe(data=>{
      this.products = data;
      //for show more product
      // for (var index = 0; index < 3; index++) {
      //   this.products = this.products.concat(this.products);
      // }
    });
  }

  public onPageChanged(event){
    this.page = event;
    window.scrollTo(0,0);
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }


  public remove(product:any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want delete this product?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        const index: number = this.products.indexOf(product);
        if (index !== -1) {
          this.products.splice(index, 1);
        }
      }
    });
  }

}
