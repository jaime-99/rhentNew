export interface ITiket
{
    TiketId:string,
    UsuarioId:string,
    SubCategoriaId:string,
    DepartamentoId:string,
    CategoriaId:string,
    //CriticidadId:string,
    EstatusTiketId:string,
    Fecha:string,
    ResponsableId:string,
    Reasignado:string,
    Solicitante:string,
    uResponsable:string,
    Categoria:string,
    Subcategoria:string,
    Criticidad:string,
    Responsable:string,
    Estatus:string,
    Usuario:string,
    ContactoTelefonico:string,
    textSearch:string



}
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
export interface Usuario
{
    UsuarioId:string,
    Nombre:string,
    Apellido:string,
    Telefono:string,
    Extension:string,
    DepartamentoId:string,
    Correo:string,
    contrasenia:string,
    Activo:string
}

export interface IEstatusTiket{

    EstausTiketId:string,
    Estatus:string,
    Activo:string,
    isopen:string


}

export interface IDataChart{
    label:string,
    data:number[]
}

export interface IFileGet{
    ok:boolean,
    message:string,
    filename:string
}