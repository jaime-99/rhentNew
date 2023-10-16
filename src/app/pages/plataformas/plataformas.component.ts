import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plataformas',
  templateUrl: './plataformas.component.html',
  styleUrls: ['./plataformas.component.scss']
})
export class PlataformasComponent implements OnInit {
  public viewType: string = 'grid';
  public viewCol: number = 16.6;
  constructor() { }

  ngOnInit(): void {
  }

}
