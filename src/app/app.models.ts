export class Category {
  constructor(public id: number,
              public name:string,
              public hasSubCategory: boolean,
              public parentId: number){ }
}
export class Clase
{
  constructor(public ClaseId:string,
              public Descripcion:string){}
}
export class Familia
{
  constructor(public FamiliaId:string,
              public Descripcion:string){}
}
export class SubFamilia
{
  constructor(public SubFamiliaId:string,
              public Descripcion:string){}
}
export class Cotizacion{
    public CotizacionId:string;
                public ClienteId:string;
                public Fecha:string;
                public Total:string;
                public EstadoId:string;
                public Probabilidad:string;
                public NS_TranId:string;
                public FechaCierrePrevisto:Date;
                public FechaCaduca:Date;
                public UsuarioId:string;
}
export class ProductoImagen
{
  constructor(public Id:string,
                     public ProductoId:string,
                     public small:string,
                     public medium:string,
                     public big:string,
                     public EsPrincipal:string){}
}
export class Product {
  constructor(public id: number,
              public name: string,
              public images: Array<any>,
              public oldPrice: number,
              public newPrice: number,
              public discount: number,
              public ratingsCount: number,
              public ratingsValue: number,
              public description: string,
              public availibilityCount: number,
              public cartCount: number,
              public color: Array<string>,
              public size: Array<string>,
              public weight: number,
              public categoryId: number,
              public Clase:string,
              public Familia:string,
              public SubFamilia:string,
              public TextSearch:string,
              public CodigoDiken:string,
              public PrettyText:string,
              public ClaseId:number,
              public FamiliaId:number,
              public SubFamiliaId:number
              ){ }
}

export class EmpleadoVentas{
  public $VentaEmpeladoId:number;
  public $RhUsuarioId:number;
  public $Fecha: string;
  public $Total:number;


}
