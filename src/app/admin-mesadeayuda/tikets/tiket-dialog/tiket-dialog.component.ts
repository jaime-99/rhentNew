import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MaService } from '../../ma.service';
import { ICategoria, IDepartamento } from '../../mesaayuda-interfaces/ICategoria.interface';
import { ISubCategoria } from '../../mesaayuda-interfaces/ISubcategoria.interfaces';
import { Usuario } from '../../mesaayuda-interfaces/IUsuario.interfaces';
import { IEstatusTiket, IFileGet } from '../../mesaayuda-interfaces/ITiket.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-tiket-dialog',
  templateUrl: './tiket-dialog.component.html',
  styleUrls: ['./tiket-dialog.component.scss']
})
export class TiketDialogComponent implements OnInit {

  color: ThemePalette = 'primary';
  disabled: boolean = false;
  multiple: boolean = false;
  accept: string=  ".zip,.rar,.pdf,.png,.jpg,.jepg,.doc,.docx,.xml,.txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  fileControl!: FormControl;
  public estaabierto:boolean=true;;
  viewresponsable=true;

  public dptos!:IDepartamento[];
  public categorias!:ICategoria[];
  public subcategorias!:ISubCategoria[];
  public responsables!:Usuario[];
  public dataestatustiket:IEstatusTiket[]|any;
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
  public isnotNew:boolean=false;
  public showStatus:boolean=true;



  constructor(public snackBar:MatSnackBar,public catservice: MaService,public dialogRef: MatDialogRef<TiketDialogComponent>,
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
      EstatusTiketId:[''],
      file:['' ],
      Respuesta:[''],

       fileSource: ['']
    });

    console.log(this.data.tiket);


if(this.data.tiket!=undefined){
    if(this.data.tiket.EstatusTiketId=="3")
    this.estaabierto=false;
}


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

    this.catservice.GetAllCategory().subscribe((res:any)=>{

      this.categorias=res;

    });


    if(this.data.tiket){
      this.isnotNew=true;
      let userauth=JSON.parse(localStorage.getItem('datalogin')!);

      if(userauth.EsServicio==1)
      {
        this.viewresponsable=false;
      }
      else
      {
        this.viewresponsable=true;

      }


      this.catservice.GetUserByDepartmentId(this.data.tiket.DepartamentoId).subscribe((res:any)=>{

        this.responsables=res;

      });
      this.catservice.GetSubCategoryByCategoriaId(this.data.tiket.CategoriaId).subscribe((res:any)=>{

        console.log(res);
        this.subcategorias=res;

      });
      this.catservice.GetAllEstusTiket().subscribe((res:any)=>{

        this.dataestatustiket=res;

      });
      this.form.patchValue(this.data.tiket);
      if(userauth.EsServicio=="0")
      this.showStatus=false;
    };




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

  ChangeSubCategoria(id:string)
  {

    this.catservice.GetSubCategory(id).subscribe((res:any)=>{
      console.log(res);
      console.log(res.ResponsableId);

      this.form.controls['ResponsableId'].setValue(res.ResponsableId);

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





if (!this.form.valid)
{
  alert("no valido");
  return;

}


 let userauth=JSON.parse(localStorage.getItem('datalogin')!);
    this.catservice.AddTiket( userauth.UsuarioId, SubCategoriaId,ResponsableId,Detalle,ContactoTelefonico ).subscribe((datos:any) => {
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


Actualizar()
{
  let Reasignado="0";
  let cadjson="";
  cadjson



  // let currtiket=JSON.parse( localStorage.getItem('currTiket')!);


  const { SubCategoriaId,EstatusTiketId ,ResponsableId,Detalle ,Respuesta,ContactoTelefonico} = this.form.value;
  if(this.data.tiket.ResponsableId!=ResponsableId)
  {
    Reasignado="1";
  }
let userauth=JSON.parse(localStorage.getItem('datalogin')!);

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
const { fileSource } = this.form.value;
formData.append('file', fileSource);


this.catservice.postfiles(formData).subscribe((datosx:any) => {
this.filenameup=datosx.filename;
this.Ifile={ok:datosx.ok,filename:datosx.filename,message:datosx.message}
////localStorage.setItem('getfile',JSON.stringify( this.Ifile))

let estatusTiket=EstatusTiketId;
if(EstatusTiketId=='5')
{
  let userauth=JSON.parse(localStorage.getItem('datalogin')!);

   if(userauth.UsuarioId!=ResponsableId)
   {
    estatusTiket="1";

   }


}

  this.catservice.UpdateTiket(this.data.tiket.TiketId,SubCategoriaId,estatusTiket,ResponsableId,Detalle,Respuesta,Reasignado ,ContactoTelefonico,this.data.tiket.EsPropio).subscribe((datos:any) => {
    //this.id=datos.id;
    this.ok=datos.ok;
    this.message=datos.message;

    this.catservice.GetTiket(this.data.tiket.TiketId).subscribe((data:any)=>
    {

      this.catservice.updatetiketmail(this.data.tiket.TiketId,data.Categoria,data.SubCategoria,data.Criticidad,data.Usuario,data.Responsable,data.Detalle,data.Estatus,data.Respuesta,fileSource!=''?datosx.filename:'',ContactoTelefonico).subscribe((datos:any) => {});


    }
    );

    //this.Swal.SwalAutoCloseRedirect('Tiket','El Tiket se actualizó de forma correcta','/home/tablero','success');
  });
  this.catservice.AddBitacoraTiket(this.data.tiket.TiketId,userauth.UsuarioId,Respuesta,EstatusTiketId).subscribe((datos:any) => {});

});


}

  public onSubmit(){
    if(this.data.tiket!=undefined)
    {
      this.Actualizar();
      this.snackBar.open("El ticket se actualizó correctamente", '×', { panelClass: "success", verticalPosition: 'top', duration: 3000 })
    }
    else{
      if(this.form.valid){
      this.Guardar() ;
      this.snackBar.open("El ticket se guardo correctamente", '×', { panelClass: "success", verticalPosition: 'top', duration: 3000 })
      }
    }

    console.log(this.form.value);
    if(this.form.valid){
      setTimeout(() => {
        this.dialogRef.close(this.form.value);
      }, 500);
    }
  }
}
