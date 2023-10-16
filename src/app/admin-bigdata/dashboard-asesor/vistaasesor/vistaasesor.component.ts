import { Component, OnInit } from '@angular/core';
import { BigDataSerivce } from '../../service/bigdata.service';

@Component({
  selector: 'app-vistaasesor',
  templateUrl: './vistaasesor.component.html',
  styleUrls: ['./vistaasesor.component.scss']
})
export class VistaaAesorComponent implements OnInit {
public botones=[];
  constructor(public bgdservice:BigDataSerivce) { }

  ngOnInit(): void {

    this.bgdservice.GetMesesReporte().subscribe((res)=>{
      this.botones=res;

    })
  }

}
