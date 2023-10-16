import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.scss']
})
export class CatalogosComponent implements OnInit {
  public viewType: string = 'grid';
  public viewCol: number = 20;
  constructor() { }

  ngOnInit(): void {
  }

}
