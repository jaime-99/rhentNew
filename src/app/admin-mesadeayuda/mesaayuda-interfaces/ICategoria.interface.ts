export interface IDepartamento{

    DepartamentoId:string,
    Departamento:string,
    Activo:string
}
export interface iAddRespuesta{
    id:number;
    ok:boolean;
    message:string;

}
export interface ICategoria{
    CategoriaId:string,
    DepartamentoId:string,
    Categoria:string,
    Activo:string,
    Departamento:string
}
export interface ICriticidad{

    idCriticidad:string,
    CriticidadId:string,
    Criticidad:string,
    Activo:string,
}