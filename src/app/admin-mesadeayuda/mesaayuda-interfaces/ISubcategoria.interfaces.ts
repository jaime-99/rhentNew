export interface iAddRespuesta{
    id:number;
    ok:boolean;
    message:string;

}
export interface ISubCategoria{
    SubCategoriaId:string,
    CategoriaId:string,
    SubCategoria:string,
    Criticidad:string,
    Activo:string,
    Categoria:string,
    ok:string,
    token:string

}
export interface ICriticidad{

    idCriticidad:string,
    CriticidadId:string,
    Criticidad:string,
    Activo:string,
}