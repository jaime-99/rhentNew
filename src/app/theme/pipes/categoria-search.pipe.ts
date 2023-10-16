import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'CategoriaSearchPipe', pure: false })
export class CategoriaSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(categoria => {
        if (categoria.TextSearch) {
          return categoria.TextSearch.search(searchText) !== -1;
        }
        else if(categoria.TextSearch){
            return categoria.Departamento.search(searchText)!== -1;
        }
        else{
          return categoria.TextSearch.search(searchText).Categoria.search(searchText) !== -1;
        }
      });
    }
  }
}