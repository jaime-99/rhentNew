import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-cproductlist',
  templateUrl: './cproductlist.component.html',
  styleUrls: ['./cproductlist.component.scss']
})
export class CproductlistComponent implements OnInit {
  @Input('products') products: Array<Product> = [];
  @Input('ProductoPadreId') ProductoPadreId:any;
  @Input('EsRelacionado') EsRelacionado:any;

  public viewCol: number = 25;
  public page: any;
  public count = 12;
  public searchText:string="";
  constructor(public appService:AppService) { }

  ngOnInit(): void {
  }
  agrega()
  {
    alert(this.EsRelacionado);
  }
  public search(event:any){


    this.searchText = (event.target as HTMLInputElement).value;
    console.log(this.searchText);
    this.appService.search.next(this.searchText);

    let queryParams: any = {};
    queryParams.textSearch=this.searchText;
    

    // setTimeout(() => {
    //   window.location.reload();
    // }, 500);
  }


}
