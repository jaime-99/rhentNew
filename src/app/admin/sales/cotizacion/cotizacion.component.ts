import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {
public cotizaciones=[];
public page: any;
public count = 6;
  constructor(public appservice:AppService) { }

  ngOnInit(): void {
    let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    this.appservice.GetCotizacionesPorUsuarioId(userauth.UsuarioId).subscribe((res)=>{
      this.cotizaciones=res;



    });
  }
  public onPageChanged(event){
    this.page = event;
    window.scrollTo(0,0);
  }

}
