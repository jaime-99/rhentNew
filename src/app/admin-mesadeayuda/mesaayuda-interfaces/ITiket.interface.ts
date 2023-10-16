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
    ContactoTelefonico:string



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
export interface ITablero{

    MisTiekesAbiertos:string,

    MisTiekesCerrados:string,

    TiekesAsignadosAbiertos:string,
    
    TiekesAsignadosCerrados:string



}