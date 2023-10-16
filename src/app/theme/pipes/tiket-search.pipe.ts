import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'TiketSearchPipe', pure: false })
export class TiketSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(tiket => {
        if (tiket.textSearch) {
          return tiket.textSearch.search(searchText) !== -1;
        }
        else if(tiket.Solicitante){
            return tiket.Solicitante.search(searchText)!== -1;
        }
        else{
          return tiket.Detalle.search(searchText).Categoria.search(searchText) !== -1;
        }
      });
    }
  }
}