import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ICategoria, IDepartamento, IFileGet, ISubCategoria, Usuario } from '../interfaces/iTiket';
import { SupportService } from '../service/support.service';
import { Settings } from 'src/app/app.settings';

@Component({
  selector: 'app-supportlist-dialog',
  templateUrl: './supportlist-dialog.component.html',
  styleUrls: ['./supportlist-dialog.component.scss']
})
export class SupportlistDialogComponent implements OnInit {
  public page: any;
  public count = 4;
  public dataTiket=[];
  public searchText="";
  public settings:Settings;

  public tickets = [
    { id: 1, statusId: 1, code: '#000625', supportCategoryId: 1, issue: 'lorem ipsum', order: '#1556', customer: 'Andy Warhol', storeId: 1, date: new Date(2020,1,15,10,45) },
    { id: 2, statusId: 2, code: '#002350', supportCategoryId: 2, issue: 'lorem ipsum', order: '#5214', customer: 'Luisa Styles', storeId: 2, date: new Date(2020,2,8,22,12) },
    { id: 3, statusId: 3, code: '#007852', supportCategoryId: 3, issue: 'lorem ipsum', order: '#4285', customer: 'Michael Blair', storeId: 2, date: new Date(2020,3,29,14,30) },
    { id: 4, statusId: 4, code: '#009621', supportCategoryId: 4, issue: 'lorem ipsum', order: '#3658', customer: 'Julia Aniston', storeId: 1, date: new Date(2020,4,18,8,20) }
  ];
  public form: UntypedFormGroup;

  constructor(public catservice: SupportService,public dialogRef: MatDialogRef<SupportlistDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder) { }

  ngOnInit(): void {

    let isopen=localStorage.getItem('isopen');
   // let authuser=JSON.parse(localStorage.getItem('datalogin')!);

    this.catservice.GetTiketUserEstatus("554","0",isopen).subscribe((res:any)=>{
     
      this.dataTiket=res;
      

   });

  }


}
