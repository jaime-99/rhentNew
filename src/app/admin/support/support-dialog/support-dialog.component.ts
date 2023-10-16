import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ICategoria, IDepartamento, IFileGet, ISubCategoria, Usuario } from '../interfaces/iTiket';
import { SupportService } from '../service/support.service';
@Component({
  selector: 'app-support-dialog',
  templateUrl: './support-dialog.component.html',
  styleUrls: ['./support-dialog.component.scss']
})
export class SupportDialogComponent implements OnInit {
  color: ThemePalette = 'primary';
  disabled: boolean = false;
  multiple: boolean = false;
  accept: string=  ".zip,.rar,.pdf,.png,.jpg,.jepg,.doc,.docx,.xml,.txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  fileControl!: FormControl;

  public dptos!:IDepartamento[];
  public categorias!:ICategoria[];
  public subcategorias!:ISubCategoria[];
  public responsables!:Usuario[];
  public filenameup:string="";
  //public Ifile!:IFileGet;
  public Ifile!:IFileGet;
  public files!:any;

  

  public id:any;
  public ok:any;
  public message!:string;
  respuesta = {};

  fileToUpload: File | null = null;
  public form: UntypedFormGroup;

  constructor(public catservice: SupportService,public dialogRef: MatDialogRef<SupportDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder) {
      this.fileControl = new FormControl(this.files)


     }

  ngOnInit(): void {
    this.form = this.fb.group({
      DepartamentoId: ['', [ Validators.required]],
      CategoriaId: ['', [ Validators.required]],
      SubCategoriaId: ['', [ Validators.required]],
     // CriticidadId: ['', [ Validators.required]],
      ResponsableId: ['', [ Validators.required]],
      Detalle: ['', [ Validators.required]],
      ContactoTelefonico:['',[Validators.required]],
      file:['' ],

       fileSource: ['']
    }); 

    if(this.data.customer){
      this.form.patchValue(this.data.customer); 
    };

    this.fileControl.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.files = [files];
      } else {
        this.files = files;
      }
    })



    this.catservice.GetAllServiceDepartment().subscribe((res:any)=>{
     
      this.dptos=res;

    });




  }

  changeDeartamento(id:string)
  {

    this.catservice.GetCategoryByDepartment(id).subscribe((res:any)=>{
     
      this.categorias=res;

    });
    this.catservice.GetUserByDepartmentId(id).subscribe((res:any)=>{
     
      this.responsables=res;

    });
    
  }

  ChangeCategoria(id:string)
  {
    
    this.catservice.GetSubCategoryByCategoriaId(id).subscribe((res:any)=>{
     
      console.log(res);
      this.subcategorias=res;

    });


  }

  Guardar() 
  {
    console.log(this.files);
    if(this.files!=undefined){
    this.form.patchValue({

     
      fileSource: this.files[0]

    });
  }
    else
    {
      this.form.patchValue({fileSource:''})
    }

    const formData = new FormData();
    const { SubCategoriaId, ResponsableId,Detalle,fileSource,ContactoTelefonico } = this.form.value;
    formData.append('file', fileSource);
     console.log(fileSource);

this.catservice.postfiles(formData).subscribe((datosx:any) => {
this.filenameup=datosx.filename;
this.Ifile={ok:datosx.ok,filename:datosx.filename,message:datosx.message}
console.log(datosx);







 let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    this.catservice.AddTiket( '554', SubCategoriaId,ResponsableId,Detalle,ContactoTelefonico ).subscribe((datos:any) => {
      this.id=datos.id;
      this.ok=datos.ok;
      this.message=datos.message;
      //alert(datos.message);
      console.log(this.message);

      this.catservice.GetTiket(datos.id).subscribe((data:any)=>
      {

        this.catservice.sendmail(datos.id,data.Categoria,data.SubCategoria,data.Criticidad,data.Usuario,data.Responsable,data.Detalle,fileSource!=''?datosx.filename:'',ContactoTelefonico).subscribe((datos:any) => {});
        
       
      
      }
      );


      //this.Swal.SwalAutoCloseRedirect('Tiket','El Tiket se guardo de forma correcta','/home/tablero','success');
      

      //this.router.navigateByUrl('/home/tablero');
      // console.log(datos);
    });
  

  });


  }




  public onSubmit(){
    this.Guardar() ;
    console.log(this.form.value);
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }
}
