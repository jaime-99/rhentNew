import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Settings } from 'src/app/app.settings';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MaService } from '../ma.service';
import { TiketDialogComponent } from './tiket-dialog/tiket-dialog.component';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tikets',
  templateUrl: './tikets.component.html',
  styleUrls: ['./tikets.component.scss']
})
export class TiketsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public page: any;
  public count = 10;
  public dataTiket = [];
  public searchText = "";
  public settings: Settings;
  public columnNames: string[] = ['id', 'usuario', 'categoria', 'subcategoria', 'criticidad', 'estatus', 'detalle', 'responsable', 'acciones'];
  constructor(private tikeservice: MaService, public dialog: MatDialog) {

    this.tikeservice.GetAllTiket().subscribe((res: any) => {
      this.dataTiket = res;
      this.dataSource = new MatTableDataSource(this.dataTiket);
    });
  }

  ngOnInit(): void {
    this.tikeservice.GetAllTiket().subscribe((res: any) => {
      this.dataTiket = res;
      this.dataSource = new MatTableDataSource(this.dataTiket);
    });
  }

  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }

  public remove(ticket: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want remove this ticket?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        // Perform the removal action
      }
    });
  }

  public openTicketDialog(data: any) {
    const dialogRef = this.dialog.open(TiketDialogComponent, {
      data: {
        tiket: data
      },
      panelClass: ['theme-dialog'],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(customer => {
      this.tikeservice.GetAllTiket().subscribe((res: any) => {
        this.dataTiket = res;
       
        this.dataSource = new MatTableDataSource(this.dataTiket);
      });
    });
  }
}
