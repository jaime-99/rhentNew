import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Settings } from 'http2';
import { BigDataSerivce } from '../service/bigdata.service';

@Component({
  selector: 'app-listadoreporte',
  templateUrl: './listadoreporte.component.html',
  styleUrls: ['./listadoreporte.component.scss']
})
export class ListadoreporteComponent implements OnInit {
  public actividades=[];
  public actividadesfiltradas=[];
  public page: any;
  public count = 50;
  public datCategoria=[];
  public tiporeportes=[];
  public form: FormGroup;
  public searchText="";
  public settings:Settings;
  public reporteseleccionado="";
  usuarioId=0;
  constructor(public appService:BigDataSerivce, public fb: FormBuilder) { }
  changetiporeporte(data)
  {
    this.reporteseleccionado=data;
    if(this.reporteseleccionado=='TODO')
    {
      this.actividadesfiltradas=this.actividades;
    }
    else
    {
      this.actividadesfiltradas=[];
      this.actividadesfiltradas=this.actividades.filter(tipo=>tipo.tipo==data);


    }
    

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      idtiporeporte: [0,],
    });
    
    this.appService.gettiporeporte().subscribe((res)=>{
      this.tiporeportes=res;
      console.log(res);
  this.reporteseleccionado='TODO'

      this.form.controls['idtiporeporte'].setValue(this.reporteseleccionado);
    })
    let suserbigdata=JSON.parse(localStorage.getItem('usuariobigdata')!);
    this.usuarioId=suserbigdata[0].usuario_id;
  
    this.loadReports(this.usuarioId,'TODO')
  }

loadReports(usuario_id,tiporeporte)
{

  this.appService.getreporteasesor(usuario_id,tiporeporte).subscribe((res)=>{
    
    this.actividades=res;
    this.actividadesfiltradas=res;
            }    );
}

  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }
}
