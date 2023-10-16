import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaService } from '../../ma.service';
import { IDepartamento } from '../../mesaayuda-interfaces/ICategoria.interface';

@Component({
  selector: 'app-categoria-dialog',
  templateUrl: './categoria-dialog.component.html',
  styleUrls: ['./categoria-dialog.component.scss']
})
export class CategoriaDialogComponent implements OnInit {
  public dptos!:IDepartamento[];
  public form: UntypedFormGroup;
  public id:any;
  public ok:any;
  public message!:string;

  constructor(public snackBar: MatSnackBar,public catservice: MaService,public dialogRef: MatDialogRef<CategoriaDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder) {
      

     }

  ngOnInit(): void {
    console.log(this.data);
    this.form = this.fb.group({
      DepartamentoId: ['', [ Validators.required]],
      Categoria: ['', [ Validators.required]],
     
    }); 
    this.catservice.GetAllServiceDepartment().subscribe((res:any)=>{
     
      this.dptos=res;

    });
    this.form.patchValue(this.data.categoria); 
  }
  Guardar()
  {
    
    const{DepartamentoId,Categoria}=this.form.value;
    if(this.data.categoria==undefined)
    {
     
      this.catservice.AddCategory(DepartamentoId,Categoria).subscribe((datos:any) => {
        this.id=datos.id;
        this.ok=datos.ok;
        this.message=datos.message;
        //alert(datos.message);
        console.log(datos);
        this.snackBar.open("La categoría se guardo correctamente", '×', { panelClass: "success", verticalPosition: 'top', duration: 3000 })
      });
    }
    else{
      // console.log(this.data.categoria);
      // return;
     
      this.catservice.UpdateCategory(this.data.categoria.CategoriaId,DepartamentoId,Categoria,this.data.categoria.Active).subscribe((datos:any) => {
     
        this.ok=datos.ok;
        this.message=datos.message;
        //alert(datos.message);
        console.log(datos);
      });
      
      this.snackBar.open("La categória se actualizó correctamente", '×', { panelClass: "success", verticalPosition: 'top', duration: 3000 })
    
    }
   


  }

  public onSubmit(){
    
    console.log(this.form.value);
    if(this.form.valid){
      this.Guardar();
        setTimeout(() => {
          this.dialogRef.close(this.form.value);
        }, 500);
    }
  }

}
