import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-carterasaldosant',
  templateUrl: './carterasaldosant.component.html',
  styleUrls: ['./carterasaldosant.component.scss']
})
export class CarterasaldosantComponent implements OnInit {
  public page: any;
  public count = 50;
  public datCategoria=[];
  public searchText="";
  public data0:any[];
  public division="";
  public antiguedad="";
  public Oficina="";
  public asesor="";
  public cliente="";
  public isLoading=true;

  name = "Angular PDF";
  public datadivisiones=[];
  public data: any[];
  public data2: any[];
  public dataCliente: any[];
  public data4: any[];
  public facturasdet:any[];
  public view=[5700,300];
  public view2=[109800,300];
  public view3=[1400,300];
  public showXAxis = false;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Antiguedad';
  public showYAxisLabel = true;
  public yAxisLabel = '';
  public colorScheme = {
    domain: ['#0833a2']
  };   

  public colorSchemeAsesor = {
    domain: ['#0833a2']
  };  
    public colorSchemeOficina = {
    domain: ['#0833a2']
  };  

  public colorSchemeCliente = {
    domain: ['#0833a2']
  };  
  
  public colorScheme2 = {
    domain: ['#0833a2','#ff0000', '#F18900', '#11F501','#F3EF00','#800080','#452105']
  }; 
  @ViewChild('resizedDiv') resizedDiv:ElementRef;
  @ViewChild('chartArea', { static: true })
chartArea: ElementRef;

setViewSize() 
{
  if(this.data2.length>0){
this.view = this.data2.length > 15 ?
[Math.max(Math.floor(this.data2.length / 5 ) * 150, this.chartArea.nativeElement.offsetWidth), 300] : null;
  }

  if(this.dataCliente.length>0){
this.view2 = this.dataCliente.length > 15 ?
[Math.max(Math.floor(this.dataCliente.length / 5 ) * 150, this.chartArea.nativeElement.offsetWidth), 300] : null;
  }
  if(this.data4.length>0){
this.view3 = this.data4.length > 15 ?
[Math.max(Math.floor(this.data4.length / 5 ) * 150, this.chartArea.nativeElement.offsetWidth), 300] : null;
  }
}
  public previousWidthOfResizedDiv:number = 0; 
  constructor(public appservice:AppService,private spinner:NgxSpinnerService) {
    
    
    
}

formatorPercentage(value: number) {
  // let formatter = new Intl.NumberFormat('ILS', {
  //   style: 'currency',
  //   currency: 'ILS'
  // });
  //let res = 
  return value.toFixed(2);
}
formator(value: number) {

  return value +' mill.'
}
formator0(value: number) {

  return value.toFixed(2) +' mill.'
}
public onSelect2(event) {}
///click de grafica divisiones
public onSelect0(event) {
 //['#0833a2','#ff0000', '#F18900', '#11F501','#F3EF00','#800080','#452105']
 this.isLoading=true;

 this.data=[];
 this.data2=[];
 this.dataCliente=[];
 this.data4=[];
 this.facturasdet=[];

 this.division=event.name;

  
  this.appservice.GetCarteraAntiguedad(this.division,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
    
    this.data=res;
    
  }) ;
  this.appservice.GetCarteraPorAsesor(this.antiguedad,this.division,this.Oficina,this.cliente).subscribe((res)=>{
    let result= res.length;
    let value=(46*result);
        if(res.length==1)
        {
          value=90;
        }
    this.view=[value,300];
    let colors=[];
      res.forEach(element => {
        // alert(element.codigocolor);
     
        colors.push(element.codigocolor);
       });
       this.data2=res;
       this.colorSchemeAsesor.domain=colors;
   
  }) ;
 

  this.appservice.GetCarteraPorOficina(this.antiguedad,this.division,this.asesor,this.cliente).subscribe((res)=>{
    let result= res.length;
    let value=(46*result);
    this.view3=[value,300];
    // let colors=[];
    // res.forEach(element => {
    //   // alert(element.codigocolor);
   
    //   colors.push(element.codigocolor);
    //  });
    


    this.data4=res;
    //this.colorSchemeOficina.domain=colors;
   
  }) ;

  this.appservice.GetCarteraPorCliente(this.antiguedad,this.division,this.Oficina,this.asesor).subscribe((res)=>{
    let result= res.length;
    let value=(46*result);
    this.view2=[value,300];

    let colors=[];
    res.forEach(element => {
      // alert(element.codigocolor);
   
      colors.push(element.codigocolor);
     });
    this.dataCliente=res;
    this.colorSchemeCliente.domain=colors;
   
  }) ;

 this.appservice.GetCarteraPorFactura("",event.name,"","","").subscribe((res)=>{
    this. facturasdet=res;
    this.isLoading=false;
   
   
  }) ;


  this.data0.forEach(element=>{
    if(event.name==element.name)
    {
      let LOCALcolorScheme = {
        domain: [element.codigocolor]
      };   
  
      this.colorScheme=LOCALcolorScheme;
      this.colorSchemeOficina=LOCALcolorScheme;



    }
  });

 

 

 




}
public onSelect(event) {

  this.isLoading=true;
  this.antiguedad=event.name;
  

    this.data0=[];
    this.data2=[];
    this.dataCliente=[];
    this.data4=[];
    this.facturasdet=[];

    this.appservice.GetDivisionesCarteraChart(this.antiguedad,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
      let colors=[];
      res.forEach(element=>{
        colors.push(element.codigocolor);
  
      });
  
      this.data0=res;
      this.colorScheme2.domain=colors;    
      
    })

    this.appservice.GetCarteraPorOficina(this.antiguedad,this.division,this.asesor,this.cliente).subscribe((res)=>{
      let result= res.length;
      let value=(46*result);
      this.view3=[value,300];
      // let colors=[];
      // res.forEach(element => {
      //   // alert(element.codigocolor);
     
      //   colors.push(element.codigocolor);
      //  });
      
  
  
      this.data4=res;
      //this.colorSchemeOficina.domain=colors;
     
    }) ;
  this.appservice.GetCarteraPorAsesor(event.name,this.division,this.Oficina,this.cliente).subscribe((res)=>{
    let result= res.length;
    let value=(46*result);
    this.view=[value,300];
    let colors=[];
      res.forEach(element => {
        // alert(element.codigocolor);
     
        colors.push(element.codigocolor);
       });
       this.data2=res;
       this.colorSchemeAsesor.domain=colors;
   
  }) ;
 



  this.appservice.GetCarteraPorCliente(event.name,this.division,this.Oficina,this.asesor).subscribe((res)=>{
    let result= res.length;
    let value=(46*result);
    this.view2=[value,300];

    let colors=[];
    res.forEach(element => {
      // alert(element.codigocolor);
   
      colors.push(element.codigocolor);
     });
    this.dataCliente=res;
    this.colorSchemeCliente.domain=colors;
   
  }) ;



 this.appservice.GetCarteraPorFactura(event.name,this.division,"","","").subscribe((res)=>{
    this. facturasdet=res;
    this.isLoading=false;
   
  }) ;

  
          
        


}

public replacecatalaoficina(oficina:string):any
{
  this.datadivisiones.forEach(element=>{
    oficina=oficina.replace(element.name,"");


  });
return oficina
}

public onSelectOficina(event) {
  this.data=[];
  this.data0=[];
  this.data2=[];
  this.dataCliente=[];
this.Oficina=event.name;
this.isLoading=true;
this.appservice.GetDivisionesCarteraChart(this.antiguedad,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
  let colors=[];
  res.forEach(element=>{
    colors.push(element.codigocolor);

  });

  this.data0=res;
  this.colorScheme2.domain=colors;    
  
});
this.appservice.GetCarteraAntiguedad(this.division,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
    
  this.data=res;
  
}) ;
  this.appservice.GetCarteraPorAsesor(this.antiguedad,this.division,this.Oficina,this.cliente).subscribe((res)=>{
    let result= res.length;
    let value=(46*result);
    this.view=[value,300];
    let colors=[];
      res.forEach(element => {
        // alert(element.codigocolor);
     
        colors.push(element.codigocolor);
       });
       this.data2=res;
       this.colorSchemeAsesor.domain=colors;
   
  }) ;
 



  this.appservice.GetCarteraPorCliente(this.antiguedad,this.division,this.replacecatalaoficina(event.name),this.asesor).subscribe((res)=>{
    let result= res.length;
    let value=(46*result);
    this.view2=[value,300];

    let colors=[];
    res.forEach(element => {
      // alert(element.codigocolor);
   
      colors.push(element.codigocolor);
     });
    this.dataCliente=res;
    this.colorSchemeCliente.domain=colors;
   
  }) ;
  this.appservice.GetCarteraPorFactura(this.antiguedad,this.division,this.replacecatalaoficina( event.name),this.asesor,this.cliente).subscribe((res)=>{
    this. facturasdet=res;
    this.isLoading=false;
   
  }) ;
  

}

public onSelectAsesor(event){
  this.asesor=this.replacecatalaoficina(event.name);
  this.data0=[];
  this.data=[];
  this.dataCliente=[];
  this.data4=[];
  this.facturasdet=[];

  
  this.isLoading=true;
  this.appservice.GetDivisionesCarteraChart(this.antiguedad,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
    let colors=[];
    res.forEach(element=>{
      colors.push(element.codigocolor);
  
    });
  
    this.data0=res;
    this.colorScheme2.domain=colors;    
    
  });

  this.appservice.GetCarteraAntiguedad(this.division,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
    
    this.data=res;
    
  }) ;

  this.appservice.GetCarteraPorOficina(this.antiguedad,this.division,this.asesor,this.cliente).subscribe((res)=>{
    let result= res.length;
    let value=(46*result);
    this.view3=[value,300];
    // let colors=[];
    // res.forEach(element => {
    //   // alert(element.codigocolor);
   
    //   colors.push(element.codigocolor);
    //  });
    


    this.data4=res;
    //this.colorSchemeOficina.domain=colors;
   
  }) ;

  this.appservice.GetCarteraPorCliente(this.antiguedad,this.division,this.replacecatalaoficina(this.Oficina),this.replacecatalaoficina(event.name)).subscribe((res)=>{
    let result= res.length;
    let value=(46*result);
    this.view2=[value,300];

    let colors=[];
    res.forEach(element => {
      // alert(element.codigocolor);
   
      colors.push(element.codigocolor);
     });
    this.dataCliente=res;
    this.colorSchemeCliente.domain=colors;
   
  }) ;
  this.appservice.GetCarteraPorFactura(this.antiguedad,this.division,this.replacecatalaoficina(this.Oficina),this.replacecatalaoficina( event.name),'').subscribe((res)=>{
    this. facturasdet=res;
    this.isLoading=false;
   
  }) ;


}

public onSelectCliente(event){

  this.data0=[];
  this.data2=[];
  this.data=[];

  this.data4=[];
  this.facturasdet=[];
  this.isLoading=true;
  this.cliente=this.replacecatalaoficina( event.name);
  this.appservice.GetDivisionesCarteraChart(this.antiguedad,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
    let colors=[];
    res.forEach(element=>{
      colors.push(element.codigocolor);
  
    });
  
    this.data0=res;
    this.colorScheme2.domain=colors;    
    
  });

  this.appservice.GetCarteraAntiguedad(this.division,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
    
    this.data=res;
    
  }) ;
  this.appservice.GetCarteraPorOficina(this.antiguedad,this.division,this.asesor,this.cliente).subscribe((res)=>{
    let result= res.length;
    let value=(46*result);
    if(res.length==1)
    {
      value=90;
    }
    this.view3=[value,300];
    // let colors=[];
    // res.forEach(element => {
    //   // alert(element.codigocolor);
   
    //   colors.push(element.codigocolor);
    //  });
    


    this.data4=res;
    //this.colorSchemeOficina.domain=colors;
   
  }) ;

  this.appservice.GetCarteraPorAsesor(this.antiguedad,this.division,this.Oficina,this.cliente).subscribe((res)=>{
    let result= res.length;
    let value=(46*result);
    if(res.length==1)
    {
      value=90;
    }
    this.view=[value,300];
    let colors=[];
      res.forEach(element => {
        // alert(element.codigocolor);
     
        colors.push(element.codigocolor);
       });
       
       this.data2=res;
       this.colorSchemeAsesor.domain=colors;
   
  }) ;


  this.appservice.GetCarteraPorFactura(this.antiguedad,this.division,this.replacecatalaoficina(this.Oficina),this.replacecatalaoficina(this.asesor),this.replacecatalaoficina( event.name)).subscribe((res)=>{
    this. facturasdet=res;
    this.isLoading=false;
   
  }) ;


}

  ngOnInit(): void {
   
   


   this.appservice.GetDivisionesCarteraChart('','','','').subscribe((res)=>{
    
    let colors=[];
    res.forEach(element=>{
      colors.push(element.codigocolor);

    });
    this.datadivisiones=res;

    this.data0=res;
    this.colorScheme2.domain=colors;    
    
  })


    this.appservice.GetCarteraAntiguedad('','','','').subscribe((res)=>{
     
      this.data=res;
      
    }) ;

    
    this.appservice.GetCarteraPorAsesor('','','','').subscribe((res)=>{
       
      let result= res.length;
      let value=(46*result);
      this.view=[value,300];

      let colors=[];
     
      res.forEach(element => {
       // alert(element.codigocolor);
       colors.push(element.codigocolor);
      });
      this.data2=res;
      this.colorSchemeAsesor.domain=colors;
     
    }) ;
   
    
    this.appservice.GetCarteraPorOficina('','','','').subscribe((res)=>{
      
      let result= res.length;
      let value=(46*result);
      this.view3=[value,300];
      // let colors=[];
      // res.forEach(element => {
      //   // alert(element.codigocolor);
     
      //   colors.push(element.codigocolor);
      //  });
      


      this.data4=res;
      //this.colorSchemeOficina.domain=colors;
     
    }) ;

    
    this.appservice.GetCarteraPorCliente('','','','').subscribe((res)=>{
      
      let result= res.length;
    let value=(46*result);
    this.view2=[value,300];
    this.dataCliente=res;


    let colors=[];
    res.forEach(element => {
      // alert(element.codigocolor);
   
      colors.push(element.codigocolor);
     });
    
    this.colorSchemeCliente.domain=colors;
   
     
    }) ;

    

   this.appservice.GetCarteraPorFactura('','','','','').subscribe((res)=>{
      this. facturasdet=res;
      this.isLoading=false;
      
    }) ;

    
    
   
   // this.setViewSize();
   // this.data=this.appservice.datacarteraChart.porAntiguedadChar;
  }
  ngAfterViewChecked() {    
    if(this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth){
     setTimeout(() => this.data = this.appservice.datacarteraChart.porAntiguedadChar );
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }
  public remove()
  {

  }
public removeCliente()
  {
    this.cliente="";

      this.data0=[];
      this.data2=[];
      this.data=[];
      this.dataCliente=[];
      this.data4=[];
      this.facturasdet=[];
      this.isLoading=true;
      
      this.appservice.GetDivisionesCarteraChart(this.antiguedad,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
        let colors=[];
        res.forEach(element=>{
          colors.push(element.codigocolor);
      
        });
      
        this.data0=res;
        this.colorScheme2.domain=colors;    
        
      });
    
      this.appservice.GetCarteraAntiguedad(this.division,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
        
        this.data=res;
        
      }) ;
      this.appservice.GetCarteraPorOficina(this.antiguedad,this.division,this.asesor,this.cliente).subscribe((res)=>{
        let result= res.length;
        let value=(46*result);
      if(res.length==1)
      {
        value=90;
      }
        this.view3=[value,300];
        // let colors=[];
        // res.forEach(element => {
        //   // alert(element.codigocolor);
       
        //   colors.push(element.codigocolor);
        //  });
        
    
    
        this.data4=res;
        //this.colorSchemeOficina.domain=colors;
       
      }) ;
    
      this.appservice.GetCarteraPorAsesor(this.antiguedad,this.division,this.Oficina,this.cliente).subscribe((res)=>{
        let result= res.length;
        let value=(46*result);
        if(res.length==1)
        {
          value=90;
        }
        this.view=[value,300];
        let colors=[];
          res.forEach(element => {
            // alert(element.codigocolor);
         
            colors.push(element.codigocolor);
           });
           this.data2=res;
           this.colorSchemeAsesor.domain=colors;
       
      }) ;
      this.appservice.GetCarteraPorCliente(this.antiguedad,this.division,this.replacecatalaoficina(this.Oficina),this.replacecatalaoficina(this.asesor)).subscribe((res)=>{
        let result= res.length;
        let value=(46*result);
        this.view2=[value,300];
    
        let colors=[];
        res.forEach(element => {
          // alert(element.codigocolor);
       
          colors.push(element.codigocolor);
         });
        this.dataCliente=res;
        this.colorSchemeCliente.domain=colors;
       
      }) ;
    
    
      this.appservice.GetCarteraPorFactura(this.antiguedad,this.division,this.replacecatalaoficina(this.Oficina),this.replacecatalaoficina(this.asesor),this.replacecatalaoficina( this.cliente)).subscribe((res)=>{
        this. facturasdet=res;
        this.isLoading=false;
       
      }) ;
    
    
    
    

  }
  public removeAsesor()
  {
    this.asesor="";

      this.data0=[];
      this.data2=[];
      this.data=[];
      this.dataCliente=[];
      this.data4=[];
      this.facturasdet=[];
      this.isLoading=true;
      
      this.appservice.GetDivisionesCarteraChart(this.antiguedad,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
        let colors=[];
        res.forEach(element=>{
          colors.push(element.codigocolor);
      
        });
      
        this.data0=res;
        this.colorScheme2.domain=colors;    
        
      });
    
      this.appservice.GetCarteraAntiguedad(this.division,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
        
        this.data=res;
        
      }) ;
      this.appservice.GetCarteraPorOficina(this.antiguedad,this.division,this.asesor,this.cliente).subscribe((res)=>{
        let result= res.length;
        let value=(46*result);
        if(res.length==1)
        {
          value=90;
        }
        this.view3=[value,300];
        // let colors=[];
        // res.forEach(element => {
        //   // alert(element.codigocolor);
       
        //   colors.push(element.codigocolor);
        //  });
        
    
    
        this.data4=res;
        //this.colorSchemeOficina.domain=colors;
       
      }) ;
    
      this.appservice.GetCarteraPorAsesor(this.antiguedad,this.division,this.Oficina,this.cliente).subscribe((res)=>{
        let result= res.length;
        let value=(46*result);
        if(res.length==1)
        {
          value=90;
        }
        this.view=[value,300];
        let colors=[];
          res.forEach(element => {
            // alert(element.codigocolor);
         
            colors.push(element.codigocolor);
           });
           this.data2=res;
           this.colorSchemeAsesor.domain=colors;
       
      }) ;
      this.appservice.GetCarteraPorCliente(this.antiguedad,this.division,this.replacecatalaoficina(this.Oficina),this.replacecatalaoficina(this.asesor)).subscribe((res)=>{
        let result= res.length;
        let value=(46*result);
        this.view2=[value,300];
    
        let colors=[];
        res.forEach(element => {
          // alert(element.codigocolor);
       
          colors.push(element.codigocolor);
         });
        this.dataCliente=res;
        this.colorSchemeCliente.domain=colors;
       
      }) ;
    
    
      this.appservice.GetCarteraPorFactura(this.antiguedad,this.division,this.replacecatalaoficina(this.Oficina),this.replacecatalaoficina(this.asesor),this.replacecatalaoficina( this.cliente)).subscribe((res)=>{
        this. facturasdet=res;
        this.isLoading=false;
       
      }) ;
    
    
    
    

  }
  public removeOficina()
  {
    this.Oficina="";

      this.data0=[];
      this.data2=[];
      this.data=[];
      this.dataCliente=[];
      this.data4=[];
      this.facturasdet=[];
      this.isLoading=true;
      
      this.appservice.GetDivisionesCarteraChart(this.antiguedad,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
        let colors=[];
        res.forEach(element=>{
          colors.push(element.codigocolor);
      
        });
      
        this.data0=res;
        this.colorScheme2.domain=colors;    
        
      });
    
      this.appservice.GetCarteraAntiguedad(this.division,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
        
        this.data=res;
        
      }) ;
      this.appservice.GetCarteraPorOficina(this.antiguedad,this.division,this.asesor,this.cliente).subscribe((res)=>{
        let result= res.length;
        let value=(46*result);
        if(res.length==1)
        {
          value=90;
        }
        this.view3=[value,300];
        // let colors=[];
        // res.forEach(element => {
        //   // alert(element.codigocolor);
       
        //   colors.push(element.codigocolor);
        //  });
        
    
    
        this.data4=res;
        //this.colorSchemeOficina.domain=colors;
       
      }) ;
    
      this.appservice.GetCarteraPorAsesor(this.antiguedad,this.division,this.Oficina,this.cliente).subscribe((res)=>{
        let result= res.length;
        let value=(46*result);
        if(res.length==1)
        {
          value=90;
        }
        this.view=[value,300];
        let colors=[];
          res.forEach(element => {
            // alert(element.codigocolor);
         
            colors.push(element.codigocolor);
           });
           this.data2=res;
           this.colorSchemeAsesor.domain=colors;
       
      }) ;
      this.appservice.GetCarteraPorCliente(this.antiguedad,this.division,this.replacecatalaoficina(this.Oficina),this.replacecatalaoficina(this.asesor)).subscribe((res)=>{
        let result= res.length;
        let value=(46*result);
        this.view2=[value,300];
    
        let colors=[];
        res.forEach(element => {
          // alert(element.codigocolor);
       
          colors.push(element.codigocolor);
         });
        this.dataCliente=res;
        this.colorSchemeCliente.domain=colors;
       
      }) ;
    
    
      this.appservice.GetCarteraPorFactura(this.antiguedad,this.division,this.replacecatalaoficina(this.Oficina),this.replacecatalaoficina(this.asesor),this.replacecatalaoficina( this.cliente)).subscribe((res)=>{
        this. facturasdet=res;
        this.isLoading=false;
       
      }) ;
    
    
    
    

  }
  public removeAntiguedad()
  {
    this.antiguedad="";

      this.data0=[];
      this.data2=[];
      this.data=[];
      this.dataCliente=[];
      this.data4=[];
      this.facturasdet=[];
      this.isLoading=true;
      
      this.appservice.GetDivisionesCarteraChart(this.antiguedad,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
        let colors=[];
        res.forEach(element=>{
          colors.push(element.codigocolor);
      
        });
      
        this.data0=res;
        this.colorScheme2.domain=colors;    
        
      });
    
      this.appservice.GetCarteraAntiguedad(this.division,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
        
        this.data=res;
        
      }) ;
      this.appservice.GetCarteraPorOficina(this.antiguedad,this.division,this.asesor,this.cliente).subscribe((res)=>{
        let result= res.length;
        let value=(46*result);
        if(res.length==1)
        {
          value=90;
        }
        this.view3=[value,300];
        // let colors=[];
        // res.forEach(element => {
        //   // alert(element.codigocolor);
       
        //   colors.push(element.codigocolor);
        //  });
        
    
    
        this.data4=res;
        //this.colorSchemeOficina.domain=colors;
       
      }) ;
    
      this.appservice.GetCarteraPorAsesor(this.antiguedad,this.division,this.Oficina,this.cliente).subscribe((res)=>{
        let result= res.length;
        let value=(46*result);
        if(res.length==1)
        {
          value=90;
        }
        this.view=[value,300];
        let colors=[];
          res.forEach(element => {
            // alert(element.codigocolor);
         
            colors.push(element.codigocolor);
           });
           this.data2=res;
           this.colorSchemeAsesor.domain=colors;
       
      }) ;
      this.appservice.GetCarteraPorCliente(this.antiguedad,this.division,this.replacecatalaoficina(this.Oficina),this.replacecatalaoficina(this.asesor)).subscribe((res)=>{
        let result= res.length;
        let value=(46*result);
        this.view2=[value,300];
    
        let colors=[];
        res.forEach(element => {
          // alert(element.codigocolor);
       
          colors.push(element.codigocolor);
         });
        this.dataCliente=res;
        this.colorSchemeCliente.domain=colors;
       
      }) ;
    
    
      this.appservice.GetCarteraPorFactura(this.antiguedad,this.division,this.replacecatalaoficina(this.Oficina),this.replacecatalaoficina(this.asesor),this.replacecatalaoficina( this.cliente)).subscribe((res)=>{
        this. facturasdet=res;
        this.isLoading=false;
       
      }) ;
    
    
    
    

  }
  public removeDivision()
  {
    this.division="";

      this.data0=[];
      this.data2=[];
      this.data=[];
      this.dataCliente=[];
      this.data4=[];
      this.facturasdet=[];
      this.isLoading=true;
      
      this.appservice.GetDivisionesCarteraChart(this.antiguedad,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
        let colors=[];
        res.forEach(element=>{
          colors.push(element.codigocolor);
      
        });
      
        this.data0=res;
        this.colorScheme2.domain=colors;    
        
      });
    
      this.appservice.GetCarteraAntiguedad(this.division,this.Oficina,this.asesor,this.cliente).subscribe((res)=>{
        
        this.data=res;
        
      }) ;
      this.appservice.GetCarteraPorOficina(this.antiguedad,this.division,this.asesor,this.cliente).subscribe((res)=>{
        let result= res.length;
        let value=(46*result);
        if(res.length==1)
        {
          value=90;
        }
        this.view3=[value,300];
        // let colors=[];
        // res.forEach(element => {
        //   // alert(element.codigocolor);
       
        //   colors.push(element.codigocolor);
        //  });
        
    
    
        this.data4=res;
        //this.colorSchemeOficina.domain=colors;
       
      }) ;
    
      this.appservice.GetCarteraPorAsesor(this.antiguedad,this.division,this.Oficina,this.cliente).subscribe((res)=>{
        let result= res.length;
        let value=(46*result);
        if(res.length==1)
        {
          value=90;
        }
        this.view=[value,300];
        let colors=[];
          res.forEach(element => {
            // alert(element.codigocolor);
         
            colors.push(element.codigocolor);
           });
           this.data2=res;
           this.colorSchemeAsesor.domain=colors;
       
      }) ;
      this.appservice.GetCarteraPorCliente(this.antiguedad,this.division,this.replacecatalaoficina(this.Oficina),this.replacecatalaoficina(this.asesor)).subscribe((res)=>{
        let result= res.length;
        let value=(46*result);
        this.view2=[value,300];
    
        let colors=[];
        res.forEach(element => {
          // alert(element.codigocolor);
       
          colors.push(element.codigocolor);
         });
        this.dataCliente=res;
        this.colorSchemeCliente.domain=colors;
       
      }) ;
    
    
      this.appservice.GetCarteraPorFactura(this.antiguedad,this.division,this.replacecatalaoficina(this.Oficina),this.replacecatalaoficina(this.asesor),this.replacecatalaoficina( this.cliente)).subscribe((res)=>{
        this. facturasdet=res;
        this.isLoading=false;
       
      }) ;
    
    
    
    

  }
  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }

  public configurarcolores(Division:string,Antiguedad:string,Oficina:string,Asesor:string,Cliente:string)
  {
    if(Division==""&&Antiguedad=="" && Oficina=="" && Asesor=="" && Cliente=="")
    {
      this.colorScheme = {
        domain: ['#0833a2']
      };  
      this.colorSchemeOficina = {
        domain: ['#0833a2']
      };  
      return  

    
    }
    else if(Division!=""&& Asesor=="" && Cliente=="")
    {
      let colors=[];
      this.datadivisiones.forEach(element=>{

        if(element.name==Division)
        {
          colors.push(element.codigocolor);

          this.colorScheme = {
            domain: ['#0833a2']
          };  
          this.colorSchemeOficina = {
            domain: ['#0833a2']
          };  
          return  

        }


      })


    }

  }

  Reload()
  {
   this. colorScheme = {
      domain: ['#0833a2']
    };   
  
    this.data0=[];
    this.data=[];
    this.data2=[];
    this.dataCliente=[];
    this.data4=[];
    this.division="";
    this.antiguedad="";
    this.Oficina="";
    this.asesor="";
    this.cliente="";
    this.isLoading=true;
    
   this.appservice.GetDivisionesCarteraChart('','','','').subscribe((res)=>{

    let colors=[];
      res.forEach(element=>{
        colors.push(element.codigocolor);
  
      });
  
      this.data0=res;
      this.colorScheme2.domain=colors;   
    
    
  });


    this.appservice.GetCarteraAntiguedad('','','','').subscribe((res)=>{
      
      this.data=res;
      
    }) ;

    this.appservice.GetCarteraPorAsesor('','','','').subscribe((res)=>{
      
      let result= res.length;
      let value=(46*result);
      this.view=[value,300];
      let colors=[];
      res.forEach(element => {
        // alert(element.codigocolor);
     
        colors.push(element.codigocolor);
       });
       this.data2=res;
       this.colorSchemeAsesor.domain=colors;
     
    }) ;
   

    this.appservice.GetCarteraPorOficina('','','','').subscribe((res)=>{
      
      let result= res.length;
      let value=(46*result);
      this.view3=[value,300];
      
  //  let colors=[];
  //     res.forEach(element => {
  //       // alert(element.codigocolor);
     
  //       colors.push(element.codigocolor);
  //      });
      


      this.data4=res;
      //this.colorSchemeOficina.domain=colors;
     
    }) ;

    this.appservice.GetCarteraPorCliente('','','','').subscribe((res)=>{
      let result= res.length;
    let value=(46*result);
    this.view2=[value,300];

    let colors=[];
    res.forEach(element => {
      // alert(element.codigocolor);
   
      colors.push(element.codigocolor);
     });
    this.dataCliente=res;
    this.colorSchemeCliente.domain=colors;
     
    }) ;

   this.appservice.GetCarteraPorFactura('','','','','').subscribe((res)=>{
      this. facturasdet=res;
     
      this.isLoading=false;
    }) ;
    let LOCALcolorScheme = {
      domain: ['#0833a2']
    };   

    this.colorScheme=LOCALcolorScheme;
    
  }
 
  llenartextovaciofiltro(val:string)
  {
    if(val=="")
    return "Todo";
    else
    return val;
  }

}
