import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaService } from '../../ma.service';
import { IDepartamento } from '../../mesaayuda-interfaces/ICategoria.interface';

@Component({
  selector: 'app-subcategoria-dialog',
  templateUrl: './subcategoria-dialog.component.html',
  styleUrls: ['./subcategoria-dialog.component.scss']
})
export class SubcategoriaDialogComponent implements OnInit {
  public dptos!:IDepartamento[];
  public categorias=[];  
  public datacriticidad=[];
  public dataresponsable=[];
  public form: UntypedFormGroup;
  public id:any;
  public ok:any;
  public message!:string;

  constructor(public snackBar: MatSnackBar,public catservice: MaService,public dialogRef: MatDialogRef<SubcategoriaDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder) {
      

     }
     Guardar()
     {
      const {CategoriaId,SubCategoria,CriticidadId,ResponsableId,TiempoEstimado}=this.form.value;
      if(this.data.subcategoria==undefined)
      {
        this.catservice.AddSubCategory(CategoriaId,SubCategoria,CriticidadId,ResponsableId,TiempoEstimado).subscribe((datos:any) => {
          this.id=datos.id;
          this.ok=datos.ok;
          this.message=datos.message;
          //alert(datos.message);
          console.log(datos);
          this.snackBar.open("La subcategoría se guardo correctamente", '×', { panelClass: "success", verticalPosition: 'top', duration: 3000 })
        });


      }
      else{
        this.catservice.UpdateSubCategory(CategoriaId,this.data.subcategoria.SubCategoriaId,SubCategoria,this.data.subcategoria.Activo,CriticidadId,ResponsableId,TiempoEstimado).subscribe((datos:any) => {
          this.id=datos.id;
          this.ok=datos.ok;
          this.message=datos.message;
          //alert(datos.message);
          console.log(datos);
          this.snackBar.open("La subcategoría se actualizó correctamente", '×', { panelClass: "success", verticalPosition: 'top', duration: 3000 })
        });

      }


     }

  ngOnInit(): void {
    this.form = this.fb.group({
      DepartamentoId: ['', [ Validators.required]],
      CategoriaId: ['', [ Validators.required]],
      SubCategoria: ['', [ Validators.required]],
      CriticidadId: ['', [ Validators.required]],
      ResponsableId: ['', [ Validators.required]],
      TiempoEstimado:['']
     
    }); 
    this.catservice.GetAllServiceDepartment().subscribe((res:any)=>{
     
      this.dptos=res;

    });
    this.catservice.GetAllCategory().subscribe((res:any)=>{
     
      this.categorias=res;

    });
    this.catservice.GetAllCriticidad().subscribe((res:any)=>{
     
      this.datacriticidad=res;

    });
    this.catservice.GetUserByDepartmentId(this.data.subcategoria.DepartamentoId).subscribe((res:any)=>{
      this.dataresponsable=res;
    });
    console.log(this.data.subcategoria);
    this.form.patchValue(this.data.subcategoria); 
  }
  changeDeartamento(id:string)
  {

    this.catservice.GetCategoryByDepartment(id).subscribe((res:any)=>{
     
      this.categorias=res;

    });

    this.catservice.GetUserByDepartmentId(id).subscribe((res:any)=>{
      this.dataresponsable=res;
    });

   

    
    
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
