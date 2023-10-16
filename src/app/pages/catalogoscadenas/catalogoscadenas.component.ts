import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogoscadenas',
  templateUrl: './catalogoscadenas.component.html',
  styleUrls: ['./catalogoscadenas.component.scss']
})
export class CatalogoscadenasComponent implements OnInit {
  public viewType: string = 'grid';
  public viewCol: number = 25;
  constructor() { }

  ngOnInit(): void {
  }

}
