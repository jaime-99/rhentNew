import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogosindustrial',
  templateUrl: './catalogosindustrial.component.html',
  styleUrls: ['./catalogosindustrial.component.scss']
})
export class CatalogosindustrialComponent implements OnInit {
  public viewType: string = 'grid';
  public viewCol: number = 25;
  constructor() { }

  ngOnInit(): void {
  }

}
