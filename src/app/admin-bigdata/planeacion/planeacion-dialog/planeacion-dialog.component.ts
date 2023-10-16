import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BigDataSerivce } from '../../service/bigdata.service';

@Component({
  selector: 'app-planeacion-dialog',
  templateUrl: './planeacion-dialog.component.html',
  styleUrls: ['./planeacion-dialog.component.scss']
})
export class PlaneacionDialogComponent implements OnInit {
  public tiporeportes=[];
  public clientes=[];
  
  public form: FormGroup;
  constructor(public appService:BigDataSerivce, public fb: FormBuilder,public dialogRef:MatDialogRef<PlaneacionDialogComponent>,    
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0,],
      clave_cliente:[0,],
      observaciones:['',]
    });

    let suserbigdata=JSON.parse(localStorage.getItem('usuariobigdata')!);
    console.log(suserbigdata);
    this.appService.gettipoactividad(suserbigdata[0].division,suserbigdata[0].nivel).subscribe((res)=>{
      this.tiporeportes=res;
       });
      this.appService.GetCarteraClientesBigData(suserbigdata[0].usuario_id).subscribe((res)=>{
        this.clientes=res;
      })
  }
  Guardar(){
    if (this.data.id==0)
    { 
      const{clave_cliente,id,observaciones}=this.form.value;
     
      
      let suserbigdata=JSON.parse(localStorage.getItem('usuariobigdata')!);
      this.appService.AddPlaneacion(suserbigdata[0].usuario_id,clave_cliente,id,observaciones,this.data.fechaseleccionada).subscribe((res)=>{});
      setTimeout(() => {
        this.dialogRef.close(this.form.value);
      }, 500);
      
    }



  }
  // public onSubmit(){
    
  //   console.log(this.form.value);
  //   if(this.form.valid){
  //     this.Guardar();
      
  //         setTimeout(() => {
  //           this.dialogRef.close(this.form.value);
  //   }, 500);
  //   }
  // }

}
