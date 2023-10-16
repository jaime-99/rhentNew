import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BigDataSerivce } from '../../service/bigdata.service';

@Component({
  selector: 'app-carteraclientedialog',
  templateUrl: './carteraclientedialog.component.html',
  styleUrls: ['./carteraclientedialog.component.scss']
})
export class CarteraclientedialogComponent implements OnInit {
nivelcliente=[];
public form: UntypedFormGroup;
  constructor(public bgdservice:BigDataSerivce ,public snackBar: MatSnackBar, public dialogRef: MatDialogRef<CarteraclientedialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder) {
       }

  ngOnInit(): void {
    this.form = this.fb.group({
      clave_cliente: ['', [ Validators.required]],
      nombre_cliente: ['', [ Validators.required]],
      nivel_cliente: ['', [ Validators.required]],
     
    }); 
    this.bgdservice.GetNivelCliente().subscribe((res)=>{

      this.nivelcliente=res;
    })
    this.form.patchValue(this.data.Cliente);
    console.log(this.data.Cliente);


  }
  onSubmit(){}

}
