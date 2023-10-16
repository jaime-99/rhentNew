import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BigDataSerivce } from '../../service/bigdata.service';

@Component({
  selector: 'app-trabajoplanta-dialog',
  templateUrl: './trabajoplanta-dialog.component.html',
  styleUrls: ['./trabajoplanta-dialog.component.scss']
})
export class TrabajoplantaDialogComponent implements OnInit {

  public clientes=[];
  public tiporeportes=[];
  public form: FormGroup;
  color: ThemePalette = 'primary';
  disabled: boolean = false;
  multiple: boolean = false;
  accept: string=  ".zip,.rar,.pdf,.png,.jpg,.jepg,.doc,.docx,.xml,.txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  fileControl!: FormControl;

  constructor(public appService:BigDataSerivce, public fb: FormBuilder,public dialogRef:MatDialogRef<TrabajoplantaDialogComponent>,    
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    let suserbigdata=JSON.parse(localStorage.getItem('usuariobigdata')!);
    
    this.appService.gettipoactividad(suserbigdata[0].division,suserbigdata[0].nivel).subscribe((res)=>{
      this.tiporeportes=res;
       });
      this.appService.GetCarteraClientesBigData(suserbigdata[0].usuario_id).subscribe((res)=>{
        this.clientes=res;
      })
  }

}
