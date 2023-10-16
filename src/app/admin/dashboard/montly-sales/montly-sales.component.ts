import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { montly_sales } from '../dashboard.data';

@Component({
  selector: 'app-montly-sales',
  templateUrl: './montly-sales.component.html',
  styleUrls: ['./montly-sales.component.scss']
})
export class MontlySalesComponent implements OnInit {
  public view=[1024,200];
  public data: any[]; 
  public entries:any[];
  public showLegend = false;
  public gradient = true;
  public colorScheme = {
    domain: ['#0833a2','#ff0000', '#F18900', '#11F501','#F3EF00','#800080','#452105']
  }; 
  public showLabels = true;
  public explodeSlices = true;
  public doughnut = true; 
  @ViewChild('resizedDiv') resizedDiv:ElementRef;
  public previousWidthOfResizedDiv:number = 0; 
  
  constructor(public appservice:AppService) { }

  ngOnInit(){

    this.appservice.GetDivisionesCarteraChart('','','','').subscribe((res)=>{

      this.data=res;
      this.appservice.datacarteraChart.divisionesChart=this.data;
      this.entries=res;
    })
   
    // this.data = montly_sales;  
  }
  
  public onSelect(event) {
    console.log(event);
  }
  formator(value: number) {
    // let formatter = new Intl.NumberFormat('ILS', {
    //   style: 'currency',
    //   currency: 'ILS'
    // });
    //let res = 
    return value.toFixed(2)+' mill.'
  }

  formatorPercentage(value: number) {
    // let formatter = new Intl.NumberFormat('ILS', {
    //   style: 'currency',
    //   currency: 'ILS'
    // });
    //let res = 
    return value.toFixed(2);
  }


  ngAfterViewChecked() {    
    if(this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth){
      setTimeout(() => this.data = this.appservice.datacarteraChart.divisionesChart );
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

}
