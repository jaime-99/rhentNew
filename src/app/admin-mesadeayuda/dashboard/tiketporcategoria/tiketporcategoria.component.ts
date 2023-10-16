import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MaService } from '../../ma.service';


import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from "@amcharts/amcharts5/percent";

import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Micro from "@amcharts/amcharts5/themes/Micro";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { any } from '@amcharts/amcharts5/.internal/core/util/Array';

///
 



@Component({
  selector: 'app-tiketporcategoria',
  templateUrl: './tiketporcategoria.component.html',
  styleUrls: ['./tiketporcategoria.component.scss'],
  
})
export class TiketporcategoriaComponent implements OnInit,AfterViewInit {
////

data = [
  {
    name: 'Jose',
    steps: 45688,
    pictureSettings: {
      src: 'https://dikeninternational.com/rhnet/uploads/1666978736.jpg',
    },
  },
  {
    name: 'Joey',
    steps: 35781,
    pictureSettings: {
      src: 'https://www.amcharts.com/wp-content/uploads/2019/04/joey.jpg',
    },
  },
  {
    name: 'Ross',
    steps: 25464,
    pictureSettings: {
      src: 'https://www.amcharts.com/wp-content/uploads/2019/04/ross.jpg',
    },
  },
  {
    name: 'Phoebe',
    steps: 18788,
    pictureSettings: {
      src: 'https://www.amcharts.com/wp-content/uploads/2019/04/phoebe.jpg',
    },
  },
  {
    name: 'Rachel',
    steps: 15465,
    pictureSettings: {
      src: 'https://www.amcharts.com/wp-content/uploads/2019/04/rachel.jpg',
    },
  },
  {
    name: 'Chandler',
    steps: 11561,
    pictureSettings: {
      src: 'https://www.amcharts.com/wp-content/uploads/2019/04/chandler.jpg',
    },
  },
];
 
  ////
   today = new Date
   month = this.today.getMonth();
   year = this.today.getFullYear();
   campaignOne = new FormGroup({
    start: new FormControl(new Date(this.year, 0, 1)),
    end: new FormControl(new Date()),
  });

  public page: any;
  public sales_summary: any[];
  public TiketsCategoria: any[];
  public detallecategoria=[];
  public tiempatencion:any[];
  public tiempEstimado:any[];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Responsables';
  public showYAxisLabel = true;
  public yAxisLabel = '# Tikets';
  public xlabelChartTiempo="Tiempo en horas"
  public ylabelChartTiempo="Categorías"
  public view=[2000,400];
  public tablavisible=false;
  public CategoriaSeleccionada="";
  public dataresp=["",""];
  public dataresparray:any[];
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };  
  public colorScheme2 = {
    domain: ['#2F3E9E',  '#0096A6','#D22E2E', '#F47B00','#378D3B', '#606060']
  }; 
  public colorScheme3 = {
    domain: ['#D22E2E', '#2F3E9E',  '#0096A6', '#F47B00','#378D3B', '#606060']
  };  
  @ViewChild('resizedDiv') resizedDiv:ElementRef;
  @ViewChild('chartArea', { static: true })
chartArea: ElementRef;

  constructor(public maservice:MaService) { 

    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    maservice.GetDashboardTopCategoriasTiket(userauth.DepartamentoId,new Date(this.year, 0, 1).toLocaleDateString(),new Date().toLocaleDateString()).subscribe((res:any)=>{
      this.TiketsCategoria=res;
      //Object.assign(this, {res}); 

    });
    maservice.GetDashboardTiketResponsablesBydpto(userauth.DepartamentoId,new Date(this.year, 0, 1).toLocaleDateString(),new Date().toLocaleDateString()).subscribe((res:any)=>{
      this.sales_summary=res;
      //Object.assign(this, {res}); 

    });
  

    maservice.GetDashboardTiempoAtencionPorCategoria(userauth.DepartamentoId,new Date(this.year, 0, 1).toLocaleDateString(),new Date().toLocaleDateString()).subscribe((res:any)=>{
      this.tiempatencion=res;
      //Object.assign(this, {res}); 

    });

maservice.GetDashboardTiempoEstimadoPorCategoria(userauth.DepartamentoId,new Date(this.year, 0, 1).toLocaleDateString(),new Date().toLocaleDateString()).subscribe((res:any)=>{
      this.tiempEstimado=res;
      //Object.assign(this, {res}); 

    });

  }
  ngAfterViewInit(): void {
  
  }

  setViewSize() 
  {
    this.view=undefined;
 
  }


  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }
  ngOnInit(): void {
    this.maservice.GetDashboardTiketResponsablesBydptoAmchart(23,new Date(this.year, 0, 1).toLocaleDateString(),new Date().toLocaleDateString()).subscribe((res:any)=>{
      this.dataresparray=res;
      this.initBar(res);

    });
    
  }
  xAxisTickFormatting(value: any) {
    return value.split("").join("\n");
  }
  Filtrar(){
    const {start,end}=this.campaignOne.value;
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);

   this. maservice.GetDashboardTiketResponsablesBydpto(userauth.DepartamentoId,start.toLocaleDateString(),end.toLocaleDateString()).subscribe((res:any)=>{
      this.sales_summary=res;
      //Object.assign(this, {res}); 

    });
    this.maservice.GetDashboardTiketResponsablesBydptoAmchart(userauth.DepartamentoId,new Date(this.year, 0, 1).toLocaleDateString(),new Date().toLocaleDateString()).subscribe((res:any)=>{
      this.dataresparray=res;
      this.initBar(res);

    });
    this.maservice.GetDashboardTopCategoriasTiket(userauth.DepartamentoId,start.toLocaleDateString(),end.toLocaleDateString()).subscribe((res:any)=>{
      this.TiketsCategoria=res;
      //Object.assign(this, {res}); 

    });
    this.maservice.GetDashboardTiempoAtencionPorCategoria(userauth.DepartamentoId,start.toLocaleDateString(),end.toLocaleDateString()).subscribe((res:any)=>{
      this.tiempatencion=res;
      //Object.assign(this, {res}); 

    });
    this.maservice.GetDashboardTiempoEstimadoPorCategoria(userauth.DepartamentoId,start.toLocaleDateString(),end.toLocaleDateString()).subscribe((res:any)=>{
          this.tiempEstimado=res;
          //Object.assign(this, {res}); 

        });
    
  }

  public onSelect(event) {
    console.log(event);
  }

public onSelectDetalleTicket(event) {
    console.log(event);
  }
   handleColumnClick(ev) {
    console.log("Clicked on a column", ev.target);
  }
  
 public onSelectDetalle(event) {
  console.log(event);
  this.CategoriaSeleccionada=event.series;
  const {start,end}=this.campaignOne.value;
  let userauth=JSON.parse(localStorage.getItem('datalogin')!);
  this.maservice.GetDashboardDetalleTiempoAtencionPorCategoria(userauth.DepartamentoId,start.toLocaleDateString(),end.toLocaleDateString(),event.series).subscribe((res:any)=>{
    this.detallecategoria=res;
    //Object.assign(this, {res}); 

  });
  this.tablavisible=true;

  }


  initBar(data:any[]) {
    let root = am5.Root.new('chartdiv');
    
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    root.setThemes([
      am5themes_Responsive.new(root)
    ]);

    const responsive = am5themes_Responsive.new(root);

responsive.addRule({
  name: "AxisRendererY",
  relevant: function(width, height) {
    return width < 1000;
  },
  settings: {
    inside: true
  }
});

root.setThemes([
  
  responsive
]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout:root.verticalLayout,
        
      })
    );

      
    let legend=chart.children.push(
      am5.Legend.new(root,{
        centerX:am5.p50,
        x:am5.p50
      })
    )
        
   

    // Create Axes

    let xRenderer = am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9
    });
    xRenderer.labels.template.setAll({
      rotation:-60,
      centerY:am5.p50,
      centerX:am5.p100,
      paddingRight:5
    })
   

    let xAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'responsable',
        renderer: xRenderer,
        tooltip:am5.Tooltip.new(root,{})
      })
    );

     xRenderer.grid.template.setAll({location:1})

    xAxis.data.setAll(data);

    let yAxis=chart.yAxes.push(am5xy.ValueAxis.new(root,{
      renderer:am5xy.AxisRendererY.new(root,{
        strokeOpacity:0.1
        
      })
      
    }));
    // End Create Axes
    

    // Adding Series
    function makeSeries(name, fieldName) {
      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        
        valueYField: fieldName,
        categoryXField: "responsable"
      }));
    
      series.columns.template.setAll({
        tooltipText: "{name}, {categoryX}:{valueY}",
        width: am5.percent(90),
        tooltipY: 0,
        
        strokeOpacity: 0
      });

    
    
      series.data.setAll(data);
    

      series.columns.template.events.on("click", function(ev) {
        // column id
        console.log("Clicked on a column", ev.target.uid);
        // data item
        console.log(ev.target.dataItem);
        // your original data object
        console.log(ev.target.dataItem.dataContext);
        // series
        console.log(ev.target.dataItem.component)
      });

    /*  let series2=chart.series.push(
        am5xy.LineSeries.new(root,{
          name:"expenses",
          xAxis:yAxis,
          yAxis:yAxis,
          
          valueYField:"expenses",
          categoryXField:"year",
          tooltip:am5.Tooltip.new(root,{
            pointerOrientation: "horizontal",
      labelText: "{name} in {categoryX}: {valueY} {info}"
          })
        })
      );*/

      /*series2.strokes.template.setAll({
        strokeWidth:3,
        templateField:"stroleSettings"
      });*/






      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();
    
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          locationY:1,
          
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            
            fill: root.interfaceColors.get("alternativeText"),
            centerY: 0,
            centerX: am5.p50,
            populateText: true
          })
        });
      });
    
      legend.data.push(series);
    }

    makeSeries("Abiertos", "Abiertos");
makeSeries("En Proceso", "Proceso");
makeSeries("En espera", "En espera");
makeSeries("Atendidos", "Atendidos");
makeSeries("Cerrados", "Cerrados");


chart.appear(1000, 100);
}
  
}