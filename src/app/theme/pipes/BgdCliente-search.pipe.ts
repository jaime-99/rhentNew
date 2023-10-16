import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'BgdClienteSearchPipe', pure: false })
export class BgdClienteSearchPipe implements PipeTransform {
    transform(value, args?): Array<any> {
        let searchText = new RegExp(args, 'ig');
        if (value) {
          return value.filter(cliente => {
            if (cliente.textsearch) {
              return cliente.textsearch.search(searchText) !== -1;
            }
           
            else{
              return cliente.nombre_cliente.search(searchText).vendedorOK.search(searchText) !== -1;
            }
          });
        }
      }
    }