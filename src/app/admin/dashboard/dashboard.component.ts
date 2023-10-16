import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { transactions } from '../analytics/analytics.data';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public transactions: any[];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Store';
  public showYAxisLabel = true;
  public yAxisLabel = 'Transactions';
  public colorScheme = {
    domain: ['#3F51B5', '#E91E63', '#43A047', '#FDD835', '#F4511E', '#606060']
  };   
  constructor(appservice:AppService) { 
    appservice.GetCarteraAntiguedad('','','','').subscribe((res)=>{
      appservice.datacarteraChart.porAntiguedadChar=res;
      console.log(appservice.datacarteraChart.porAntiguedadChar);
    }) 
}

public onSelect(event) {
  console.log(event);
  alert(event.name+'- '+event.value);
}

  ngOnInit(): void {
  }

}
