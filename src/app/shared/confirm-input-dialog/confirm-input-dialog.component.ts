import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-input-dialog',
  templateUrl: './confirm-input-dialog.component.html',
  styleUrls: ['./confirm-input-dialog.component.scss']
})
export class ConfirmInputDialogComponent implements OnInit {
  public form: UntypedFormGroup;
  constructor(public fb: UntypedFormBuilder,public dialogRef: MatDialogRef<ConfirmInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    viewcheck=false;

ngOnInit(): void {
  if(this.data.message=="¿Esta seguro de querer finalizar el ticket?")
  {
    this.viewcheck=true;


  }
  console.log(this.data);
    this.form = this.fb.group({
      Detalle: ['', [ Validators.required]],
      EsPropio:[true,],
      Confirm:[]
      
     
    }); 
}

onConfirm(): void { 
  if(this.form.valid){
    this.form.controls['Confirm'].setValue("1");
this.dialogRef.close(this.form.value);
  }
}

onDismiss(): void { 
this.dialogRef.close(false);
}

}
