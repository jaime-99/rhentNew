import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BigDataSerivce } from '../../service/bigdata.service';

@Component({
  selector: 'app-pruebas-dialog',
  templateUrl: './pruebas-dialog.component.html',
  styleUrls: ['./pruebas-dialog.component.scss']
})
export class PruebasDialogComponent implements OnInit {
  public clientes=[];
  public tiporeportes=[];
  public form: FormGroup;
  color: ThemePalette = 'primary';
  disabled: boolean = false;
  multiple: boolean = false;
  accept: string=  ".zip,.rar,.pdf,.png,.jpg,.jepg,.doc,.docx,.xml,.txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  fileControl!: FormControl;
  
  constructor(public appService:BigDataSerivce, public fb: FormBuilder,public dialogRef:MatDialogRef<PruebasDialogComponent>,    
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0,],
      clave_cliente:[0,],
      observaciones:['',]
    });

    let suserbigdata=JSON.parse(localStorage.getItem('usuariobigdata')!);
    
      this.appService.GetCarteraClientesBigData(suserbigdata[0].usuario_id).subscribe((res)=>{
        this.clientes=res;
      })
  }

}