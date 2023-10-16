import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { sales_summary } from 'src/app/admin/analytics/analytics.data';
import { MaService } from '../../ma.service';

@Component({
  selector: 'app-montly-sales',
  templateUrl: './montly-sales.component.html',
  styleUrls: ['./montly-sales.component.scss']
})
export class MontlySalesComponent implements OnInit {
  public sales_summary: any[];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Responsables';
  public showYAxisLabel = true;
  public yAxisLabel = '# Tikets';
  public colorScheme = {
    domain: ['#2F3E9E',  '#0096A6','#D22E2E', '#F47B00','#378D3B', '#606060']
  };  
today=new Date();
  constructor(public maservice:MaService) { 
    maservice.GetDashboardTiketResponsablesBydpto('23',new Date(this.today.getFullYear(), 0, 1).toDateString(),new Date().toDateString()).subscribe((res:any)=>{
      this.sales_summary=res;
      //Object.assign(this, {res}); 

    });
    
  }

  ngOnInit(): void {
  }

  public onSelect(event) {
    console.log(event);
  }

}
